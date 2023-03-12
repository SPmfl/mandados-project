import React, {useState} from 'react';
import { Popup } from 'react-map-gl';
import { lineOffset } from '@turf/turf';


const createParallelLines = (line, offset) => {
    const leftLine = lineOffset(line, offset, { units: "miles" });
    const rightLine = lineOffset(line, -offset, { units: "miles" });
    return [leftLine, rightLine];
  };

  const line = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [-75.41669, 37.77683],
        [-75.40788, 37.77572],
        [-75.40426, 37.77364],
        [-75.40136, 37.77109],
        [-75.39862, 37.76859],
      ],
    },
  };

const parallelLines = createParallelLines(line, 0.01);



export default {createParallelLines,};


