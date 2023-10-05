import React, { useState } from 'react';
import styles from '@/styles/Admin/Login.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import the auth functions from Firebase
import db from '../../FirebaseConfig';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Correct the method name to 'preventDefault'
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        alert('Logged in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Invalid username and password');
      });
  };

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrap}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email" // Add an 'id' attribute to the input
            placeholder="Please Enter Your E-mail"
            value={email} // Bind the 'email' state to the input value
            onChange={(e) => setEmail(e.target.value)} // Handle input changes
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="password">Password</label>
          <input
            type="pri"
            id="password" // Add an 'id' attribute to the input
            placeholder="Please Enter The Password"
            value={password} // Bind the 'password' state to the input value
            onChange={(e) => setPassword(e.target.value)} // Handle input changes
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
