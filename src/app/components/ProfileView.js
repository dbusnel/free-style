import "../style/profile-styles.css";

//this will use data from database so should be server rendered for speed

export default function ProfileView(props) {
    return (
        <div className="profile-view-outline-container">
            <h1>{props.name}</h1>
            <img src={props.image} alt={props.name} />
        </div>
    );
}