'use client';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import { postApi } from '../api/apiClient';
 import { useRouter } from 'next/navigation'
interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  const router = useRouter()
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    {
      setSubmitting,
      setFieldError,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    try {
      console.log('values',values)
      const data = await postApi('/user/login', {
        "email": values?.email,
        "password":values?.password})
        localStorage.setItem("token",data?.token);
        router.push('/admin')
    } catch (err) {
      console.log('err',err)
      setFieldError('general', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
    <div className="card text-center p-3" style={{width: '18rem', height:'350px'}}>
    <div className="card-header">
    Login
  </div>
  <div className="card-body">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="mb-3">
              <label className='form-label' htmlFor="email">Username</label>
              <Field
                className='form-control'
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div className="mb-3">
              <label className='form-label mt-3' htmlFor="password">Password</label>
              <Field
               className='form-control'
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            {errors?.general && <p style={{ color: 'red' }}>{errors?.general}</p>}
            <button className="btn btn-primary mt-3" type="submit">Login</button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
    </div>
  );
}