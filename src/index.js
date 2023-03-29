import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Login from "./Login";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const Index = ({ authenticated, setAuthenticated, responseData }) => {
  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (authenticated) {
    return (
      <React.StrictMode>
          <Navbar
            authenticated={authenticated}
            responseData={responseData}
            onLogout={handleLogout}
          />
          <div className="app-wrapper">
          <App
            onLogout={handleLogout}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            responseData={responseData}
          />
        </div>
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
          <Navbar authenticated={authenticated} />
          <Login
            setAuthenticated={setAuthenticated}
            authenticated={authenticated}
          />
      </React.StrictMode>
    );
  }
};

const root = createRoot(document.getElementById("root"));

const LoginPageWithAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [responseData, setResponseData] = useState("null");

  const handleLogout = () => {
    setResponseData('null');
    setAuthenticated(false);
  };

  const handleLogin = (data) => {
    setResponseData(data);
    setAuthenticated(true);
  };

  return (
    <React.StrictMode>
      {authenticated ? (
        <React.Fragment>
          <Navbar
            authenticated={authenticated}
            responseData={responseData}
            onLogout={handleLogout}
          />
          <App
            onLogout={handleLogout}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            responseData={responseData}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Navbar authenticated={authenticated} />
          <Login
            setAuthenticated={setAuthenticated}
            authenticated={authenticated}
            setResponseData={handleLogin}
          />
        </React.Fragment>
      )}
    </React.StrictMode>
  );
};

root.render(
  <Router>
    <LoginPageWithAuthentication />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
