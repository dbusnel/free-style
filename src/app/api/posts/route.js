import { supabase } from "@/lib/supabase";

export async function GET() 
{
    let post_id = new URL(request.url).searchParams.get('post_id');

    const { data: comments, error } = await supabase
        .from('POSTS')
        .select('poster_id, created_at')
        .eq('post_id', post_id)
        .order('created_at', {ascending: true});
    
    if (comments) 
    {
        return new Response(JSON.stringify(comments), {status: 200});
    }
    else 
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not get post"}), {status: 500});
    }
}

export async function POST(request) 
{
    let requestData = (await request.json());

    let input_poster_id = requestData.poster_id;

    const {data, error} = await supabase
        .from('POSTS')
        .insert({ poster_id: input_poster_id, createdAt: new Date(Date.now()).toISOString()})
        .single();

    let inserted_post_id = data.post_id;

    if (error)
    {
        console.error(error);
        return new Response(JSON.stringify({message:"Could not post"}), {status: 500});
    }
    else
    {
        return new Response(
            JSON.stringify({message:"Post successful!"}),
            {
                headers: {"Post_ID" : padIDNumber(inserted_post_id, 8)}, //Pad the ID number to 8 digits
                status: 200
            });
    }
}

function padIDNumber(number, length) 
{
    let str = number.toString();
    return str.padStart(length, '0');
}