import { useState } from 'react';

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(() => {
    const initialValues = { ...initialState };
    Object.keys(initialValues).forEach((key) => {
      if (initialValues[key] === '') {
        initialValues[key] = ''; // Preserve empty values
      }
    });
    return initialValues;
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetField = (fieldName, newValue = '') => {
    if (newValue === '') {
      setValues({ ...values, [fieldName]: '' }); // Set the field to an empty value
    } else {
      setValues({ ...values, [fieldName]: newValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    // if (!values.username) {
    //   newErrors.username = 'El usuario es requerido';
    // }
    // if (!values.password) {
    //   newErrors.password = 'La contraseña es requerida';
    // }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      callback(values);
    }
  };

  return {
    handleChange,
    handleSubmit,
    resetField,
    values,
    errors,
  };
};

export default useForm;