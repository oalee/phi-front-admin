import React from "react";
import { ApolloProvider, useQuery, useLazyQuery } from "@apollo/client";
import { LOGIN, GETME } from "../api/queries";


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
var loginFunction;
var mHistory;

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {

  const [doLogin, loginQuery ] = useLazyQuery(LOGIN);
  const  {loading, error, data} = useQuery(GETME, {
    skip : loginQuery.data === undefined,
    onCompleted : (res) => {
      console.log(`completed ${res.user}`)
      // console.log(`child ${children.props}`)
      mHistory.push('/app/dashboard')
    }
  }) 

  loginFunction = doLogin;

  // var [state, dispatch] = React.useReducer(userReducer, {
  //   isAuthenticated: !!localStorage.getItem("id_token"),
  // });

  console.log(`${loginQuery} and ${loginQuery.data} and ${data}`)


  if(loginQuery.data ){
      localStorage.setItem('token', loginQuery.data.tokenPayload.token)

  }

  console.log(` is it true? ${ data!== undefined}`)

  // console.log(`data is ${data} and user is ${userData}`)

  return (
    <UserStateContext.Provider value={ data!== undefined}>
      <UserDispatchContext.Provider value={ data ? data.user : null}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  // if (context === undefined) {
  //   throw new Error("useUserDispatch must be used within a UserProvider");
  // }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  console.log("login user")
  mHistory = history

  try {
    loginFunction({
      variables: {
        loginUsername: login,
        loginPassword: password,
      },
    }).then( result => {
      console.log(`got result ${result}`)
    })
      setError(null)
      setIsLoading(false)

  } catch (error) {
    
  }

  // if (!!login && !!password) {
  //   setTimeout(() => {
  //     localStorage.setItem('id_token', 1)
  //     setError(null)
  //     setIsLoading(false)
  //     dispatch({ type: 'LOGIN_SUCCESS' })

  //     history.push('/app/dashboard')


  //   }, 2000);
  // } else {
  //   dispatch({ type: "LOGIN_FAILURE" });
  //   setError(true);
  //   setIsLoading(false);
  // }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  // dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
