import React, { useState } from "react";

const Profiles = ({ authenticated, responseData, onProfilesLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadProfiles = () => {
    setIsLoading(false);
    onProfilesLoaded();
  };

  if (isLoading) {
    // Simulate loading profiles with a setTimeout
    setTimeout(() => {
      setIsLoading(false);
      onProfilesLoaded();
    }, 2000);

    return (
      <div>
        <h1>Profiles</h1>
        <p>Authenticated: {authenticated.toString()}</p>
        <p>Response Data: {responseData.gamerTag}</p>
        <p>Loading profiles...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Profiles</h1>
        <p>Authenticated: {authenticated.toString()}</p>
        <p>Response Data: {responseData}</p>
        <p>Profiles loaded.</p>
        <button onClick={handleLoadProfiles}>Reload profiles</button>
      </div>
    );
  }
};

export default Profiles;