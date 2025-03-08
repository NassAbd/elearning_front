import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse, deleteCourse } from "../services/courseApi";
import { getQuizById, updateQuiz, deleteQuiz } from "../services/quizApi";
import "../css/ManageCourse.css";

const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [errorCourse, setErrorCourse] = useState("");
  const [errorQuiz, setErrorQuiz] = useState("");

  // Charger le cours
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setErrorCourse("Impossible de charger le cours.");
      } finally {
        setLoadingCourse(false);
      }
    };
    fetchCourse();
  }, [id]);

  const fetchQuizzes = async () => {
    try {
      const response = await getQuizById(id);
      setQuizzes(response);
    } catch (err) {
      setErrorQuiz(err.response?.data.message || "Une erreur est survenue");
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Charger les quiz
  useEffect(() => {
    fetchQuizzes();
  }, [id]);

  // Modifier le cours
  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSaveCourse = async () => {
    try {
      await updateCourse(id, course);
      alert("Cours mis à jour avec succès !");
    } catch (err) {
      setErrorCourse("Erreur lors de la mise à jour du cours.");
    }
  };

  // Modifier une question du quiz
  const handleQuizChange = (quizIndex, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex] = { ...updatedQuizzes[quizIndex], [field]: value };
    setQuizzes(updatedQuizzes);
  };

  const handleSaveQuiz = async (quizId, quiz) => {
    try {
      await updateQuiz(quizId, quiz);
      alert("Quiz mis à jour !");
    } catch (err) {
      setErrorQuiz("Erreur lors de la mise à jour du quiz.");
    }
  };

  // Supprimer une question spécifique du quiz
  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      alert("Question supprimée !");
      // Recharger les quiz
        fetchQuizzes();
    } catch (err) {
      setErrorQuiz("Erreur lors de la suppression de la question.");
    }
  };

  // Supprimer le cours et ses quiz
  const handleDeleteCourse = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      try {
        await deleteCourse(id);
        alert("Cours et quiz supprimés !");
        navigate("/");
      } catch (err) {
        setErrorCourse("Erreur lors de la suppression du cours.");
      }
    }
  };

  if (loadingCourse) return <p>Chargement du cours...</p>;
  if (errorCourse) return <p className="error-message">{errorCourse}</p>;

  return (
    <div className="manage-course-container">

      <h1 className="manage-course-title">Gestion du Cours</h1>

      {/* Modification du cours */}
      <div className="course-title">
        <label>Titre du cours</label>
        <input
          type="text"
          name="title"
          value={course?.title || ""}
          onChange={handleCourseChange}
        />
      </div>

      <div className="course-description">
        <label>Description</label>
        <textarea
          name="description"
          value={course?.description || ""}
          onChange={handleCourseChange}
        />
      </div>

      <div className="course-content">
        <label>Content</label>
        <textarea
          name="content"
          value={course?.content || ""}
          onChange={handleCourseChange}
        />
      </div>

      <div className="course-image">
        <label>URL de l'image</label>
        <input
          type="text"
          name="imageUrl"
          value={course?.imageUrl || ""}
          onChange={handleCourseChange}
        />
      </div>

      <button
        onClick={handleSaveCourse}
        className="save-course"
      >
        Enregistrer les modifications
      </button>

      {/* Gestion des quiz */}
      {loadingQuiz ? (

        <p>Chargement du quiz...</p>

      ) : errorQuiz ? (

        <p className="error-message">{errorQuiz}</p>

      ) : quizzes.length > 0 ? (

        <div className="manage-quiz-container">

          <h2 className="manage-quiz-title">Gestion du Quiz</h2>

          {quizzes.map((q, quizIndex) => (
            <div key={quizIndex} className="quiz-container">

              <label>Question</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuizChange(quizIndex, "question", e.target.value)}
              />

              <label>Réponses</label>
              {q.propositions.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedPropositions = [...q.propositions];
                    updatedPropositions[optIndex] = e.target.value;
                    handleQuizChange(quizIndex, "propositions", updatedPropositions);
                  }}
                  className={`${
                    option === q.answer ? "correct-manage-answer" : ""
                  }`}
                />

              ))}

              <div className="quiz-buttons">
                <button
                  onClick={() => handleSaveQuiz(q._id, q)}
                  className="save-quiz"
                >
                  Sauvegarder les modifications
                </button>

                <button
                  onClick={() => handleDeleteQuiz(q._id)}
                  className="delete-quiz"
                >
                  Supprimer la question
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p>Aucun quiz disponible.</p>
      )}

      <button
        onClick={handleDeleteCourse}
        className="delete-course"
      >
        Supprimer le cours et ses quiz
      </button>
    </div>
  );
};

export default ManageCourse;
