import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
