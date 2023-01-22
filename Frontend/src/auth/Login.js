import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Outlet, Link} from "react-router-dom"

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  async function handleGoogle() {
    const auth = getAuth()
    const Google = new GoogleAuthProvider()
    await signInWithPopup(auth, Google)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signInWithEmailAndPassword(getAuth(), values.email, values.password)
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
            <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-md hover:shadow-lg"
                type='button'
                onClick={handleGoogle}
            >
                <i className="fab fa-google mr-2"></i>
                Sign up with Google
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Login= () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Register</Link>
          </li>
          <li>
            <Link to="/blogs">Survey</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default LoginForm;
