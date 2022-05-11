import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';
import "./CSS/Edit_Media_Queries/styles.css"
import "./CSS/Edit/styles.css"
import WarringLogo from "./Assets/warring.svg"
import BackLogo from './Assets/back.svg'

const EditIntern = () => {
    const { id } = useParams();
    const [intern, setIntern] = useState(0);
    useEffect(() => {
        const fetchIntern = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setIntern(intern)
        }
        fetchIntern();
    }, [id]);

///<NavLink to="/">Back to list </NavLink>
 
    

    return (
        <div className='secondary'>
            <div className='back-to-list'>
              <i><img src={BackLogo}></img></i><NavLink className='back-nav' to={`/`}>Back to list</NavLink>
            </div>
            <h1>Edit</h1>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
       initialValues={{ id: id, name: '', email: '', internshipStart: '', internshipEnd: ''}}
       validate={values => {
         const errors = {};
         console.log("moje value", values)
         if(!values.internshipStart)
         {
          errors.internshipStart = <a className='attention'>This date is not correct!</a>
         }
         if(!values.internshipEnd)
         {
          errors.internshipEnd = <a className='attention'>This date is not correct</a>
         }
         if (!values.name)
         {
           errors.name = <a className='attention'>Required name</a>
           errors.logo = <i className='warring'><img src={WarringLogo} ></img></i>
         }
         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
         {
          errors.email = <a className='attention'>Invalid email address</a>
          errors.logo = <i className='warring'><img src={WarringLogo} ></img></i>
         }
       
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        fetch('http://localhost:3002/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Accept':'application/json' },
          body: JSON.stringify(values),
          redirect: 'follow'
        })
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
           <div className='field-name'>
             <label>Full name*</label>
           <input 
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
             className="input-name"
           />
           {errors.name && errors.logo}
           {}
           </div>
           
           <div className='field-email'>
             <label>Email address*</label>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             className = 'input-name'
           />
            {errors.email && errors.logo}

           </div>
           <div className='data-container'>
             <div className='field-data'>
               <label>Intership star</label>
           <input
             type="date"
             id="start" 
             name="internshipStart"
             onChange={handleChange}
             onBlur={handleBlur}
             className='input-data'
             max={values.internshipEnd} 
            />
             {errors.internshipStart}
             </div>
             <div className='field-data'>
             <label>Intership end</label>
            <input
             type="date"
             id="end" 
             name="internshipEnd"
             onChange={handleChange}
             onBlur={handleBlur}
             className='input-data'
             min={values.internshipStart}
            />
             {errors.internshipEnd}
             </div>
             </div>
           <button className='submit-button' type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
         
       )}
     </Formik>
        </div>
    );
};

export default EditIntern;

