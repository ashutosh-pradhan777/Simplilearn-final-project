import { useState } from "react";
import { useParams,useHistory } from "react-router";
import GroceryService from "../services/store"
import Unauthorized from "./Unauthorized";

const UpdateUser = () => {

    const{id} = useParams()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("user"))

    const[data, setData] = useState({
        "id" : id,
        "name" : "",
        "type" : "",
        "password": ""
    })


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        GroceryService.updateUser(data)
        .then(res => {console.log(res)
            history.push('/person')
        })
        .catch(err => console.log(err.message))
    }

    if(user !== null && user.type === "admin"){
    return ( 
    <div>
        <form style={{ "margin": "2em" }}>
            <h4>Update User Details For {id}</h4>
            <div className="mb-3">
              <label htmlFor="uname" className="form-label">New User Name</label>
              <input type="text" name="name" className="form-control" id="uname" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">User Type</label>
              <input type="text" name="type" className="form-control" id="type"onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">New Password</label>
              <input type="password" name="password" className="form-control" id="pwd" onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick} >Update</button>
          </form>
    </div>
     )}
     else{
       return <Unauthorized/>
     }
}
 
export default UpdateUser;