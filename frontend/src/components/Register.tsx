import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [message, setMessage] = React.useState('');
    const [userName, setName] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');

    function handleSetName(e: any): void {
        setName(e.target.value);
    }

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

    async function doRegister(event: any): Promise<void> {
        event.preventDefault();

        var obj = { login: loginName, password: loginPassword, name: userName };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/register',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id == null) {
                setMessage(res.error);
            }
            else {
                var user = { name: res.Name, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/Home';
            }
        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };



    return (
        <div id="loginDiv">
            <section>
                <div className="signin">
                    <div className="content">
                        <h2>Create Account</h2>
                        <div className="form">
                            <div className="inputBox">
                                <input type="text" placeholder="Name" onChange={handleSetName} required />
                            </div>
                            <div className="inputBox">
                                <input type="text" placeholder="Username" onChange={handleSetLoginName} required />
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Password" onChange={handleSetPassword} required />
                            </div>
                            <div className="links">
                                <a className="LoginButton" onClick={() => goTo('#')}>
                                    Log In
                                </a>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Login" onClick={doRegister} />
                            </div>
                            <div id="loginResult">{message}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );

};

export default Register;

