import React from 'react';
import Swal from 'sweetalert2';
function handleSubmit(event) {
  event.preventDefault();
  Swal.fire({
    title: 'Message Sent!',
    text: 'Thank you for your message. We will get back to you soon.',
    icon: 'success',
    showConfirmButton: true,
  })
}
function Contacts() {
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have questions, feedback, or suggestions, please fill out the form below or reach out to us directly.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="5" placeholder="Type your message here"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
      <div className="mt-4">
        <h5>Other ways to reach us:</h5>
        <ul>
          <li>Email: <a href="mailto:support@blogit.com">support@blogit.com</a></li>
          <li>Twitter: <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">@BlogIt</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Contacts;