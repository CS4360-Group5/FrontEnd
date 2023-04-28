import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import axios from 'axios';

const Button = styled.button`
    background-color: #0277bd;
    border: none;
    color: white;
    padding: 15px 32px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0px 5px;
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

const classes = ['Mage', 'Assassin', 'Warrior'];
const origins = ['Human', 'Elf', 'Dwarf'];
const genders = ['Male', 'Female'];

const Character = ({setShowProfileForm, responseData}) => {
    const [classType, setclassType] = useState('');
    const [origin, setOrigin] = useState('');
    const [gender, setGender] = useState('');
    const [characterError, setCharacterError] = useState('');
    const [characterData, setCharacterData] = useState(false);
    const [profileName, setProfileName] = useState(''); //undefined

    const handleCreateProfile = async (e) => {
    e.preventDefault();

    if (profileName.length < 1 | profileName === " ") {
      alert("Please enter a profile name");
      return;
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!classType || !origin || !gender){
            alert("Please select all options before submitting!"); 
            return;
        }

        if (profileName.length < 1 | profileName === " ") {
            alert("Please enter a profile name");
            return;
        }

        console.log('You are a ' + gender + ' ' + origin + ' ' + classType + '!');

        handleCreateProfile();

        if (classType === 'Mage'){
            try{
                const response = await axios.post("http://localhost:8080/stats", {
                    attack: 7,
                    currentCellX: 0,
                    currentCellY: 0,
                    currentLevel: 0,
                    defense: 3,
                    hp: 100,
                    profile: {
                        account: {
                            email: responseData.email,
                            gamerTag: responseData.gamerTag,
                            password: responseData.password,
                            status: responseData.status,
                        },
                        accountId: responseData.accountId,
                        classType: classType,
                        gender: gender,
                        active: true,
                        origin: origin,
                        profileName: profileName,
                    },
                    profileId: 1,
                    xp: 0
                });
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
        else if (classType === 'Assassin'){
            try{
                const response = await axios.post("http://localhost:8080/stats", {
                    attack: 9,
                    currentCellX: 0,
                    currentCellY: 0,
                    currentLevel: 0,
                    defense: 1,
                    hp: 100,
                    profile: {
                        account: {
                            email: responseData.email,
                            gamerTag: responseData.gamerTag,
                            password: responseData.password,
                            status: responseData.status,
                        },
                        accountId: responseData.accountId,
                        classType: classType,
                        gender: gender,
                        active: true,
                        origin: origin,
                        profileName: profileName,
                    },
                    profileId: 2,
                    xp: 0
                });
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
        else if (classType === 'Warrior'){
            try{
                const response = await axios.post("http://localhost:8080/stats", {
                    attack: 4,
                    currentCellX: 0,
                    currentCellY: 0,
                    currentLevel: 0,
                    defense: 6,
                    hp: 100,
                    profile: {
                        account: {
                            email: responseData.email,
                            gamerTag: responseData.gamerTag,
                            password: responseData.password,
                            status: responseData.status,
                        },
                        accountId: responseData.accountId,
                        classType: classType,
                        gender: gender,
                        active: true,
                        origin: origin,
                        profileName: profileName,
                    },
                    profileId: 3,
                    xp: 0
                });
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
    };

    return<>
    <h1>Character Creation (Note: you cannot change your character once submitted)</h1>
    <br />
    <div>
        <h2>Profile Name</h2>
          <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
          <br />
    </div>
    <div>
        <h2>Class type</h2>
        {classes.map(type => (
            <ButtonToggle
            active={classType === type}
            onClick={() => setclassType(type)}
            >{type}
            </ButtonToggle>
        ))}
    </div>
    <br />
    <div>
        <h2>Origin</h2>
        {origins.map(type => (
            <ButtonToggle
            active={origin === type}
            onClick={() => setOrigin(type)}
            >{type}
            </ButtonToggle>
        ))}
    </div>
    <br />
    <div>
        <h2>Gender</h2>
        {genders.map(type => (
            <ButtonToggle
            active={gender === type}
            onClick={() => setGender(type)}
            >{type}
            </ButtonToggle>
        ))}
    </div>
    <br />
    <div>
        <h2>Once done please click submit!</h2>
        <Button onClick={handleSubmit}>Submit</Button>
    </div>
    </>
}

export default Character;
