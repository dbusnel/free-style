import ProfileView from "../components/ProfileComponents/ProfileView";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div style={{height:"100vh"}}>
      <NavBar/>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"auto"}}>
        <ProfileView name="David" bio="test" images={["https://i.postimg.cc/Gt6SSDmm/isthisit.jpg", "https://i.postimg.cc/Gpg3wXqt/1702861954774.jpg", "https://fastly.picsum.photos/id/283/200/1000.jpg?hmac=wU-OrXsUTTRrjrS3F0j0XFkQYflSCIKVj5XemhjqHSQ"]} />
      </div>
    </div>
  );
}
