import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Firebase from "../Firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const SignupForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
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
      .then(async user => {
        console.log(user)
        let docRef = doc(getFirestore(), "users", `${user.user.uid}`)
        console.log(`The document reference is: ${JSON.stringify(docRef)}`)
        await setDoc(docRef, {
          points: 0,
          uid: user.user.uid
        })

        //
        //Register.js:32 Uncaught (in promise) FirebaseError: Function setDoc() called with invalid data. Unsupported field value: undefined (found in field uid in document users/kAKZI9Az4Td8eDzjZzZE0gYjCQo1)
      })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          let auth = getAuth()
          const user = await createUserWithEmailAndPassword(getAuth(), values.email, values.password)
          let docRef = doc(getFirestore(), "users", `${user.user.uid}`)
          await setDoc(docRef, {
            points: 0,
            uid: user.user.uid
          })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="text"
                name="name"
                placeholder="Enter your name"
              />
            </div>
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
              Submit
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
export default SignupForm;
