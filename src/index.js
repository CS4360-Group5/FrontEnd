import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Login from "./Login";
import App from "./App";
import Zone from "./Zone";
import reportWebVitals from "./reportWebVitals";

const Index = ({ authenticated, setAuthenticated, responseData, zoneResponseData }) => {



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
            zoneData={zoneResponseData}
          />
          <div className="app-wrapper">
          <App
            onLogout={handleLogout}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            responseData={responseData}
            zoneData={zoneResponseData}
          />
          <Zone
            zoneData={zoneResponseData}
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
  const [zoneResponseData, setZoneResponseData] = useState("null");

  const handleLogout = () => {
    setResponseData('null');
    setAuthenticated(false);
  };

  const handleLogin = (data) => {
    setResponseData(data);
    setAuthenticated(true);
  };

  const handleZone = (zonedata) => {
    setZoneResponseData(zonedata);
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
            zoneData={zoneResponseData}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Navbar authenticated={authenticated} />
          <Login
            setAuthenticated={setAuthenticated}
            authenticated={authenticated}
            setResponseData={handleLogin}
            setZoneResponseData={handleZone}
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
