import { supabase } from "../../../lib/supabase";
import { hash } from "../utils"; 

//TODO: implement row level security for Users table

/**
 * Body should contain:
 *  - username : Handle of the user
 *  - passwordPlaintext : The password in plaintext 
 */
export async function POST(request) {
    let data = (await request.json());

    const {error} = await supabase
        .from('USERS')
        .upsert([{username: data.username,  password_hash: hash(data.passwordPlaintext)}]);
    if (error) {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not register"}), {status: 500});
    }
    return new Response(JSON.stringify({message: "Registered successfully!"}), {status: 200});

}