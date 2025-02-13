import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

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
    <div className="p-4">
      <button onClick={() => navigate('/nouveau-cours')}>Créer un nouveau cours</button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card navigateTo={() => navigate(`/cours/${course._id}`)} key={course._id} title={course.title} description={course.description}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
