// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import CSS Modules styles
import image1 from '../HomePage/EventManagementImage1.jpg'; // Import images
import image2 from '../HomePage/events1.jpg'; // Import images

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Welcome to EvenTURE</h1>
        <p>Your ultimate event management platform</p>
        <Link to="/events/view/all" className={styles.btn}>Explore Events</Link>
      </header>

      <section className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.feature}>
          <h3>Event Creation</h3>
          <p>Easily create and customize events with our user-friendly interface.</p>
        </div>
        <div className={styles.feature}>
          <h3>Attendee Management</h3>
          <p>Efficiently manage attendees and send out invitations and updates.</p>
        </div>
        {/* Add more features as needed */}
      </section>

      <section className={styles.gallery}>
        <h2>Gallery</h2>
        <div className={styles.images}>
          <img src={image1} alt="." />
          <img src={image2} alt="Event Image 2" />
          {/* Add more images as needed */}
        </div>
      </section>
      
    </div>
  );
};

export default Home;
