import React, { useState } from 'react';

const FormBuilder = () => {
  const [responses, setResponses] = useState({});

  const handleChange = (event) => {
    setResponses({
      ...responses,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to submit the responses to a server or database
    console.log(responses);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" onChange={handleChange}>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" name="dob" onChange={handleChange} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" name="location" onChange={handleChange} />
      </label>
      <br />
      <label>
        Languages spoken:
        <input type="text" name="languages" onChange={handleChange} />
      </label>
      <br />
      <label>
        Country of origin:
        <input type="text" name="country" onChange={handleChange} />
      </label>
      <br />
      <label>
        Highest level of education:
        <select name="education" onChange={handleChange}>
          <option value=""></option>
          <option value="high school">High School</option>
          <option value="college">College</option>
          <option value="graduate">Graduate</option>
        </select>
      </label>
      <br />
      <label>
        Chronic conditions:
        <input type="text" name="chronic_conditions" onChange={handleChange} />
      </label>
      <br />
      <label>
        Race:
        <input type="text" name="race" onChange={handleChange} />
      </label>
      <br />
      <label>
        Height:
        <input type="text" name="height" onChange={handleChange} />
      </label>
      <br />
      <label>
        Weight:
        <input type="text" name="weight" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormBuilder;
