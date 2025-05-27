import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const fetchPosts = async () => {
    const response = await axios.get<Record<string, Post>>("http://localhost:3001/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts.length === 0 ? (
        <p>Não há postagens para exibir.</p>
      ) : (
        renderedPosts.map((post) => (
          <div key={post.id} className="card-body">
            <h3>{post.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
