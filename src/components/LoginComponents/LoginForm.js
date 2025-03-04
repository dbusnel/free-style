"use client"

import "../../style/login-styles.css";

export default function LoginForm() 
{
    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="spaced-item">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>
                <br/>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button onClick={async () => SendRegisterRequest()} className="login-button" type="register">Register</button>
                    <button className="login-button" type="login">Login</button>
                </div>
            </div>
        </div>
    );
}

async function SendRegisterRequest() {
    let res = 
        await fetch("/api/register", 
            {method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: document.getElementById("username").value, passwordPlaintext: document.getElementById("password").value})})
            .then(res => res.json())
            .then(data => console.log(data)); //TODO: indicate success or failure to user

}
