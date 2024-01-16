import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { Provider } from 'react-redux'
import store from './store'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Initial from './Initial';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import Game from './Game';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "initial",
    element: <Initial />,
  },
  {
    path: "game",
    element: <Game />,
  },
  {
    path: "profile/:profileId",
    element: <Profile />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
