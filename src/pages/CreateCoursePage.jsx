import { useState } from "react";
import { createCourse } from "../services/courseApi";
import "../css/CreateCoursePage.css";

const CreateCoursePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const createdCourse = await createCourse({ title, content, description, imageUrl });
        setMessage(`Le cours "${createdCourse.title}" a été créé avec succès !`);
        setTitle("");
        setContent("");
        setDescription("");
        setImageUrl("");
      } catch (error) {
        console.error("Erreur lors de la création du cours :", error);
        setMessage("Une erreur s'est produite lors de la création du cours.");
      }
  };

  return (
    <div className="create-course-container">

      <h1 className="create-course-title">Créer un Cours</h1>

      {message && <p className="create-course-message">{message}</p>}

      <form className="form-container" onSubmit={handleSubmit}>

        <div className="title-input">
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="description-input">
            <label>Description</label>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            required
            />
        </div>

        <div className="content-input">
          <label>Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="imageUrl-input">
          <label>URL de l'image</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {setImageUrl(e.target.value)}}
          />
        </div>

        <button
          type="submit"
        >
          Créer le cours
        </button>

      </form>

    </div>
  );
};

export default CreateCoursePage;
