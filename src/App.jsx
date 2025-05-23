import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/home'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import About from './components/about/About'
import Contact from './components/contacts/Contacts'
import Login from './components/signup/Login'
import Register from './components/signup/Register'
import CreateBlog from './components/createblog/CreateBlog'
import YBlogs from './components/yourBlog/YBlogs'
import EditBlog from './components/createblog/EditBlog'
import SearchResults from './components/searchresults/SearchResults'
function App() {
  return (
    <Router>
      <Header />
      {/* Add more components here */}
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Login />} />
           <Route path="/register" element={<Register />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/your-blog" element={<YBlogs />} />
           <Route path="/your-blog-edit/:id" element={<EditBlog />} />
            <Route path="/search-results/:key" element={<SearchResults />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App