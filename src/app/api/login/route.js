import { supabase } from "../../../lib/supabase";
import { hash } from "../utils";
import { deleteExpiredSessions, postSession } from "./createSession.js";
import { serialize } from 'cookie';

const bcrypt = require('bcrypt');

/**
 * Okay, so this is the login route.
 * Here, we'll hash/salt the password and check if the user exists in the database + compare hashes.
 *  - note that api calls are server-side, so we can safely do this check here without risk of interception.
 *  request should contain:
 *  - username : Handle of the user
 *  - passwordPlaintext : The password in plaintext
 */
export async function POST(request) {
    let requestData = (await request.json());

    console.log(requestData.passwordPlaintext);

    const { data: response, error } = await supabase
        .from('USERS')
        .select('password_hash')
        .eq('username', requestData.username)
        .single();

        console.log(response);

    if (response) //User exists and we got a response
    {
        //returns body and status. We still need to make the cookie before serialzing response
        let loginStatus = handleLogin(requestData.passwordPlaintext, response.password_hash);
        
        //post new session to the database (4 hr expiration)
        let guid = await postSession(await getIDFromUsername(requestData.username));
        let sessionCookie = createSessionCookie(guid);

        //make the full response and return!
        return (new Response(
            JSON.stringify({message : loginStatus.message}), //body
            {
                status: loginStatus.status, 
                headers: {'Set-Cookie': sessionCookie, 'Content-Type': 'application/json'}}));
    }
    else //API could not be connected to, or user does not exist
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not log in"}), {status: 500});
    } 

}

function handleLogin(passwordPlaintext, passwordHash) {
    let bPasswordMatch = bcrypt.compareSync(passwordPlaintext, passwordHash);
    
    // If the passwords match, create a new session and add it to the database
    // then, on the client side, create a cookie with the session ID
    if (!bPasswordMatch) {
        console.error("Passwords do not match");
        return {message : "Passwords do not match", status: 401};
    } 
    else {
        return {message: "Logged in successfully!", status: 200};
    }
}

function createSessionCookie(guid) {
    const sessionCookie = serialize(
        'session_id', guid,
        {
            httpOnly: true, //prevent XSS attacks
            secure: true,   //only send over HTTPS
            sameSite: 'strict', 
            maxAge: 60 * 60 * 4, //expire in 4 hours (number of seconds)
            path: '/'
        }
    );

    return sessionCookie;
}

async function getIDFromUsername(username) {
    try 
    {
        const { data: response, error } = await supabase
            .from('USERS')
            .select('id')
            .eq('username', username)
            .single();

        console.log(response.id);

        if (error) //database error
        {
            console.error(error);
            return null;
        }

        return response.id;

    } catch (error) //if database stops working for whatever reason
    {
        console.error(error);
    }
}