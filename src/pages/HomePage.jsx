import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data);
    });
  }, []);

  useEffect(() => {
    console.log("Courses mises à jour :", courses);
  }, [courses]);

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur CloseClassrooms</h1>

      <button className="create-course-button" onClick={() => navigate('/nouveau-cours')}>
        Créer un nouveau cours
      </button>

      <h2 className="home-subtitle">Liste des cours</h2>

      {courses.length > 0 ? (
        <div className="courses-container">
          {courses.map((course) => (
            <Card 
              className="course-card" 
              navigateTo={() => navigate(`/cours/${course._id}`)} 
              key={course._id} 
              title={course.title} 
              description={course.description} 
              image={course.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p className="no-courses-message">Aucun cours disponible pour le moment. 🚀 Ajoutez-en un !</p>
      )}
    </div>
  );
};

export default HomePage;
