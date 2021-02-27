import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Error404 from "./components/Error404";
import FormEditBoard from "./components/FormEditBoard";
import FormEditUser from "./components/FormEditUser"
import AllTask from "./components/AllTask";


export default function App(){
  return(<>
  {/* <Header/> */}
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/boards" exact component={Home} />
        <Route path="/boards/:id" component={AllTask} />
        <Route path="/signup" component={SignUp} />
        <Route path="/updateboardname/:id/:name" component={FormEditBoard} />
        <Route path="/updateinfouser" component={FormEditUser} />
        <Route path="/"  component={Error404} />
        </Switch>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

