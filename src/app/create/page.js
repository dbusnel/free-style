import UploadPhotos from "@/components/CreatePostComponents/UploadPhotos";
import NavBar from "@/components/NavBar";
import "@/style/create-styles.css";

export default function Create() {
    return (
    <div>
        <NavBar/>
        <UploadPhotos/>
    </div>);
}