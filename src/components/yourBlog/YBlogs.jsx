import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./YBlog.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function YBlogs() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
   const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }
  }, [token, navigate]);
  const deleteHandle = async (x) => {
    try {
     
      const res = await fetch(`https://blogit-backend-nfpc.onrender.com/api/blog/delete/${x}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status == 200) {
        Swal.fire({
          title: "Blog deleted",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const isConfirm = (value) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandle(value);
      }
    });
  };
  const likeIncrease = async (uid, bid) => {
      if(!token){
        Swal.fire({
          title: "You need to login first",
          icon: "warning",
        })
        return;
      }
  
      try {
        const response = await fetch(
          `https://blogit-backend-nfpc.onrender.com/api/blog/like/${bid}/${uid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          console.log("success");
          const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === bid ? { ...blog, likes: updatedBlog.data.likes } : blog
          )
        );
        }
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blogit-backend-nfpc.onrender.com/api/blog/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data.data); // <-- Use the array inside the response
        console.log("success");
  
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [token]);
  return (
    <div className="container mt-5">
      <h1>Your Blogs</h1>
        <p className="lead">
              Find all your blogs here, make edits or delete as you please
            </p>
      <div className="blog-cards">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              className="col-md-4 mb-4"
              key={blog._id}
              style={{
                width: "100%",
              }}
            >
              <div
                className="card"
                style={{
                  padding: "10px",
                }}
              >
                <div className="image-container">
                  {blog.Images&&blog.Images.length>0
                    ? blog.Images.map((image) =>
                        
                        <img
  src={image.imageUrl}
  className="card-img-top"
  alt={blog.title}
  key={image._id}
/>


                       
                      )
                    : null}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description}</p>
                  <p className="card-text">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                   {blog.likes.some(
                            (like) => like.user.toString() === userId.toString()
                          ) ? (
                            <button className="like-btn liked"
                            style={
                              {
                                color:"#3d77e3",
                                 border: "none",
                                 backgroundColor: "white"
                              }
                            }
                             onClick={() => {
                                likeIncrease(userId, blog._id);
                              }}
                            >
                              <i className="bi bi-hand-thumbs-up-fill me-1"></i>
                              <span>{blog.likes.length}</span>
                            </button>
                          ) : (
                            <button
                              className="like-btn"
                              onClick={() => {
                                likeIncrease(userId, blog._id);
                              }}
                              style={{
                                 border: "none"
                            , backgroundColor: "white"
                              }}
                            >
                              <i className="bi bi-hand-thumbs-up me-1"></i>
                             <span>{blog.likes.length}</span>
                            </button>
                          )}
                  <button
                    className="comment-btn"
                    onClick={() => isConfirm(blog._id)}
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      marginRight: "50px",
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <Link
                    className="btn btn-primary"
                    to={`/your-blog-edit/${blog._id}`}
                  >
                    edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-blogs-wrapper">
  <div className="no-blogs-message">
    <h1 className="display-6">No Blogs :( </h1>
    <p className="lead">Share your thoughts, read interesting posts, and connect with others.</p>
    <hr className="my-4" />
    <p>Click below to create your own.</p>
    <Link className="btn btn-secondary" to="/create-blog" role="button">
      Create Blog
    </Link>
  </div>
</div>
        )}
      </div>
    </div>
  );
}

export default YBlogs;
