import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function Home() {
  let flag = 0;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blogit-backend-nfpc.onrender.com/api/blog/allblog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data.data); // <-- Use the array inside the response
       
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  const likeIncrease = async (uid, bid) => {
    if (!token) {
      Swal.fire({
        title: "You need to login first",
        icon: "warning",
      });
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
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Welcome to BlogIt!</h1>
        <p className="lead">
          Share your thoughts, read interesting posts, and connect with others.
        </p>
        <hr className="my-4" />
        <p>Click below to explore blogs or create your own.</p>
       <div className="d-flex flex-wrap gap-2">
  <Link className="btn btn-primary btn-lg me-2" to="/your-blog" role="button">
    Your Blogs
  </Link>
  <Link className="btn btn-secondary btn-lg" to="/create-blog" role="button">
    Create Blog
  </Link>
</div>

      </div>
      <div
        className="row mt-5"
        style={{
          height: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="col-md-4"
          style={{
            height: "100%",
            
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h2>Latest Posts</h2>
          <p>Check out the latest posts from our community.</p>
          <div className="blog-card">
            {blogs.length > 0 ? (
              blogs.map(
                (blog) => (
                  (flag = 0),
                  (
                    <div className="blog-owner">
                      <div key={blog._id} className="owner-info">
                        <div className="owner-details">
                          {blog.userId == userId && token ? (
                            <>
                              <span className="owner-name">You</span>
                              <span className="owner-date">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="owner-name">
                                {blog.userName}
                              </span>
                              <span className="owner-date">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div key={blog._id} className="blog-content">
                        <div className="blog-image" id="blog-image">
                          {blog.Images && blog.Images.length > 0
                            ? blog.Images.map(
                                (image, index) => (
                                  flag++,
                                  (
                                    <img
  key={index}
  src={image.imageUrl.replace(/\\/g, "/")}
  alt={`Blog Image ${index + 1}`}
/>

                                  )
                                )
                              )
                            : null}
                          {flag < 1 ? null : null}
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <div className="blog-actions">
                          {blog.likes.some(
                            (like) => like.user.toString() === userId.toString()
                          ) ? (
                            <button
                              className="like-btn liked"
                              style={{
                                color: "#3d77e3",
                              }}
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
                            >
                              <i className="bi bi-hand-thumbs-up me-1"></i>
                              <span>{blog.likes.length}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              )
            ) : (
              <div>No New Blogs</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
