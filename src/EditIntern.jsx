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
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
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
           <input
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={intern.name}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={intern.email}
           />
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