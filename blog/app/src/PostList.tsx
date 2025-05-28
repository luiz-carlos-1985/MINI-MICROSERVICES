import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

interface Post {
  id: string;
  title: string;
}

interface CommentsByPostId {
  [postId: string]: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Record<string, Post>>({});
  const [commentsByPostId, setCommentsByPostId] = useState<CommentsByPostId>({});

  const fetchPosts = async () => {
    const response = await axios.get<Record<string, Post>>("http://localhost:3001/posts");
    setPosts(response.data);
  };

  const fetchComments = async () => {
    const commentsData: CommentsByPostId = {};
    for (const postId of Object.keys(posts)) {
      try {
        const response = await axios.get<Comment[]>(`http://localhost:2000/posts/${postId}/comments`);
        commentsData[postId] = response.data;
      } catch (error) {
        commentsData[postId] = [];
      }
    }
    setCommentsByPostId(commentsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (Object.keys(posts).length > 0) {
      fetchComments();
    }
  }, [posts]);

  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const handleCommentCreated = async (postId: string) => {
    if (!commentsLoaded) {
      await fetchComments();
      setCommentsLoaded(true);
    }
  };

  const renderedPosts = Object.values(posts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts.length === 0 ? (
        <p>Não há postagens para exibir.</p>
      ) : (
        renderedPosts.map((post) => (
          <div key={post.id} className="card-body">
            <h3>{post.title}</h3>
            <CommentCreate postId={post.id} onCommentCreated={() => handleCommentCreated(post.id)} />
            <CommentList comments={commentsByPostId[post.id] || []} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
