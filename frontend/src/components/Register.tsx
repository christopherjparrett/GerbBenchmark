﻿import React, { useState } from 'react';
function Login() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');

    function handleSetLoginName(e: any): void {
        setLoginName(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    function handleSetUserName(e: any): void {
        setUserName(e.target.value);
    }

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
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" onChange={handleSetLoginName} /><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value="Do It"
                onClick={doLogin} />
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Login;

