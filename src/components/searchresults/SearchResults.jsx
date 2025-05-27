import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function SearchResults() {
  let flag = 0;
  const { key } = useParams();
  const [blog, setBlog] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";
  useEffect(() => {
    const isSearch = async () => {
      try {
        const res = await fetch(`https://blogit-backend-nfpc.onrender.com/api/blog/search/${key}`);
        if (res.status === 200) {
          const data = await res.json();
          

          if (data.data.length > 0) {
            
            setBlog(data.data);
            
          } 
        }
      } catch (error) {
        console.log(error);
      }
    };
    isSearch();
  }, [key]);
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
        setBlog((prevBlogs) =>
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
    <div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Search Results of "{key}"</h2>
        <div className="row">
          {blog.length > 0 ? (
            <div>
              {blog.length > 0 ? (
                blog.map(
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
                                  {new Date(
                                    blog.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="owner-name">
                                  {blog.userName}
                                </span>
                                <span className="owner-date">
                                  {new Date(
                                    blog.createdAt
                                  ).toLocaleDateString()}
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
                                        src={`https://blogit-backend-nfpc.onrender.com/${image.imageUrl.replace(
                                          /\\/g,
                                          "/"
                                        )}`}
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
                              (like) =>
                                like.user.toString() === userId.toString()
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
          ) : (
            <div className="mb-5">
              <h1 className="display-4 mt-5">No Blogs :( </h1>
              <p className="lead">No Blogs found for "{key}".</p>
              <hr className="my-4 mt-5" />
              <p>Search Blogs By Title, Author or any keyword.</p>
              <p className="lead">Or,</p>
              <Link
                className="btn btn-secondary btn-lg mt-3 mb-5"
                to="/create-blog"
                role="button"
              >
                Create Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
