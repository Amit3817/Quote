import React, { useState } from 'react'

const AuthContext = React.createContext({
  token:"",
  isLoggedIn:false,
  logIn:()=>{},
  logOut:()=>{}
})


export const AuthContextProvider=(props)=>{
   const [token,setToken]=useState(null)

   const userIsLoggedIn=!!token

  const logInHandler=(token)=>{
    setToken(token)

  }

  const logOutHandler=()=>{
    setToken(null)
  }
  const contextValue={
    token:token,
    isLoggedIn:userIsLoggedIn,
    logIn:logInHandler,
    logOut:logOutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext