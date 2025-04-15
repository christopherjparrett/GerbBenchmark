import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle.tsx';

function Login() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');

    function handleSetLoginName(e: any): void {
        setLoginName(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const goTo = (inputs: string) => {
        navigate(`/${inputs}`);
    };


    async function doLogin(event: any): Promise<void> {
        event.preventDefault();

        var obj = { login: loginName, password: loginPassword };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/login',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id == null) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { name: res.Name, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/Home';
            }
        }
        catch (error: any) {
            setMessage(error.toString());
            return;
        }
    };



    return (
        <div id="loginDiv">
            <section>
                <div className="signin">
                    <div className="content">
                        <h2>Sign In</h2>
                        <div className="form">
                            <div className="inputBox">
                                <input type="text" placeholder="Username" onChange={handleSetLoginName} required />
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Password" onChange={handleSetPassword} required />
                            </div>
                            <div className="links">
                                <a className="SignUpButton" onClick={() => goTo('SignUp')}>
                                    Create Account
                                </a>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Login" onClick={doLogin} />
                            </div>
                            <div id="loginResult">{message}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
}
export default Login;