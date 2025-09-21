import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { getFirestore } from "firebase/firestore";
import app from "../Firebase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const auth = getAuth(app);

const Dashboard = () => {
    const [input, setInput] = useState();
    const [name, setName] = useState([]);
    const [updateInp, setUpdateInp] = useState();
    const [editId, setEditId] = useState("");
    const [uid, setUid] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                const querySnapshot = async () => {
                    const hello = await getDocs(collection(db, `users/${user.uid}/todo`));
                    let todo = [];
                    hello.forEach((doc) => {
                        todo.push({ ...doc.data(), id: doc.id });
                    });
                    setName(todo);
                };
                querySnapshot();
            } else {
                console.log("hello");
            }
        });
    }, []);

    const navigate = useNavigate();
    const handleSignOut = () => {
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
                await addDoc(collection(db, `users/${uid}/todo`), {
                    title: input,
                    completed: false,
                    id: name.length + 1,
                });
                setName((prev) => [
                    ...prev,
                    { title: input, completed: false, id: name.length + 1 },
                ]);
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
                    updateDoc(doc(db, `users/${uid}/todo`, title.id), {
                        ...title,
                        completed: !title.completed,
                    });
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
        setUpdateInp(title);
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        if (updateInp.trim() === "") {
            return;
        }

        setName(
            name.map((e) => {
                if (e.id === editId) {
                    updateDoc(doc(db, `users/${uid}/todo`, e.id), {

                        ...e,
                        title: updateInp,
                    });
                    return {
                        ...e,
                        title: updateInp,
                    };
                } else {
                    return e;
                }
            })
        );

        setUpdateInp("");
    };

    const handleDelete = (id) => {
        setName(name.filter((e) => e.id !== id));
        deleteDoc(doc(db, `users/${uid}/todo`, id));
    };

    return (
        <>

            <div className="h-screen w-full bg-background dark text-foreground">
                <div className="h-[10vh] w-full ">
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>

                <div className="h-[90%] w-full  flex ">
                    <div className=" h-full w-[20%] "> </div>
                    <div className=" h-full w-[60%] flex flex-col gap-5 justify-center">
                        <div className="w-[100%] flex items-end justify-end">
                            <Dialog className="b">
                                <form>
                                    <DialogTrigger asChild c>
                                        <Button variant="outline">Add Todo</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-background dark text-foreground">
                                        <DialogHeader>
                                            <DialogTitle>Create New Todo</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name-1">Title</Label>
                                                <Input placeholder="Enter todo title..." />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label >Description</Label>
                                                <Input placeholder="Enter todo description..." />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </form>
                            </Dialog>
                        </div>
                        {/* <form onSubmit={handleSubmit}>
                            <div className="w-full h-10 flex justify-center items-center content-center text-foreground">
                                <Input
                                    type="text"
                                    className="w-50 h-10  rounded-l-3xl p-2 border"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button className=" h-10 w-20 rounded-r-3xl">
                                    Add Todo
                                </Button>
                            </div>
                        </form> */}

                        <ScrollArea className={'h-[88%] '}>
                            <div className=" bg-background p-[2%] gap-2 flex flex-col items-center text-center">
                                {name.map((data, i) => (
                                    <Card className={'w-[75%] dark text-center'}>
                                        <CardHeader className={'flex items-center justify-between text-center gap-[2%] w-[100%]'} onClick={() => TodoClicked(data?.id, data?.title)}>
                                            <CardTitle ><Input
                                                type="checkbox"
                                                onChange={() => checkBox(data?.id)}
                                                checked={data?.completed}
                                            /></CardTitle>
                                            <CardTitle onClick={() => TodoClicked(data?.id, data?.title)}>
                                                <h1 className={`text-center whitespace-normal break-all text-[1.5rem] ${data?.completed ? "line-through" : ""}`}
                                                >{data?.title}</h1>
                                            </CardTitle>
                                            <CardTitle onClick={() => handleDelete(data.id)}>
                                                <Button variant={'ghost'}>
                                                    <svg
                                                        class="w-10 h-10 text-red-700 "
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                                        />
                                                    </svg>
                                                </Button>
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>

                                    // <div className="w-[50%] h-fit bg-amber-50 flex items-center">
                                    //     <div className="pl-2">
                                    //         <Input
                                    //             type="checkbox"
                                    //             onChange={() => checkBox(data?.id)}
                                    //             checked={data?.completed}
                                    //         />
                                    //     </div>
                                    //     <div
                                    //         className="flex justify-center items-center w-full"
                                    //         onClick={() => TodoClicked(data?.id, data?.title)}
                                    //     >
                                    //         <h1
                                    //             className={`text-center whitespace-normal break-words ${data?.completed ? "line-through" : ""
                                    //                 }`}
                                    //         >
                                    //             {data?.title}
                                    //         </h1>
                                    //     </div>
                                    //     <div className="pr-1 " onClick={() => handleDelete(data.id)}>

                                    //     </div>
                                    // </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>


                    {/* <div className=" h-full w-[20%]">
                        <form onSubmit={handleSubmitUpdate}>
                            <div className="h-full  ">
                                <Input
                                    value={updateInp}
                                    type="text"
                                    className="border "
                                    onChange={(e) => setUpdateInp(e.target.value)}
                                />
                                <Button disabled={updateInp === ""}>
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div> */}
                </div>


            </div>
        </>
    );
};

export default Dashboard;
