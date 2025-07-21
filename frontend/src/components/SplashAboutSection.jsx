import React from 'react';
import './SplashAboutSection.css';

const SplashAboutSection = () => {
  return (
    <section id="about" className="about-section">
      <h2>About Us</h2>
      <p>Founded in 2010, Hope Haven connects compassionate donors with verified children's homes and orphanages across Kenya. Our mission is to ensure every child has access to safe shelter, nutritious food, quality education, and loving care.

We carefully vet each partner organization to ensure they meet our high standards of care, transparency, and financial accountability. Our team regularly visits each home to monitor progress and assess needs.

To date, we've facilitated over $12 million in donations, directly impacting the lives of more than 5,000 children. 98% of every donation goes directly to program services.</p>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </section>
  );
};

export default SplashAboutSection;
