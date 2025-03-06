import { supabase } from "@/lib/supabase";
import { genGUID } from "../utils";

export async function deleteExpiredSessions() {
    await supabase
        .from('SESSIONS')
        .delete()
        .lt('expires_at', (new Date(Date.now())).toISOString());
}

export async function postSession(userID) {
    let guid = genGUID();
    const { error } = await supabase
        .from('SESSIONS')
        .insert({
            user_id: parseInt(userID),
            session_id: guid,
            expires_at: (new Date(Date.now() + 4 * 3600 * 1000).toISOString()) //expire in 4 hours
        });
    if (error) {
        console.error(error);
    }
    return guid;
}