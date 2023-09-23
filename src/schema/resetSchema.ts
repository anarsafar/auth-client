import * as yup from 'yup';

const resetSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(/^\S+@\S+\.\S+$/, 'Email must be a valid format'),
});

export default resetSchema;
