import { useEffect, useState } from "react";
import GroceryDataService from "../services/store";
import {Link} from "react-router-dom";
import {AiOutlineFileAdd} from "react-icons/ai"

const ProductList = () => {

    const loggeduser = JSON.parse(localStorage.getItem("user"))
    const [products, setProducts] = useState()

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
                .finally( () =>
                    console.log(products)
                )
        }
        //console.log(products);
        fetch()
    }, [])

    const handleClick = (id) => {
        GroceryDataService.deleteProduct(id)
        .then(res => {console.log(res.status)
            alert('Successfully Deleted.')
        })
        .catch(err => console.log(err))
    }

    var count = 1;
    let tableItems;
        if(products && products.length !== 0){
     tableItems =  products.map(ele => 
        <tr key={ele._id}>
            <td>{count++}</td>
            <td>{ele._id}</td>
            <td>{ele.title}</td>
            <td>{ele.type}</td>
            <td>$ {ele.price}</td>
            <td><Link to={`/updateproduct/${ele._id}`}><button className="btn btn-primary">UPDATE</button></Link></td>
            <td><button className="btn btn-danger" onClick={()=>{handleClick(ele._id)}}>DELETE</button></td>
        </tr>
    ) 
        }

    return ( 
        <div>
            <h1 style={{"textAlign":"center", "margin":"1em 2em"}}>PRODUCT LIST    <Link to='/addproduct'><AiOutlineFileAdd style={{"margin":"0 0 0 2em"}}/></Link></h1> 
        <table className="table" style={{"margin":"1em"}}>
  <thead>
    <tr>
      <th scope="col">Sl.No.</th>
      <th scope="col">ID</th>
      <th scope="col">TITLE</th>
      <th scope="col">TYPE</th>
      <th scope="col">PRICE</th>
      <th scope="col">UPDATE</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>
    {tableItems}
  </tbody>
</table>
        </div>
     );
}
 
export default ProductList;