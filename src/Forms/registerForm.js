import { useState } from 'react';
import { omit } from 'lodash';


const useRegisterForm = (callback) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    const validateInfo = (event, name, value) => {
        switch (name) {
            case 'email':
                if (!expEmail.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Please enter a valid email',
                });
                } else {
                let newObj = omit(errors, 'email');
                setErrors(newObj);
                setEmail(newObj.email);
                }
                break;

            case 'password':
                if (!expPassword.test(value)) {
                setErrors({
                    ...errors,
                    password:
                    'Password must contain at least: an uppercase, a lowercase, a number and a special character',
                });
                } else {
                let newObj = omit(errors, 'password');
                setErrors(newObj);
                setPassword(newObj.password);
                }
                break;

            default:
                break;
        }
    }
    
    const handleChange = (event) => {
        event.persist();
    
        let name = event.target.name;
        let val = event.target.value;
    
        validateInfo(event, name, val);
    
        setValues({
          ...values,
          [name]: val,
        });
      };
    
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
    
        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
          callback();
        } else {
          alert('there is an error');
        }
      };

    return {
        values,
        email,
        password,
        handleChange,
        handleSubmit,
      };

};

export default useRegisterForm;