import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';

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
               <Formik
       initialValues={{ name: '', email: '', internshipStart: '', internshipEnd: ''}}
       validate={values => {
         const errors = {};
         console.log(id)
         if (!values.name)
         {
           errors.name = <a>Required name</a>
         }
         if(values.internshipEnd)
         {
            console.log(values.internshipEnd.value)
         }
         if(!values.internshipStart)
         {
            console.log(values.internshipStart)
         }
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
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
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
            {errors.name}
           <input
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder = {intern.name}
             value={values.name}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             placeholder = {intern.email}
           />
           <input
             type="date"
             id="start" 
             name="internshipStart"
             onChange={handleChange}
             onBlur={handleBlur}
            ></input>
            <input
             type="date"
             id="end" 
             name="internshipEnd"
             onChange={handleChange}
             onBlur={handleBlur}
            ></input>
           {errors.password && touched.password && errors.password}
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