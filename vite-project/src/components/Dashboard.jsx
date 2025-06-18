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
            
        }catch(error){
            console.log(error)
            
        }
        
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    console.log(userDetails?.email);
    console.log(userDetails?.name);

    return (
        <>
            <div className="h-screen w-full bg-green-600">
                <button className="h-8 w-20 bg-amber-200" onClick={handleSignOut}>SignOut</button>
                <p>{userDetails?.email}</p>
                <p>{userDetails?.name}</p>
            </div>


        </>
    )
}

export default Dashboard