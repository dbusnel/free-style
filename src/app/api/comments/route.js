import { supabase } from "@/lib/supabase";

/**
 * 
 * @returns {Response} - A response object containing the comments in the database
 */
export async function GET(request) {
    let post_id = new URL(request.url).searchParams.get('post_id');

    const { data: comments, error } = await supabase
        .from('POST_COMMENTS')
        .select('comment_text, created_at')
        .eq('post_id', post_id)
        .order('created_at', {ascending: true});
    
    if (comments) 
    {
        return new Response(JSON.stringify(comments), {status: 200});
    }
    else 
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not get comments"}), {status: 500});
    }
}

/**
 * 
 * @param {*} request 
 */
export async function POST(request) 
{
    let requestData = (await request.json());
    
    let post_id = requestData.post_id;
    let comment_text = requestData.comment_text;

    const {error} = await supabase
        .from('POST_COMMENTS')
        .insert([
            { post_id, comment_text }
    ]);

    if (error)
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not post comment"}), {status: 500});
    }
    else
    {
        return new Response(JSON.stringify({message:"Comment posted"}), {status: 200});
    }
}