import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider  } from 'mobx-react';
import TestStore from './domains/test';

const container = document.getElementById("root");
ReactDOM.render(<Provider testStore={TestStore}><App /></Provider>, container);