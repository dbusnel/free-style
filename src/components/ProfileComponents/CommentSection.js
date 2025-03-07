
export default function CommentSection() 
{
    return (
        <div className="comments-container outline-container">
            <h2>Comments</h2>
            {GetCommentsFromDatabase()}
        </div>
    );
}

function GetCommentsFromDatabase() 
{
    
}