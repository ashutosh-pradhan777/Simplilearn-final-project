import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({user,logout}) => {


    return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <span className="navbar-brand" >THE GROCERY STORE</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
      <div>{user ? <Link to='/wishlist' className="nav-link">WishList</Link>: <span className="nav-link" onClick={()=>{alert('Login First to access wishlist')}}>WishList</span> }</div>
      <div>{user ? <Link to='/cart' className="nav-link">Cart</Link>: <span className="nav-link" onClick={()=>{alert('Login First to access cart')}}>Cart</span> }</div>
      <div>{user && user.type === "admin" ? <Link to='/person' className="nav-link">ADMIN DASHBOARD</Link>: <span></span> }</div>
      <div>{ user ? 
     <Link to='/'> <button className="btn btn-outline-danger " style={{"marginLeft": "4em"}}type="submit" onClick={logout}>Logout {user.name}</button></Link> : 
      <Link to="/login"><button className="btn btn-outline-success " style={{"marginLeft": "4em"}}type="submit">Login</button></Link>
      }
      </div>
    </div>
  </div>
  </div>
    </nav> );
}
 
export default Navbar;