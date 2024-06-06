import { Link } from "react-router-dom";

function Header({title = "Front-End Blog Cincão Junior"}) {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    <Link to="/">{title}</Link>
                </span>
            </div>
        </nav>
    );
}

export default Header;