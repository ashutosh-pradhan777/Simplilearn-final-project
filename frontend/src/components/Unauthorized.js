import { useHistory } from "react-router";
const Unauthorized = () => {
    const history = useHistory()
    return ( 
    <div style={{"margin":"5em 0 0 30em"}}>
            <h2 style={{"color":"red"}}>UNAUTHORIZED ACCESS</h2><br/>
            <button className="btn btn-outline-primary" style={{"marginLeft":"6em"}} onClick={() => {history.push("/")}}>
                Back To Home Page
            </button>
    </div>
     );
}
 
export default Unauthorized;