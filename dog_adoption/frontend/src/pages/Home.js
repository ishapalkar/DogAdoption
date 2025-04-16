import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import DogCard from '../components/DogCard';
import './Home.css';

function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await axios.get('/dogs');
        setDogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDogs();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Adoptable Dogs</h2>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <DogCard key={dog._id} dog={dog} />
        ))}
      </div>
    </div>
  );
}

export default Home;
