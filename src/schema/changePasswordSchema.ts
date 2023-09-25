import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Old password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&()])[A-Za-z\d@$!%^*?&()]+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&()])[A-Za-z\d@$!%^*?&()]+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .notOneOf(
      [yup.ref('oldPassword')],
      'New password cannot be the same as the old password'
    ),
  confirmNewPassword: yup
    .string()
    .required('Please confirm new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

export default changePasswordSchema;
