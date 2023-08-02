import React, { Fragment, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/LandingLayout/home";
import { BrowserRouter as Router , Routes, Route, Link, Switch } from "react-router-dom";
import { persistStore, persistReducer } from 'redux-persist'
import { Provider } from 'react-redux'
import {store, persistor} from "./store";
import Dashboard from './components/LandingLayout/dashboard'
import CreateProduct from "./components/Product/createProduct";
import CreateClient from "./components/Client/createClient";

import { PersistGate } from 'redux-persist/integration/react'
// import EditProduct from './components/edit.components'
// import ProductList from './components/list.components';
// import CreateProduct from './components/create.components'
import { loadUser } from './actions/auth'
import rootReducer from "./reducers";
import ShowProduct from "./components/Product/showProduct";
import ShowClient from "./components/Client/showClient";
import storage from 'redux-persist/lib/storage'
import LandingManager from "./components/LandingLayout/landingManager";
import ClientLanding from "./components/Client/clientLanding";
import ClientDashboard from "./components/LandingLayout/clientDashboard";
import ShowCustomer from "./components/Client/showCustomer";
import AlertComp from "./utils/CommonComponents/AlertComp";
import EditClientPage from "./components/LandingLayout/editClientPage";

function App() {
  // const store=configureStore()
  // useEffect(() => {
  //   // console.log('1111')
  //    store.dispatch(loadUser());
  // }, []);
  
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <AlertComp/>
    <Router>
     
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/landingManager" element={<LandingManager/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/createProduct" element={<CreateProduct/>}/>
          <Route path="/createClient" element={<CreateClient/>}/>
          <Route path="/showProduct/:id" element={<ShowProduct/>}/>
          <Route path="/showClient/:id" element={<ShowClient/>}/>


          <Route path="/clientLanding" element={<ClientLanding/>}/>
          <Route path="/clientDashboard" element={<ClientDashboard/>}/>
          <Route path="/showCustomer/:id" element={<ShowCustomer/>}/>
          <Route path="/editClientPage" element={<EditClientPage/>}/>


        </Routes>

      
    </Router>
    </PersistGate>
    </Provider> 
   );
}

export default App;