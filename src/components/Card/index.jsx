import { Link } from "react-router-dom";

function Card({title, category, text, link = "/", linkText = "Ver post"}) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3 className="card-title">
                    {title}
                </h3>
                <p className="text-muted">
                    <small>{category}</small>
                </p>
                <p className="card-text">
                    {text}
                </p>
                <Link to={link} className="btn btn-primary">
                    {linkText}
                </Link>
            </div>
        </div>
    )
}

export default Card;