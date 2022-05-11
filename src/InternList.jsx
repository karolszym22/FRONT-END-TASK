import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo  from './Assets/edit.png'
const InternList = () => {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
        <main>
         <h1>Participants</h1>
               {interns.map(u => (<div className='trainee'><span className='trainee-name' key={u.id}>{u.name}</span><span className='edit-nav'><img src={logo}></img><NavLink className='edit' to={`/interns/${u.id}`}>Edit</NavLink></span></div> ))}
        </main>
    );
};

export default InternList;