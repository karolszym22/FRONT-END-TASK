import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

const EditIntern = () => {
    const { id } = useParams();
    const [intern, setIntern] = useState(0);
    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setIntern(intern)
        }
        fetchInterns();
    }, [id]);

    return (
        <div>
            <NavLink to="/">Back to list </NavLink>
            <form>
                <label></label>
                <input type="text" name="name" value={intern.name}  />              
                <label>Email</label>
                <input type="text" name="email" value={intern.email} />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default EditIntern;