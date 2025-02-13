import { useState } from "react";
import { createCourse } from "../services/courseApi";

const CreateCoursePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const createdCourse = await createCourse({ title, content, description });
        setMessage(`Le cours "${createdCourse.title}" a été créé avec succès !`);
        setTitle("");
        setContent("");
        setDescription("");
      } catch (error) {
        console.error("Erreur lors de la création du cours :", error);
        setMessage("Une erreur s'est produite lors de la création du cours.");
      }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Créer un Cours</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
            <label className="block font-semibold">Description</label>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
            />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Créer le cours
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
