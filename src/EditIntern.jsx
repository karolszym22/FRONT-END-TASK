import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';



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


 
    

    return (
        <div>
            <NavLink to="/">Back to list </NavLink>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
       initialValues={{ id: id, name: '', email: '', internshipStart: '', internshipEnd: ''}}
       validate={values => {
         const errors = {};
         console.log("moje value", values)
         if(!values.internshipStart)
         {
          errors.internshipStart = <a>This date is not correct!</a>
         }
         if(!values.internshipEnd)
         {
          errors.internshipEnd = <a>This date is not correct</a>
         }
         if (!values.name)
         {
           errors.name = <a>Required name</a>
         }
         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
         {
           errors.email = <a>Invalid email address</a>
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
           {errors.name}
           <input 
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />
           {errors.email}
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             
           />
           {errors.internshipStart}
           <input
             type="date"
             id="start" 
             name="internshipStart"
             onChange={handleChange}
             onBlur={handleBlur}
            ></input>
            {errors.internshipEnd}
            <input
             type="date"
             id="end" 
             name="internshipEnd"
             onChange={handleChange}
             onBlur={handleBlur}
            ></input>
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
        </div>
    );
};

export default EditIntern;

