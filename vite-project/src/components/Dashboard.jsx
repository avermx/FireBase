import { useEffect, useState } from "react"
import { auth, db } from "../Firebase"
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router"


const Dashboard = () => {
    const [userDetails, setUserDetails] = useState(null)
    const navaigate = useNavigate()
    const fetchUserData = async () => {

        auth.onAuthStateChanged(async (user) => {
            console.log(user)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("User is not logged in")

            }
        })
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navaigate('/signin')
            console.log(success)

        } catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        fetchUserData()
    }, [])


    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(true)

    }
    return (
        <div className=" h-screen w-full bg-green-400 flex flex-col items-center p-[2%] gap-5 " >
            <div className="flex w-[40%] flex justify-between ">
                <h1 className="text-4xl">Todo Advance </h1>
                <div className="content-center">
                    <button className="text-xs border-2 rounded-[5px] w-25 h-8 bg-black text-white items-center" onClick={handleClick}>Add Todo</button>
                </div>
            </div>
            {show ? <div className="relative w-[40%] bg-amber-200 flex justify-center h-full p-2">
                <div className="bg-white h-[97%] w-[80%]  p-3 flex-col gap-3 absolute">
                    <div className="flex justify-between ">
                        <h1>Create New Todo</h1>
                        <button className="bg-black h-5 w-5 text-white items-center justify-center flex">X</button>
                    </div>
                    <div className="">
                        <h6>
                            Title
                        </h6>
                        <input type="text" className="border" />
                    </div>
                </div>


            </div> : <div className="bg-amber-950 h-full w-[50%] flex items-center p-2 flex-col gap-2">
                <div className="bg-white h-15 w-full flex items-center py-3 flex-col gap-3"></div>
                <div className="bg-white h-15 w-full flex items-center py-3 flex-col gap-3"></div>
            </div>}
        </div>
    )
}

export default Dashboard