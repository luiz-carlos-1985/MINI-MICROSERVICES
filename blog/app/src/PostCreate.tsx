import React, { useState } from "react";
import axios from "axios";

interface PostCreateProps {
  onPostCreated?: () => void;
}

export const PostCreate: React.FC<PostCreateProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      return "O título não pode estar vazio.";
    }
    if (value.length < 3) {
      return "O título deve ter pelo menos 3 caracteres.";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      setValidated(true);
      return;
    }
    await axios.post('http://localhost:3001/posts',{
      title
    });
    alert(`Postagem realizada com o título: ${title}`);
    setTitle("");
    setError("");
    setValidated(false);
    if (onPostCreated) {
      onPostCreated();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (validated) {
      setError(validateTitle(e.target.value));
    }
  };

  return (
    <div className="post-create p-4 bg-light rounded shadow-sm">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label fw-bold mb-2">
            Título:
          </label>
          <input
            type="text"
            id="postTitle"
            className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
            value={title}
            onChange={handleChange}
            placeholder="Digite o título aqui"
            required
          />
          <div className="invalid-feedback">{error}</div>
        </div>
        <button
          className="btn btn-success btn-lg w-100 shadow-sm"
          type="submit"
          style={{
            fontWeight: '700',
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          CRIAR !
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
