import { supabase } from "../../../lib/supabase";
import { hash } from "../utils";

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
    let requstData = (await request.json());

    console.log(requstData.passwordPlaintext);

    const { data: response, error } = await supabase
        .from('USERS')
        .select('password_hash')
        .eq('username', requstData.username)
        .single();

        console.log(response);

    if (response) //User exists and we got a response
    {
        return handleLogin(requstData.passwordPlaintext, response.password_hash);
    }
    else //API could not be connected to, or user does not exist
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not log in"}), {status: 500});
    } 

}

function handleLogin(passwordPlaintext, passwordHash) {
    let bPasswordMatch = bcrypt.compareSync(passwordPlaintext, passwordHash);
        
        if (!bPasswordMatch) {
            console.error("Passwords do not match");
            return new Response(JSON.stringify({message:"Passwords do not match"}), {status: 401});
        } 
        else {
            return new Response(JSON.stringify({message: "Logged in successfully!"}), {status: 200});
        }
}