import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import Character from "./Character";

const Button = styled.button`
    background-color: #2BDF90;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: -10px 5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: ease background-color 250ms;
    &:hover {
        background-color: #0d47a1;
    }
`;

const ButtonToggle = styled(Button)`
    opacity: 0.5;
    ${({ active }) => 
    active && 
    `
    opacity: 1;
    `}
`

const Profiles = ({ authenticated, responseData, onProfilesLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileName, setProfileName] = useState([]);
  const [profileData, setProfileData] = useState([]);

  const handleLoadProfiles = () => {
    setIsLoading(false);
    getAllProfileData();
    for (let i = 0; i < profileData.length; i++) {
      console.log(profileData[i].profileName);
    }
  };

  const chooseProfileToPlay = () => {

  };

  const handleCreateProfile = () => {
    console.log(responseData)
    try {
      const response = axios.post('http://localhost:8080/profile',
        {
            account: {
              email: responseData.email,
              gamerTag: responseData.gamerTag,
              password: responseData.password,
              status: responseData.status,
            },
            accountId: responseData.accountId,
            classType: "",
            gender: "",
            isActive: true,
            origins: "",
            profileName: profileName,
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.error(error);
      }
  };

  const getAllProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile/account/' + responseData.accountId);
      const data = response.data;
      setProfileData(data);
    } catch (error) {
      console.error(error);
    }
  }

  //useEffect(() => {
    //const fetchData = async () => {
      //try {
        //const data = await getAllProfileData();
        //setProfileData(data);
      //} catch (error) {
        //console.error(error);
      //}
    //};
    //fetchData();
  //}, []);

  if (isLoading) {
    // Simulate loading profiles with a setTimeout
    setTimeout(() => {
      setIsLoading(false);
      handleLoadProfiles();
    }, 2000);

    return (
      <div>
        <h1>Profiles</h1>
        <p>Authenticated: {authenticated.toString()}</p>
        <p>Response Data: {responseData.gamerTag}</p>
        <p>Loading profiles...{handleLoadProfiles}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Profiles</h1>
        <div>
          {profileData.map((profile) => (
          <h2>
            <Button onClick={chooseProfileToPlay}>{profile.profileName}</Button>
          </h2>
          ))}
        </div>
        <button onClick={handleLoadProfiles}>Load profiles</button>
        <br />
        <br />
        <form onSubmit={handleCreateProfile}>
          <label>Create a New Profile</label>
          <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)}/>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export default Profiles;