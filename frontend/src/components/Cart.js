import { useEffect, useState } from "react";
import GroceryService from '../services/store'
import { useHistory } from "react-router";
import TotalDiv from "./TotalDiv";

const Cart = () => {

    const hist = useHistory()

    const [data, setData] = useState(
    )
    const loggedUser = JSON.parse(localStorage.getItem('user'))


     
    const viewCart = (id) => {
        GroceryService.showCart(id)
            .then(res => {
                console.log(res.data[0]);
                setData(prevState => {return {...prevState,...res.data[0]}})
                //console.log(data);
                localStorage.setItem("cart",JSON.stringify(res.data[0]))
               //setTotal( data.cart.reduce((a,b) => {return parseFloat(a.item_price)+parseFloat(b.item_price)}))
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        viewCart(loggedUser._id);
        //changeTotal();
    },[loggedUser._id])

    const styleimg = {
        "transform": "scale(0.8,0.8)"
    }

    const handleClick = (e) => {
        const name = e.target.parentElement.children[0].innerText
        //console.log((e.target.parentElement.nextSibling.children[0].innerText).split('$')[1]);
        GroceryService.deleteFromCart(loggedUser._id,name)
        .then(res => {console.log(res.status)
            hist.go('/cart')
          })
        .catch(err => console.log(err))
        console.log(name);
    }

    let cartCard;
    if (data !== undefined) {
        // console.log("Hello");
         //localStorage.setItem('cart',data)
        cartCard = data.cart.map(ele =>
            <div className="col" key={ele.item_id}>
                <div className="card h-100 border-success" style={{ "width": "18rem","margin":"0 2em 0 2em" }}>
                    <img src={`/images/${ele.item_image}`} className="card-img-top" alt="..." style={styleimg} />
                    <div className="card-body" >
                        <h4 className="card-title" style={{ "textAlign": "center" }}>{ele.item_name}</h4>
                       <button className="btn btn-outline-danger" style={{ "margin": "0 28%" }} onClick={(e)=>{handleClick(e)}} >Delete Item</button>
                    </div>
                    <div className="card-footer" style={{"padding":"2em"}}>
                    <h6 className="card-subtitle" style={{ "textAlign": "center"}}>Price: ${ele.item_price}</h6>
                    {/* <TotalDiv data={ele.item_price}/> */}
                    </div>
                </div>
            </div>
        )
    }

    const divStyles = {"textAlign":"center",
        "margin":"2em 0",
        "padding":"1.5em",
        "background":"#4B3869",
        "color":"#A9E4D7"
            }

    return (
        <div style={{"margin":"0 0 1em 0"}}>
            <div style={divStyles}><h2>YOUR CART</h2></div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {cartCard}
        </div>
        <TotalDiv/>
        </div>
    );
}

export default Cart;