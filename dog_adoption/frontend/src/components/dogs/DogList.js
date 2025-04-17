import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import DogItem from './DogItem';
import './Dogs.css';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'adopted'
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('/api/dogs');
        const data = await response.json();
        setDogs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dogs:', err);
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const handleAdopt = async id => {
    try {
      const response = await fetch(`/api/dogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ adopted: true })
      });

      if (response.ok) {
        setDogs(dogs.map(dog => 
          dog._id === id ? { ...dog, adopted: true } : dog
        ));
      }
    } catch (err) {
      console.error('Error adopting dog:', err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to remove this dog?')) {
      try {
        const response = await fetch(`/api/dogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setDogs(dogs.filter(dog => dog._id !== id));
        }
      } catch (err) {
        console.error('Error deleting dog:', err);
      }
    }
  };

  const filteredDogs = dogs.filter(dog => {
    if (filter === 'available') return !dog.adopted;
    if (filter === 'adopted') return dog.adopted;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading dogs...</div>;
  }

  return (
    <div className="dog-list-container">
      <h2>Our Dogs</h2>
      
      <div className="dog-list-header">
        {isAuthenticated && (
          <Link to="/dogs/add" className="add-dog-btn">
            Add New Dog
          </Link>
        )}
        
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Dogs
          </button>
          <button 
            className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={`filter-btn ${filter === 'adopted' ? 'active' : ''}`}
            onClick={() => setFilter('adopted')}
          >
            Adopted
          </button>
        </div>
      </div>

      <div className="dog-list">
        {filteredDogs.length === 0 ? (
          <div className="no-dogs">
            <p>No dogs found matching your criteria.</p>
          </div>
        ) : (
          filteredDogs.map(dog => (
            <DogItem 
              key={dog._id} 
              dog={dog} 
              isAuthenticated={isAuthenticated}
              onAdopt={handleAdopt}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DogList;