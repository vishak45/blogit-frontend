import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditBlog() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [valueEdit, setValue] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://blogit-backend-nfpc.onrender.com/api/blog/getspecific/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          
          const data = await response.json();
          setValue(data.data);
        }
      } catch (error) {
        console.log("fail", error);
      }
    };
    fetchBlog();
  }, [id, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await fetch(`https://blogit-backend-nfpc.onrender.com/api/blog/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.status == 200) {
       
        Swal.fire({
          title: "Blog Updated!",
          text: "You will be redirected to your blogs page.",
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
        });

        setTimeout(() => navigate("/your-blog"), 1500);
      }
    } catch (error) {
      console.log("fail", error);
    }
  };
  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",

        marginTop: "150px",
        marginBottom: "100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="mt-4">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={valueEdit.title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValue({ ...valueEdit, title: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="5"
            value={valueEdit.description}
            onChange={(e) => {
              setDescription(e.target.value);
              setValue({ ...valueEdit, description: e.target.value });
            }}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Edit Blog
        </button>
      </form>
    </div>
  );
}
