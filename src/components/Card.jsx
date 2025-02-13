const Card = ({ title, description, navigateTo }) => {
    return (
      <div className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={navigateTo}>
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Card;
  