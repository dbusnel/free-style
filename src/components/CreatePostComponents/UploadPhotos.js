"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import ProfileView from "../ProfileComponents/ProfileView";

export default function UploadPhotos() {
    const [previewURLs, setPreviewURLs] = useState([]);
    const [fileList, setFileList] = useState([]);

    //Effect: 
    // On render, if the user has uploaded images, then create temp URLS in memory for them for preview
    // Then, deallocate the old URLs and replace them with the new ones
    useEffect(() => {
        //deallocate old URLs
        setPreviewURLs(replaceURLsInMemory(previewURLs, fileList));
    }, [fileList]);

    return (
    <div className="paddedItem" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"auto"}}>
        <h1>Upload the files you'd like to display:</h1>
        <input onChange={(e) => setFileList(e.target.files)} id="photoInput" type="file" multiple accept="image/jpeg, image/png, image/gif"></input>
        <br/>
        {/* should be conditionally rendered in the future */}
        <button id="uploadButton" onClick={() => UploadPhotosToBucket()}>Upload</button>  
        <h2>Preview:</h2>
        <ProfileView images={previewURLs}/>
    </div>);
}

/**
 * Event handler to update the preview images
 * @param {*} event The event that triggered the function
 */
function handleFileChange(event) 
{
    setFileList(event.target.files);
}

/**
 * Replaces the old image resources with the new image resources in memory
 * @param {*} oldImageResources The old image resources to release
 * @param {*} newImageResources The new image resources to allocate
 * @returns an array of the image URLs
 */
function replaceURLsInMemory(oldImageResources, newImageResources) 
{
    releaseOldURLs(oldImageResources);
    return getURLArrayFromMemoryImages(newImageResources);
}

/**
 * Using a list of files as an input, returns an array of URLs for the files and allocates them to memory
 * !IMPORTANT: URLS SHOULD BE RELEASED!
 * @param {*} memoryImageFileList files in memory to make URLs for
 * @returns list of URLS
 */
function getURLArrayFromMemoryImages(memoryImageFileList) 
{
    if (!memoryImageFileList)
        return [];
    return Array.from(memoryImageFileList).map((memoryImage) => URL.createObjectURL(memoryImage));
}

function releaseOldURLs(oldResources) 
{
    oldResources?.forEach((oldURL) => URL.revokeObjectURL(oldURL));

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