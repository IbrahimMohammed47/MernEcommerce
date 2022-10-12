import React from 'react';
import './App.css';
import AppRouter from './components/navigation/AppRouter';
import CustomNavBar from './components/navigation/CustomNavbar';
import { CartProvider } from "react-use-cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="app container-fluid">
      <CartProvider>
        <CustomNavBar></CustomNavBar>
        <AppRouter/>
      </CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default App;