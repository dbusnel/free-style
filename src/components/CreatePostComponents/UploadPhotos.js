export default function UploadPhotos() {
    return (
    <div>
        <h1>Upload the files you'd like to display:</h1>
        <input type="file" multiple accept="image/jpeg, image/png, image/gif"></input>
        <br/>
        {/* should be conditionally rendered in the future */}
        <h2>Preview:</h2>
        <button id="uploadButton">Upload</button>
    </div>);
}