import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CreateQuizPage from "./pages/CreateQuizPage";
import ManageCourse from "./pages/ManageCourse";
import './App.css';

function App() {  
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cours/:id" element={<CoursePage />} />
          <Route path="/nouveau-cours" element={<CreateCoursePage />} />
          <Route path="/nouveau-quiz/:id" element={<CreateQuizPage />} />
          <Route path="/gerer-cours/:id" element={<ManageCourse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
