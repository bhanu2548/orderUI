import React, {useState,useEffect} from 'react';
import Orders from './components/dashboard/Orders';
import Login from './components/user/login';
import Register from './components/user/register';
import { Routes, Route, Link } from "react-router-dom";
import AuthService from './service/auth.service';

const App = () => {

  const [orders,setOrders] = useState([]);
 
 
  useEffect(()=>{
    const sseForNewOrders = new EventSource('http://localhost:8080/order/latest');
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

  },[orders]);
  return <div>
    {/* <OrdersTable></OrdersTable> */}
    <div className="container mt-3">
        <div><p>hello page</p></div>
      <Routes>
          <Route exact path={"/"} element={<Orders />} />
          <Route exact path={"orders"} element={<Orders/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </div>
    
  </div>;
};

export default App;

