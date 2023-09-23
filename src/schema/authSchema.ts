import * as yup from 'yup';

const authSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(/^\S+@\S+\.\S+$/, 'Email must be a valid format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export default authSchema;
