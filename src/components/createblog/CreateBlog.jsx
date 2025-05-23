import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [images, setImages] = useState([null, null, null, null]); // Array to hold image data
   const navigate = useNavigate();
  useEffect(() => {
 const token1 = localStorage.getItem("token");
    if (!token1) {
        
        navigate("/signup");
        return;
    }}, [navigate]);
 const token = localStorage.getItem("token");
  const handleSubmit = async(e) => {
    e.preventDefault();
     const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((img, idx) => {
      if (img) formData.append('images', document.getElementById(`image${idx+1}`).files[0]);
    });
    try{
             await axios.post(
      "https://blogit-backend-38mt.onrender.com/api/blog/create",
       formData ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );


    // Reset form
   Swal.fire({
  title: 'Blog created successfully!',
  text: 'You will be redirected to the home page.',
  icon: 'success',
  timer: 1500,
  showConfirmButton: false,
  timerProgressBar: true, // adds a progress animation
  willClose: () => {
    navigate("/");
  }
});
    
    setTitle('');
    setDescription('');
    }
   catch (error) {

        console.error('Error creating blog:', error);
        // Handle error (e.g., show a message to the user)
        }
   }
const handleImageChange = (e, idx) => {
  const file = e.target.files[0];
  setImages(prev => {
    const updated = [...prev];
    updated[idx] = file;
    return updated;
  });
};

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create Blog</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <h3>Add Images</h3>
        {/* Four image input fields */}
        <div className="mb-3">
          <label htmlFor="image1" className="form-label">Image 1</label>
          <input type="file" className="form-control" id="image1" accept="image/*"
          onChange={(e) => handleImageChange(e, 0)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image2" className="form-label">Image 2</label>
          <input type="file" className="form-control" id="image2" accept="image/*" 
          onChange={(e) => handleImageChange(e, 1)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image3" className="form-label">Image 3</label>
          <input type="file" className="form-control" id="image3" accept="image/*" 
          onChange={(e) => handleImageChange(e, 2)}
          />
        </div>
  
        <button type="submit" className="btn btn-primary w-100">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;