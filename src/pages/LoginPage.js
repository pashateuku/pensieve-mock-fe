import '../assets/css/authpages.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// import axios
import axios from 'axios';

function App() {

    
    // for navigation purpose
    const navigate = useNavigate();
    
    // Validator Token
    const token = localStorage.getItem('token');
    if(token){
        navigate('/')
        window.location.href = '/'
    }

    //FOR USERNAME AND PASSWORD
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //HANDLE ON SUBMIT TO BACKEND
    const handleSubmit = async (e) => {
        console.log('submit running')

        e.preventDefault();

        // Bug? email dan password kosong merupakan sebuah akun terdaftar
        // sehingga validasi dibutuhkan
        if (email === '') {
            console.log('email kosong')
            return alert('Please Fill the Email and Password')
        }

        console.log(email)

        const credentials = btoa(email + ':' + password);
        const basicAuth = 'Basic ' + credentials;
        console.log(basicAuth)
      
        // Run Axios
        try {
            const result = await axios.post(`http://52.74.166.134:3000/api/login`,  {}, {
                auth: {
                    username: email,
                    password: password
                  }
              })

            console.log(result)
            
            if(result.data.response.status === 'OK'){
                console.log(result)
                localStorage.setItem('token', result.data.response.message.loginToken);
                navigate('/')
            }
            else {
                alert('terjadi kesalahan')
            }

        }
        catch (err) {
            alert(err.response.data.response.message)
            console.log(err)
        }      

        setEmail('')
        setPassword('')
    }



  return (
    <div className="auth">
        <div className="auth-frame">
            <form className="form" onSubmit={handleSubmit}>

                {/* prompt message*/}
                {/* <div className='form-alert alert-active success-alert'>
                    <p>please input password more than 8 digit please input password more than 8 digitplease input password more than 8 digit</p>
                </div> */}

                {/* email input */}
                <input
                    type='email'
                    placeholder='Email'
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* password input */}
                <input 
                    type='password'
                    placeholder='Password'
                    minLength="8"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='login-button'>Log In</button>

                <a href='/register'>New User?</a>

            </form>
        </div>
    </div>
  );
}

export default App;
