import React from 'react';
import { Link } from 'react-router-dom';
function About() {
  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4">About BlogIt</h1>
      <p>
        <strong>BlogIt</strong> is a modern blogging platform designed to help you share your thoughts, stories, and ideas with the world. Whether you're a passionate writer, a casual blogger, or just looking to connect with others, BlogIt provides an easy and intuitive way to create, read, and interact with blog posts.
      </p>
      <h3 className="mt-4">Features</h3>
      <ul>
        <li>Create and manage your own blogs</li>
        <li>Upload images to enhance your posts</li>
        <li>Read and explore blogs from the community</li>
        <li>Edit or delete your posts anytime</li>
        <li>Simple, clean, and responsive design</li>
      </ul>
      <h3 className="mt-4">Our Mission</h3>
      <p>
        Our mission is to empower everyone to express themselves and connect through writing. We believe that everyone has a story to tell, and BlogIt is here to make sharing those stories easy and enjoyable.
      </p>
      <h3 className="mt-4">Contact Us</h3>
      <p>
        Have questions, feedback, or suggestions? Visit our <Link to="/contact">Contact Us</Link> page. We'd love to hear from you!
      </p>
    </div>
  );
}

export default About;