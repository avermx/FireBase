import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase";
import { useNavigate } from 'react-router';
import { getDatabase } from "firebase/database";
import { useState } from "react";

const auth = getAuth(app)
const database = getDatabase(app);

const Dashboard = () => {
    const [input, setInput] = useState('')
    const [name, setName] = useState([])


    const navigate = useNavigate()
    const handleSignOut = (e) => {

        signOut(auth).then((value) => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const newtod = {
            title: input
        }
        setName(prev => ([...prev, newtod]))
    }


    console.log(name);

    return (
        <div className="h-screen w-full bg-amber-100 ">
            <div className="h-[10vh] w-full bg-amber-300">
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div className="h-[90%] w-full  flex ">
                <div className=" h-full w-[20%]">
                </div>
                <div className=" h-full w-[60%] flex flex-col gap-5 ">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full h-10 flex justify-center items-center content-center ">
                            <input type="text" className="w-50 h-10  rounded-l-3xl p-2 border" onChange={(e) => setInput(e.target.value)
                            } />
                            <button className="bg-amber-200 h-10 w-20 rounded-r-3xl" >Add Todo</button>
                        </div>
                    </form>

                    <div className="todo-div h-[90%] w-[100%] bg-amber-400 p-5 gap-2  flex flex-col">
                        {name.map((e, i) => (
                                e.title === '' ? '': 
                                <div key={i} className="fuck">{e.title}</div>
                        ))}
                    </div>

                </div>
                <div className="bg-red-300 h-full w-[20%]"></div>
            </div>
        </div>
    )
}

export default Dashboard