import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/WingmenBooking.css'
import './Style/Responsive.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from "./Data/context";
import ScrollToTop from "./Lib/ScrollToTop";
import Routes from './Routes/routes'


const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <ContextProvider>
        <Routes />
        <ToastContainer pauseOnHover={false} autoClose={2000} />
      </ContextProvider>
    </Router>
  );
};

export default App;