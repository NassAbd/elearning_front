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
      <button className="create-course-button" onClick={() => navigate('/nouveau-cours')}>Créer un nouveau cours</button>

      <div className="courses-container">
        {courses.map((course) => (
          <Card className="course-card" navigateTo={() => navigate(`/cours/${course._id}`)} key={course._id} title={course.title} description={course.description}/>
        ))}
      </div>

    </div>
  );
};

export default HomePage;
