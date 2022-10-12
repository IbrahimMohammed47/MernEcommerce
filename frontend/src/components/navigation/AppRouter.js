import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../cart/Cart";
import ProductList from "../shop/ProductList";
import Profile from "../profile/Profile";
import OrderList from "../orders/OrderList";
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from "../auth/ProtectedRoute";


const AppRouter = () => {
  return (
    <div className="pageC">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <ProductList/>}/>
                {/* <Route path="/orders" element={ <OrderList/>}/>
                <Route path="/cart" element={ <Cart/>}/> */}
                <Route
                  path="/orders"
                  element={<ProtectedRoute component={OrderList} />}
                />
                <Route
                  path="/cart"
                  element={<ProtectedRoute component={Cart} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute component={Profile} />}
                />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default AppRouter;