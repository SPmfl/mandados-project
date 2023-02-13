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
      <label className='.tags'>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <br />
      <label>
        Longitude:
        <input
          type="text"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
        />
      </label>
      <br />
      <label>
        Latitude:
        <input
          type="text"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
      </label>
      <br />
      <button type="submit" className='btn btn-dark'>Submit</button>
    </form>
  );
};

export default Feature;
