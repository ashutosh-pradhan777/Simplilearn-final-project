import { useEffect, useState } from "react";
import GroceryDataService from "../services/store"
import {Link,useHistory} from "react-router-dom"
import Unauthorized from "./Unauthorized";
const Person = () => {

    const history = useHistory()
    const loggeduser = JSON.parse(localStorage.getItem("user"))

    const[user,setUser] = useState([])
    useEffect(() => {
        console.log(loggeduser.type);
        const getUserData = () => {
            GroceryDataService.showUserDetails()
            .then(res => 
                {setUser(res.data)
                console.log(user.length,user.type);})
            .catch(err => console.log(err))
        }
        getUserData()
    },[])

    var count = 1;
    let tableItems;
        if(user.length !== 0){
     tableItems =  user.map(person => 
        <tr key={person._id}>
            <td>{count++}</td>
            <td>{person._id}</td>
            <td>{person.name}</td>
            <td>{person.type}</td>
            <td><Link to={`/updateuser/${person._id}`}><button className="btn btn-primary">UPDATE</button></Link></td>
            <td><button className="btn btn-danger" onClick={()=>{handleClick(person._id)}}>DELETE</button></td>
        </tr>
    ) 
        }

        const handleClick = (id) => {
           // e.preventDefault()
           console.log("id: "+id);
            GroceryDataService.deleteUser(id)
            .then(res => {console.log(res)
            })
            .catch(err => console.log(err))
        }

        if(loggeduser.type === "admin"){
    return ( 
       
    <div>
        <h1 style={{"textAlign":"center", "margin":"1em 0"}}>ADMIN DASHBOARD</h1>
        <table className="table" style={{"margin":"2em"}}>
  <thead>
    <tr>
      <th scope="col">Sl.No.</th>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">USER TYPE</th>
      <th scope="col">UPDATE</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>
    {tableItems}
  </tbody>
</table>

 <Link to='/adduser'><button className='btn btn-primary' style={{"margin":"0 40%"}}><h4>ADD NEW USER</h4></button></Link><br />
 <Link to='/productlist'><button className='btn btn-warning' style={{"margin":"2rem 38%"}}><h4>MANAGE PRODUCTS</h4></button></Link>
    </div> 
       
    )}
    else{
        return(<Unauthorized/>)
    }
}
 
export default Person;