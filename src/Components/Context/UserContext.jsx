import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [client, setClient] = useState({})  
    
    useEffect(() => {
      setClient({
          userId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('name'),
          last_name: sessionStorage.getItem('last_name'),
          username: sessionStorage.getItem('username'),
          
        })
        console.log("desde el context -> " + JSON.stringify(client));
    
    }, [])
    
  
    return (<UserContext.Provider value={{client, setClient}}>{children}</UserContext.Provider>)


}

export {UserContext};
export default UserProvider;


        
   
    
      