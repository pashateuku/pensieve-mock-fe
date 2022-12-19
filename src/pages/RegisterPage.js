import '../assets/css/authpages.css';

function App() {
  return (
    <div className="auth">
        <div className="auth-frame">
            <div className="form">

                {/* prompt message*/}
                {/* <div className='form-alert alert-active success-alert'>
                    <p>please input password more than 8 digit please input password more than 8 digitplease input password more than 8 digit</p>
                </div> */}

                {/* name input */}
                <input
                    type='text'
                    placeholder='Name'
                    id="name"
                    name="name"
                    // value=''
                    // onChange={(e) => setUserId(e.target.value)}
                />

                {/* email input */}
                <input
                    type='text'
                    placeholder='Email'
                    id="email"
                    name="email"
                    // value=''
                    // onChange={(e) => setUserId(e.target.value)}
                />

                {/* password input */}
                <input 
                    type='password'
                    placeholder='Password'
                    minLength="8"
                    id="password"
                    name="password"
                    // value=''
                    // onChange={(e) => setPassword(e.target.value)}
                />

                <button className='login-button'>Register</button>

                <a href='/login'>Have Account?</a>

            </div>
        </div>
    </div>
  );
}

export default App;
