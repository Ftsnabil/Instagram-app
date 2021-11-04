import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=> {
const {state,dispatch}= useContext(UserContext)
const history = useHistory()
const renderList = () =>{
  if(state){
    return [
      <li><Link to ="/Profile">Profile</Link></li>,
      <li><Link to ="/create">Create Post</Link></li>,
      <li><Link to ="/myfollowingpost">My following Posts</Link></li>,
      <li>
         <button className="btn  btn-primary #616161 grey darken-2" type="submit"
         onClick={()=>{
           localStorage.clear()
           dispatch({type: "CLEAR"})
          history.push('/login')
         }}>
           Logout</button> 
      </li>
    
    ]
  }else{
    return [
      <li><Link to ="/Login">Login</Link></li>,
      <li><Link to ="/Signup">Signup</Link></li>
    ]

  }
}

  return (
  <nav>
  <div className="nav-wrapper grey ">
 <Link to={state?"/":"/login"} className=" brand-logo left ">Instagram</Link> 
    <ul id="nav-mobile" className="right"> 
    {renderList()}
    </ul>
  </div>
</nav>
     ) 
};






export default NavBar ;