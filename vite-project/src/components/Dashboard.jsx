import { getAuth, signOut } from "firebase/auth";
import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,

    onSnapshot,
} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import app from "../Firebase";
import { data, useNavigate } from "react-router";

import { useEffect, useState } from "react";

const auth = getAuth(app);

const Dashboard = () => {
    const [input, setInput] = useState();
    const [name, setName] = useState([]);
    const [updateInp, setUpdateInp] = useState();
    const [editId, setEditId] = useState("");

    const navigate = useNavigate();
    const handleSignOut = (e) => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (input === "") {
                return;
            } else {
                await addDoc(collection(db, "users"), {
                    title: input,
                    completed: false,
                    id: name.length + 1,
                });
                setName((prev) => [...prev, { title: input, completed: false, id: name.length + 1 }]);
                setInput("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkBox = (id) => {
        setName(
            name.map((title) => {


                if (title?.id === id) {
                    return {
                        ...title,
                        completed: !title.completed,

                    };
                } else {
                    return title;
                }
            })
        );
    };

    const TodoClicked = (id, title) => {
        setEditId(id);
        setUpdateInp(title)
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        if (updateInp.trim() === '') {
            return;
        }

        setName(
            name.map((e) => {
                if (e.id === editId) {
                    updateDoc(doc(db, 'users', e.id), {
                        ...e,
                        title: updateInp,
                    })
                    return {
                        ...e,
                        title: updateInp,

                    };
                } else {
                    return e;
                }
            })
        );



        setUpdateInp('')

    };

    const handleDelete = (id) => {

        setName(name.filter((e) => (
            e.id !== id
        )))
        deleteDoc(doc(db, 'users', id))
    }

    useEffect(() => {
        const querySnapshot = async () => {
            const hello = await getDocs(collection(db, "users"))
            let todo = []
            hello.forEach((doc) => {
                todo.push({ ...doc.data(), id: doc.id })
            });
            setName(todo)
        }
        querySnapshot()

        //     const unsub = onSnapshot(collection(db, "users"), (doc) => {
        //         let todo = []
        //         doc.forEach((e) => {
        //             todo.push({ ...e.data(), id: e.id })
        //         })
        //         setName(todo)
        //     });

        // return () => unsub()
    }, []);



    return (
        <div className="h-screen w-full bg-amber-100 ">
            <div className="h-[10vh] w-full bg-amber-300">
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div className="h-[90%] w-full  flex ">
                <div className=" h-full w-[20%]"></div>
                <div className=" h-full w-[60%] flex flex-col gap-5 ">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full h-10 flex justify-center items-center content-center ">
                            <input
                                type="text"
                                className="w-50 h-10  rounded-l-3xl p-2 border"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button className="bg-amber-200 h-10 w-20 rounded-r-3xl">
                                Add Todo
                            </button>
                        </div>
                    </form>

                    <div className="todo-div  w-[100%] bg-amber-400 p-5 gap-2 flex flex-col items-center">
                        {name.map((data, i) => (
                            <div className="w-[50%] h-[4vh] bg-amber-50 flex items-center">
                                <div className="pl-2">
                                    <input
                                        type="checkbox"
                                        onChange={() => checkBox(data?.id)}
                                        checked={data?.completed}
                                    />
                                </div>
                                <div
                                    className="flex justify-center items-center w-full"
                                    onClick={() => TodoClicked(data?.id, data?.title)}
                                >
                                    <h1
                                        className={`text-center ${data?.completed ? "line-through" : ""
                                            }`}
                                    >
                                        {data?.title}
                                    </h1>
                                </div>
                                <div className="pr-1 " onClick={() => handleDelete(data.id)}>
                                    <svg class="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-red-300 h-full w-[20%]">
                    <form onSubmit={handleSubmitUpdate}>
                        <div className="h-full w-full bg-amber-200 text-center ">
                            <input
                                value={updateInp}
                                type="text"
                                className="border"
                                onChange={(e) => setUpdateInp(e.target.value)}
                            />
                            <button disabled={updateInp === ''} className="bg-amber-950">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
