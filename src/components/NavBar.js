import "../style/nav-styles.css";

/**
 * A horizontal bar containing links to different pages of the website.
 * 
 */
export default function NavBar() {
    return (
        <div>
            <div className="nav-bar">
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/create">Create</a>
            </div>
            <br/>
        </div>
    );
}