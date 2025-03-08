import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseApi";
import { getQuizById } from "../services/quizApi";
import "../css/CoursePage.css";
import defaultImage from "../assets/default_course_image.jpg";


const CoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]); // Stocke tous les quiz
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [errorCourse, setErrorCourse] = useState("");
  const [errorQuiz, setErrorQuiz] = useState("");
  
  const [quizStates, setQuizStates] = useState({}); // Gère chaque réponse indépendamment

  // Fonction pour soumettre la réponse d'une question
  const handleSubmitAnswer = (quizIndex, correctAnswer) => {
    setQuizStates((prevState) => ({
      ...prevState,
      [quizIndex]: {
        ...prevState[quizIndex],
        isAnswered: true,
        isCorrect: prevState[quizIndex]?.selectedAnswer === correctAnswer,
      },
    }));
  };

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

  // Charger les quiz
  useEffect(() => {
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
    fetchQuizzes();
  }, [id]);

  if (loadingCourse) return <p>Chargement du cours...</p>;
  if (errorCourse) return <p className="text-red-500">{errorCourse}</p>;

  return (
    <div className="course-container">

      <h1 className="course-title">{course.title}</h1>
      <img src={course.imageUrl || defaultImage} className="course-image"/>
      <p className="course-description">{course.description}</p>
      <div className="course-content">
        <p>{course.content}</p>
      </div>

      {/* Affichage des quiz */}
      {loadingQuiz ? (

          <p className="loading-quiz">Chargement du quiz...</p>

        ) : errorQuiz ? (

          <p className="error-quiz">{errorQuiz}</p>

        ) : quizzes.length > 0 ? (

          <div className="quizzes-container">

            <h2 className="quizzes-title">Quiz</h2>

            {quizzes.map((q, quizIndex) => (
              <div key={quizIndex} className="quiz-card">

                <p className="quiz-question">{q.question}</p>
                
                <div className="propositions-container">
                  {q.propositions.map((option, index) => (
                    <label key={index} className="proposition">
                      <input
                        type="radio"
                        name={`quiz-${quizIndex}`}
                        value={option}
                        checked={quizStates[quizIndex]?.selectedAnswer === option}
                        onChange={() =>
                          setQuizStates((prevState) => ({
                            ...prevState,
                            [quizIndex]: { ...prevState[quizIndex], selectedAnswer: option },
                          }))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => handleSubmitAnswer(quizIndex, q.answer)}
                  disabled={!quizStates[quizIndex]?.selectedAnswer}
                >
                  Valider
                </button>

                {quizStates[quizIndex]?.isAnswered && (
                  <p className={`${quizStates[quizIndex]?.isCorrect ? "correct-answer" : "wrong-answer"}`}>
                    {quizStates[quizIndex]?.isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse ❌"}
                  </p>
                )}

              </div>
            ))}
          </div>
        ) : (
          <p>Aucun quiz disponible pour ce cours.</p>
        )
      }

      <div className="course-buttons">
        <button
          onClick={() => navigate(`/nouveau-quiz/${id}`)}
        >
          Créer un Quiz pour ce cours
        </button>

        <button
          onClick={() => navigate(`/gerer-cours/${id}`)}
        >
          Gérer son cours et quiz
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
