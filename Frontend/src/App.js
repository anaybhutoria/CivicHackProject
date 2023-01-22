import React from 'react';
import Survey from './surveys/take';
import LoginForm from './auth/Login';
import RegisterForm from './auth/Register'
import FormBuilder from './surveys/create';
// TODO: Pagination Register, Login, Home and View Survey Pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App () { 
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<LoginForm />}/>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="Survey" element={<Survey />} />
          <Route path="/survey/take" element={<FormBuilder />}/>
      </Routes>
    </BrowserRouter>
  );
}
