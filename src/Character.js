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
const origin = ['Human', 'Elf', 'Dwarf'];
const genders = ['Male', 'Female'];

const Character = ({setShowProfileForm, responseData, setShowCharacterSuccess}) => {
    const [classType, setclassType] = useState('');
    const [origins, setOrigin] = useState('');
    const [gender, setGender] = useState('');
    const [characterError, setCharacterError] = useState('');
    const [characterData, setCharacterData] = useState(false);
    
    const [mageData, setMageData] = useState({
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
            origin: origins,
            profileName: responseData.profileName,
        },
        profileId: responseData.profileId,
        xp: 0
    });

    const [assassinData, setAssassinData] = useState({
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
            origin: origins,
            profileName: responseData.profileName,
        },
        profileId: responseData.profileId,
        xp: 0
    });

    const [warriorData, setWarriorData] = useState({
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
            origin: origins,
            profileName: responseData.profileName, //undefined
        },
        profileId: responseData.profileId, // undefined
        xp: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!classType || !origins || !gender){
            alert("Please select all options before submitting!"); 
            return;
        }

        console.log('You are a ' + gender + ' ' + origins + ' ' + classType + '!');
        console.log(responseData)

        if (classType === 'Mage'){
            try{
                const response = await axios.post("http://localhost:8080/stats", mageData);
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
        else if (classType === 'Assassin'){
            try{
                const response = await axios.post("http://localhost:8080/stats", assassinData);
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
        else if (classType === 'Warrior'){
            try{
                const response = await axios.post("http://localhost:8080/stats", warriorData);
                console.log(response);
                setCharacterError('');
                setCharacterData(true);
            } catch (error){
                console.error(error);
            }
        }
    };

    if(characterData){
        setShowCharacterSuccess(true);
        setShowProfileForm(true);
    }

    return<>
    <h1>Character Creation (Note: you cannot change your character once submitted)</h1>
    <br />
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
        {origin.map(type => (
            <ButtonToggle
            active={origins === type}
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
    {characterError && <p style={{ color: 'red' }}>{characterError}</p>}
    {characterData && (
        <div>
            <p>Character Created!</p>
            </div>
        )}
    </>
}

export default Character;
