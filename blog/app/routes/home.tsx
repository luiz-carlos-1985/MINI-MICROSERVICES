import React from 'react';
import PostCreate from '../src/PostCreate';

export function meta() {
  return [
    { title: "BLOG" },
    { name: "description", content: "BLOG com React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="container mt-5">
      <header className="bg-primary text-white p-4 rounded mb-4 shadow-sm">
        <h1 className="display-4">CRIAR POST</h1>
        <p className="lead">Use o formulário abaixo para criar um novo post.</p>
      </header>
      <div className="card p-4 shadow-sm">
        <PostCreate />
      </div>
    </div>
  );
}



