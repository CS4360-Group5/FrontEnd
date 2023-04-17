import React, {useState} from "react";
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

const classes = ['Mage', 'Assassin', 'Warrior', 'Archer', 'Priest'];
const origin = ['Human', 'Elf', 'Dwarf', 'Orc', 'Undead'];
const genders = ['Male', 'Female'];

function Character() {
    const [classType, setclassType] = useState('');
    const [origins, setOrigin] = useState('');
    const [gender, setGender] = useState('');
    const [characterError, setCharacterError] = useState('');
    const [characterSuccess, setCharacterSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!classType || !origins || !gender){
            alert("Please select all options before submitting!"); 
            return;
        }

        console.log('You are a ' + gender + ' ' + origins + ' ' + classType + '!');

        axios
            .post('http://localhost:8080/stats/', {
            classType,
            origins,
            gender,
        })
        .then((response) => {
            setCharacterError('');
            setCharacterSuccess(true);
        })
        .catch((error) => {
            console.log(error);
            setCharacterError("Please select all options before submitting!");
        });
    };

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
    </>
}

export default Character;