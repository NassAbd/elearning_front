import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseApi";
import { getQuizById } from "../services/quizApi";

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="border-t pt-4">
        <p>{course.content}</p>
      </div>

      {/* Affichage des quiz */}
      {loadingQuiz ? (
        <p>Chargement du quiz...</p>
      ) : errorQuiz ? (
        <p className="text-red-500">{errorQuiz}</p>
      ) : quizzes.length > 0 ? (
        <div className="mt-6 p-4 border-t">
          <h2 className="text-xl font-semibold mb-3">Quiz</h2>
          {quizzes.map((q, quizIndex) => (
            <div key={quizIndex} className="mb-6 p-4 border rounded">
              <p className="mb-2 font-medium">{q.question}</p>
              <div className="space-y-2">
                {q.propositions.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`quiz-${quizIndex}`} // Nom unique par quiz
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
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!quizStates[quizIndex]?.selectedAnswer}
              >
                Valider
              </button>

              {quizStates[quizIndex]?.isAnswered && (
                <p className={`mt-3 font-semibold ${quizStates[quizIndex]?.isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {quizStates[quizIndex]?.isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse ❌"}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun quiz disponible pour ce cours.</p>
      )}

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => navigate(`/nouveau-quiz/${id}`)}
      >
        Créer un Quiz pour ce cours
      </button>
    </div>
  );
};

export default CoursePage;
