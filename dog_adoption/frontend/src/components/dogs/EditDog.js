import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dogs.css';

const EditDog = () => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
    adopted: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await fetch(`/api/dogs/${id}`);
        
        if (!response.ok) {
          throw new Error('Dog not found');
        }
        
        const data = await response.json();
        setFormData({
          name: data.name,
          breed: data.breed,
          age: data.age,
          description: data.description || '',
          adopted: data.adopted
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDog();
  }, [id]);

  const { name, breed, age, description, adopted } = formData;

  const onChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/api/dogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name,
          breed,
          age: parseInt(age),
          description,
          adopted
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : 'Failed to update dog');
      }

      navigate('/dogs');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading dog information...</div>;
  }

  return (
    <div className="dog-form-container">
      <h2>Edit Dog</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={breed}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={onChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="adopted"
            name="adopted"
            checked={adopted}
            onChange={onChange}
          />
          <label htmlFor="adopted">Already Adopted</label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Update Dog</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/dogs')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDog;