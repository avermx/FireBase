import { getAuth, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../Firebase";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";

const auth = getAuth(app);

const Dashboard = () => {
  const [input, setInput] = useState();
  const [name, setName] = useState([]);
  const [updateInp, setUpdateInp] = useState();
  const [editId, setEditId] = useState(null);

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
        const newtodo = {
          id: name.length + 1,
          title: input,
          completed: false,
        };

        await addDoc(collection(db, "users"), {
          id: name.length + 1,
          title: input,
          completed: false,
        });
        setInput("");
        setName((prev) => [...prev, newtodo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkBox = (id) => {
    setName(
      name.map((title) => {
        console.log(title);

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
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    setName(
      name.map((e) => {
        if (e.id === editId) {
          return {
            ...e,
            title: updateInp,
          };
        } else {
          return e;
        }
      })
    );
  };

  const handleDelete = () =>{

  }

  useEffect(() => {
    // const querySnapshot = async () => {
    //     const hello = await getDocs(collection(db, "users"))
    //     hello.forEach((doc) => {
    //         setName([...doc.data(),doc.id])
    //         return
    //     });
    // }
    // querySnapshot()
    // const hello = () => {
    //     const unsub = onSnapshot(collection(db, "users"), (doc) => {
    //         doc.forEach((e) => {
    //             setData((pre)=>[...pre,e.data()])
    //             console.log(e.data());
    //         })
    //     });
    // }
    // hello()
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
                    className={`text-center ${
                      data?.completed ? "line-through" : ""
                    }`}
                  >
                    {data?.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-300 h-full w-[20%]">
          <form onSubmit={handleSubmitUpdate}>
            <div className="h-full w-full bg-amber-200 text-center ">
              <input
                type="text"
                className="border"
                onChange={(e) => setUpdateInp(e.target.value)}
              />
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
