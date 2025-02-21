import { useState } from "react";
import { useParams } from "react-router-dom";
import { createQuiz } from "../services/quizApi";
import "../css/CreateQuizPage.css";

const CreateQuizPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [propositions, setPropositions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( !question || !answer || propositions.some(p => p === "")) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await createQuiz({ courseId: id, question, propositions, answer });
      setMessage("Quiz créé avec succès !");
      setQuestion("");
      setPropositions(["", ""]);
      setAnswer("");
    } catch (error) {
      console.error("Erreur lors de la création du quiz :", error);
      setMessage("Une erreur est survenue.");
    }
  };

  const handleAddOption = () => {
    setPropositions([...propositions, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...propositions];
    updatedOptions[index] = value;
    setPropositions(updatedOptions);
  };

  return (
    <div className="create-quiz-container">

      <h1 className="create-quiz-title">Créer un Quiz</h1>

      {message && <p className="create-quiz-message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="question-input">
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="propositions-input">

          <label>Propositions</label>

          {propositions.map((option, index) => (
            <div key={index} className="proposition-input">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              <input
                type="radio"
                name="answer"
                value={option}
                checked={answer === option}
                onChange={() => setAnswer(option)}
              />
            </div>
          ))}

          <button type="button" onClick={handleAddOption}>
            + Ajouter une option
          </button>

        </div>

        <button type="submit">
          Créer le quiz
        </button>
      </form>

    </div>
  );
};

export default CreateQuizPage;
