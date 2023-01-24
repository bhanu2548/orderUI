import React, {useState,useEffect} from 'react';
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
//import AuthService from '../../service/auth.service';
import AuthService from '../../service/auth.service';
import Login from '../user/login';



const Orders = () => {

  const [orders,setOrders] = useState([]);
  const [jwt,setJwt] = useState();
  
  
  useEffect(()=>{
    const jwtToken = AuthService.getJWT();
  
    if(jwtToken){
      console.log(jwtToken)
      setJwt(jwtToken);
      const sseForNewOrders = new EventSource('http://localhost:8080/order/latest?token='+jwtToken);

      sseForNewOrders.onopen = (e) => {
        console.log("SSE For LastOrder Connected !");
      };
      sseForNewOrders.addEventListener("order-update",(event)=>{
        let jsonData = JSON.parse(event.data);
        console.log(jsonData)
        setOrders(jsonData);
      });

      sseForNewOrders.onerror = (error) => {
        console.log("SSE For LastOrder Error", error);
        sseForNewOrders.close();
      };
      return () => {
        sseForNewOrders.close();
      }
  }

  },[orders]);
  return <div>
    
    {jwt ? orders ? obj.keys(orders).length > 0 ?
      Object.keys(orders).map((shipToPin,i)=>(
      <div>
        <TableContainer sx= {{ marginBottom : 10}}>
        <h4>{shipToPin} Orders </h4>
          <Table sx={{ maxWidth: 300 }} aria-label={shipToPin}>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Product Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders[shipToPin].map(({ orderId, productId }, index) => (
                <TableRow key={index}>
                  <TableCell>{orderId}</TableCell>
                  <TableCell>{productId}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )):(<div>No orders in System</div>)
      :<Login></Login>
      :<Login></Login>
  }
    
    
  </div>;
};

export default Orders;
