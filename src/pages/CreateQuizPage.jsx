import { useState } from "react";
import { useParams } from "react-router-dom";
import { createQuiz } from "../services/quizApi";

const CreateQuizPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [propositions, setPropositions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ handleSubmit ~ id:", id);

    
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Créer un Quiz</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Propositions</label>
          {propositions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded"
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
          <button type="button" onClick={handleAddOption} className="mt-2 text-blue-500">
            + Ajouter une option
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Créer le quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizPage;
