import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCnfrm: ''
  });

  const [validation, setValidation] = useState({
    email: null,
    password: null,
    passwordCnfrm: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let isValid = false;

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (name === 'password') {
      isValid = value.length >= 8;
    } else if (name === 'passwordCnfrm') {
      isValid = value === form.password && value.length > 0;
    }

    setValidation((prev) => ({ ...prev, [name]: isValid }));
  };

  const getInputClass = (field) => {
    if (validation[field] === true) return 'input success';
    if (validation[field] === false) return 'input error';
    return 'input';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validation.email && validation.password && validation.passwordCnfrm){
      alert("Form submitted successfully!");
    }
    else{
      alert("Form cannot be submitted!");
    }
    
  }
  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br />
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('email')}
          placeholder='Email'
        />
        {validation.email === false && (
          <p style={{ color: 'red' }}>Invalid email format</p>
        )}
        <br />
        <br />

        <label>Password:</label>
        <br />
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('password')}
          placeholder='Password'
        />
        {validation.password === false && (
          <p style={{ color: 'red' }}>Password must be at least 8 characters</p>
        )}
        <br />
        <br />

        <label>Confirm Password:</label>
        <br />
        <input
          type='password'
          name='passwordCnfrm'
          value={form.passwordCnfrm}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass('passwordCnfrm')}
          placeholder='Confirm Password'
        />
        {validation.passwordCnfrm === false && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}
        <br />
        <br />

        <button type='submit' style={{marginTop: '5px'}}>Sign Up</button>
      </form>
    </div>
  );
}

export default App;
