import { useEffect, useState } from "react";

const TotalDiv = () => {
    
    const[total,setTotal] = useState(0)

    const dataobj = localStorage.getItem('cart')
    //console.log(JSON.parse(dataobj));

    useEffect(() => {
        console.log("data is:");
        let data = JSON.parse(dataobj);
        let t = data.cart.reduce(function(accumulator, currentValue) {
            return accumulator + parseFloat(currentValue.item_price);
          }, 0);
          setTotal(t)
    },[dataobj])

    const styles = {
        "margin":"2em 2em 0 2em",
        "background":"#112031",
        "color":"#D4ECDD",
        "textAlign":"center",
        "padding":"1.5em"
    }
    return ( 
        <div style={styles}>
            <h3>Your Grand Total is : $ {total}</h3>
            <button className="btn btn-warning" style={{"marginTop":"1em"}}>CHECKOUT</button>
        </div>
     );
}
 
export default TotalDiv;