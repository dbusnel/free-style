import { supabase } from "@/lib/supabase";
import ProfileView from "../ProfileComponents/ProfileView";

export default function UploadPhotos() {
    return (
    <div className="paddedItem" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"auto"}}>
        <h1>Upload the files you'd like to display:</h1>
        <input id="photoInput" type="file" multiple accept="image/jpeg, image/png, image/gif"></input>
        <br/>
        {/* should be conditionally rendered in the future */}
        <button id="uploadButton" onClick={() => UploadPhotosToBucket()}>Upload</button>  
        <h2>Preview:</h2>
        <ProfileView/>
        
    </div>);
}

function UploadPhotosToBucket() 
{
    let fileList = document.getElementById("photoInput").files;
    for (let i = 0; i < fileList.length; i++) 
    {
        let file = fileList[i];
        let fileExtension = file.name.split('.').pop();
        let fileName = `photo-${i}.${fileExtension}`;
        UploadSinglePhoto(postID, file, fileName);
    }
}

async function UploadSinglePhoto(postID, file, fileName) 
{
    const { error } = await supabase
        .storage
        .from('post-images')
        .upload(`post-${postID}/${fileName}`, file);

    if (error) 
    {
        console.error(error);
        return false;
    }

    return true;
}