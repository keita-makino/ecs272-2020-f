import React from 'react';
import { Set } from '../types/Set';

import mock from '../data/mock.json';

// mock
// [
//   { id: 1, lat: 100, lng: 120, name: 'rest1', type: 'restaurant' },
//   { id: 2, lat: 300, lng: 420, name: 'rest2', type: 'restaurant' },
//   ...
// ];

const usePowers = () => {
  console.log(mock);

  const cellSize = 10; // you may change this
  const sets: Set[] = mock; // ... change this to get the "sets"

  console.log(sets);

  // sets
  // [
  //   {
  //     type: 'restaurant',
  //     data: [
  //       { id: 1, lat: 100, lng: 120, name: 'rest1' },
  //       { id: 2, lat: 300, lng: 420, name: 'rest2' },
  //       ...
  //     ]
  //   },
  //   {
  //     type: 'medical clinic',
  //     data: [
  //       { id: 4, lat: 120, lng: 180, name: 'clic1' },
  //       { id: 6, lat: 330, lng: 220, name: 'clic2' },
  //       ...
  //     ]
  //   }
  // ];

  const points: any[] = sets; // ... change this to get the "points"

  // points
  // const hoe = [
  //   {
  //     type: 'restaurant',
  //     data: [
  //       { lat: 150, lng: 120, energy: 0.5 }, // the latlng should be the center of each cell
  //       { lat: 310, lng: 420, energy: 0.9 }, // the space between each cell is equal to "cellSize"
  //       ...
  //     ]
  //   },
  //   {
  //     type: 'medical clinic',
  //     data: [
  //       { lat: 125, lng: 175, energy: -0.5 },
  //       { lat: 232, lng: 445, energy: -0.9 },
  //       ...
  //     ]
  //   }
  // ];

  console.log(points);
  return null;
};

export default usePowers;
