import './feature.css'

import React, { useState } from 'react';

const Feature = (props) => {
  const [title, setTitle] = useState(props.properties.title);
  const [description, setDescription] = useState(props.properties.description);
  const [longitude, setLongitude] = useState(props.geometry.coordinates[0]);
  const [latitude, setLatitude] = useState(props.geometry.coordinates[1]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFeature = {
      type: 'Feature',
      properties: { title, description },
      geometry: {
        coordinates: [longitude, latitude],
        type: 'Point'
      }
    };
    // Aquí puedes hacer la llamada a una API para actualizar la información usando el método PUT
    console.log(updatedFeature);
  };

  return (
    <form onSubmit={handleSubmit} id="feature-form">

      <div className='input-group mb-3'>
        <span className='input-group-text'>Title</span>
        <input
          type="text"
          value={title}
          className='rounded'
          onChange={(event) => setTitle(event.target.value)} />
      </div>
      <br />
      <div className='input-group mb-3'>
        <span className='input-group-text'>Description</span>
        <input
          type="text"
          value={description}
          className='rounded'
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <br />
      <div className='input-group mb-3'>
        <span className='input-group-text'>Longitud</span>
        <input
          type="text"
          value={longitude}
          className='rounded'
          onChange={(event) => setLongitude(event.target.value)}
        />
      </div>
      <br />
      <div className='input-group mb-3'>
        <span className='input-group-text'>Latitud</span>
        <input
          type="text"
          value={latitude}
          className='rounded'
          onChange={(event) => setLatitude(event.target.value)}
        />
      </div >
      <br />
      <button type="submit" className='btn btn-dark'>Submit</button>
    </form>
  );
};

export default Feature;
