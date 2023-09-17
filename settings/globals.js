import { collection, getDocs } from "firebase/firestore";
import { createContext,useState } from "react";
import { db } from "./firebase.setting";
import { useEffect } from "react";

const AppContext = createContext();

const FacepalContext = ({children}) => {
    const [users,setUsers] = useState([]);

    const getUsers = async () => {
        const onSnapShot = await getDocs(collection(db,'users'));
        setUsers(onSnapShot.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }

    useEffect(()=> {
        getUsers()
    },[])

    return(
        <AppContext.Provider value={{users}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,FacepalContext }