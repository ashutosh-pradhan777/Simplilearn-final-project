import { useEffect, useState } from "react";
import GroceryDataService from "../services/store"
import { Link } from "react-router-dom";

const Products = () => {

    const loggeduser = JSON.parse(localStorage.getItem("user"))

    const [products, setProducts] = useState()

    const [wishlistdata, setWishlist] = useState({
        user_id : "",
        item_id : "",
        item_name: "",
        item_image: ""
    })

    const fun = (data) => {
        setProducts(data)
    }

    useEffect(() => {
        //console.log("Hello");
        const fetch = () => {
            GroceryDataService.getProducts()
                .then(res => {
                    fun(res.data)
                })
                .catch(err => console.log(err))
        }
        //console.log(products);
        fetch()
    }, [])

    const handleWishlist = (e) => {
        if(loggeduser === null)
        {
            alert("Login First")
             //console.log("Clicked",e.target.parentElement.parentElement.children[0].src);
            // console.log(loggeduser._id);
        }
        else{
        // console.log(e.target.parentElement.children[0].value);
            const path = e.target.parentElement.parentElement.children[0].src
            const img = path.split("/").pop()

            const data= {
                id: e.target.parentElement.children[0].value,
                name: e.target.parentElement.children[1].innerText,
                img: img
            }

          setWishlist({
              
              user_id: loggeduser._id,
              item_id: data.id,
              item_name: data.name,
              item_image: data.img
          })
          GroceryDataService.addToWishlist(wishlistdata)
          .then(res => {console.log(res)
            console.log("Added To Wishlist");    
        })
          .catch(err => console.log(err))
       }
    }

    const handleCart = (e) => {
        if(loggeduser === null)
        {
            alert("Login First")
        }
        else
        {
            const path = e.target.parentElement.parentElement.children[0].src
            const img = path.split("/").pop()

            const data= {
                user_id: loggeduser._id,
                item_id: e.target.parentElement.children[0].value,
                item_name: e.target.parentElement.children[1].innerText,
                item_image: img,
                item_price: e.target.parentElement.children[2].innerText.split(" ").pop()
            }
            
            GroceryDataService.addToCart(data)
            .then(res => console.log(res.status))
            .catch(err => console.log(err))

        }
    }

    const imgStyle = {
        "marginTop": "0",
        "transform" : "scale(0.7,0.7)"
    }

    let cards;
    if (products && products.length !== 0) {
        cards = products.map(product =>
            <div className="col" key={product._id}>
                <div className="card h-100 border-info">
                    <img src={`/images/${product.filename}`} style={imgStyle} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <input type="hidden" value={product._id}/>
                        <h5 className="card-title">{product.title}</h5>
                        <small className="card-subtitle">{'$ '+product.price}</small>
                        <p className="card-text">{product.description}</p>
                        <button className='btn btn-outline-primary' onClick={(e)=>handleWishlist(e)}>Add To WishList</button> <span/>
                       <button className='btn btn-outline-success' onClick={(e)=>handleCart(e)}>Add To Cart</button>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">{'Rating: '+product.rating}</small>
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
        <div>
            <div style={divStyles}><h2>Browse Through Our Products</h2></div>
            <div  style={{"margin":"1em 3em"}}>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {cards}
            </div>
            </div>
        </div>
    );
}

export default Products;