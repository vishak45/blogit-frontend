import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
function Header() {
  const token = localStorage.getItem("token");
const navigate = useNavigate();
const user= JSON.parse(localStorage.getItem("user"));
const name= user ? user.name : "";
const [searchTerm, setSearchTerm] = useState('');
const isSearch=async(e)=>{
  if(searchTerm!=""){
 navigate(`/search-results/${searchTerm}`);
 return;
  }
e.preventDefault();
}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">BlogIt</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {
              token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" 
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, logout!'
                      }).then((result) => {
                       if (result.isConfirmed) {
                          Swal.fire({
                            title: 'Logged out!',
                            text: 'You have been logged out.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1200
                          });
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          setTimeout(() => {
                            navigate("/");
                            window.location.reload();
                          }, 1200); // 1.2 seconds delay
                        }
                                              })
                      
                    }}
                    style={{ cursor: "pointer",
                      fontWeight: "bold",
                      color: "white",
                     
                      
                     }}>
                    
                    {name}</Link>
                  
                  </li>
                </>
              ) : (
                <>
                    <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign In</Link>
            </li>
                </>
              )
             
            }
           
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
            <form className="d-flex ms-3" role="search"
            onSubmit={isSearch}
            >
    <input
      className="form-control me-2"
      type="search"
      placeholder="Search blogs"
      aria-label="Search"
      style={{ minWidth: "200px" }}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="btn btn-outline-light" type="submit">
      Search
    </button>
  </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;