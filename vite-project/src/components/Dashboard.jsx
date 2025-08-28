import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase";
import { useNavigate } from 'react-router';

const auth = getAuth(app)
const Dashboard = () => {
    const navigate = useNavigate()
    const handleSignOut = (e) => {

        signOut(auth).then((value) => {
            navigate('/')

        }).catch((error) => {
            console.log(error)

        });
    }
    return (
        <div className="h-screen w-full bg-amber-100 ">
            <div className="h-[10vh] w-full bg-amber-300">
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div className="h-[90%] w-full bg-amber-500 flex ">
                <div className="bg-red-300 h-full w-[20%]">
                </div>
                <div className="bg-red-500 h-full w-[60%]">
                 
                        <input type="text" className="w-50 h-10 bg-amber-700"/>
                    
                </div>
                <div className="bg-red-300 h-full w-[20%]"></div>
            </div>
        </div>
    )
}

export default Dashboard