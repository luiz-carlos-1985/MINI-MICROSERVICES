import React, { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
  onCommentCreated?: () => void;
}

const CommentCreate: React.FC<CommentCreateProps> = ({ postId, onCommentCreated }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) {
      alert("O comentário não pode estar vazio.");
      return;
    }
    try {
      await axios.post(`http://localhost:2000/posts/${postId}/comments`, {
        content: comment,
      });
      alert("Comentário enviado com sucesso!");
      setComment("");
      if (onCommentCreated) {
        onCommentCreated();
      }
    } catch (error) {
      alert("Erro ao enviar comentário.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group m-2'>
          <label>Novo Comentário</label>
          <input
            className='form-control'
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
          />
        </div>
        <button className='btn btn-primary m-2' type="submit">COMENTAR</button>
      </form>
    </div>
  );
};

export default CommentCreate;
