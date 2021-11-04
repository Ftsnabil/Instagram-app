import React,{useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './Componentes/Navbar'
import "./App.css"
import { BrowserRouter, Route,Switch,useHistory} from 'react-router-dom'
import Home from "./Componentes/Screens/Home"
import Login from "./Componentes/Screens/Login"
import Profile  from "./Componentes/Screens/Profile"
import Signup from "./Componentes/Screens/Signup"
import CreatePost from "./Componentes/Screens/CreatePost"
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from "./Componentes/Screens/UserProfile"
import SubscribedUserPosts from "./Componentes/Screens/SubscribesUserPosts"


export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({type:'USER',payload:user})
   
  }else{
    history.push('login')
  }
  },[])
  return(
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>
  <Route path="/Login">
    <Login/> 
  </Route>
  <Route path="/Signup">
    <Signup/>
  </Route>
  <Route exact path="/profile">
    <Profile/>
  </Route>
  <Route path="/create">
    <CreatePost/>
  </Route>
  <Route path="/profile/:userid">
    <UserProfile/>
  </Route>
  <Route path="/myfollowingpost">
    <SubscribedUserPosts/>
  </Route>
  </Switch>

  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />

    </BrowserRouter>
    </UserContext.Provider>  
  );
}
  export default App;

