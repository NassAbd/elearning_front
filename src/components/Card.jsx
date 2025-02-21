import "../css/Card.css";

const Card = ({ title, description, navigateTo }) => {
    return (
      <div className="card-container"
            onClick={navigateTo}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Card;
  