import React from 'react';
import { Link } from 'react-router-dom';
import './Dogs.css';

const DogItem = ({ dog, isAuthenticated, onAdopt, onDelete }) => {
  return (
    <div className={`dog-card ${dog.adopted ? 'adopted' : ''}`}>
      <h3>{dog.name}</h3>
      <div className="dog-info">
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age} {dog.age === 1 ? 'year' : 'years'}</p>
        {dog.description && (
          <p className="description">
            <strong>Description:</strong> {dog.description}
          </p>
        )}
        <p className="status">
          <strong>Status:</strong> {' '}
          <span className={dog.adopted ? 'adopted-text' : 'available-text'}>
            {dog.adopted ? 'Adopted' : 'Available'}
          </span>
        </p>
      </div>
      
      {isAuthenticated && (
        <div className="dog-actions">
          {!dog.adopted && (
            <button 
              className="btn btn-success" 
              onClick={() => onAdopt(dog._id)}
            >
              Mark Adopted
            </button>
          )}
          <Link 
            to={`/dogs/edit/${dog._id}`} 
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(dog._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DogItem;