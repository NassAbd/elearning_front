import "../css/Card.css";
import defaultImage from "../assets/default_course_image.jpg";

const Card = ({ title, description, image, navigateTo }) => {
    return (
      <div className="card-container" onClick={navigateTo}>
        <img src={image || defaultImage} />
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
};

export default Card;
