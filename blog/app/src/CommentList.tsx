import React, { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <div>Sem comentários para esta postagem.</div>;
  }

  return (
    <ul className="list-group">
      {comments.map((comment) => (
        <li key={comment.id} className="list-group-item">
          {comment.content}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
