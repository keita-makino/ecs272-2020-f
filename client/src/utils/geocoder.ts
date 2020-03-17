import maps from '@google/maps';

const initializeGeocoder = (apiKey: string) => {
  const geocoder = maps.createClient({
    key: apiKey,
    Promise: Promise
  });

  return geocoder;
};

export default initializeGeocoder;
