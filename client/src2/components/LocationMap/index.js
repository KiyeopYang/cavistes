import React from 'react';
import Iframe from 'react-iframe';

const APIKEY = 'AIzaSyDGpjnB0BnkULhy0UnTifuVUAscGZ9REtY';
const LocationMap = ({ string, ...rest }) => (
  <Iframe
    { ...rest }
    url={`https://www.google.com/maps/embed/v1/place?key=${APIKEY}&q=${string.replace(/[\s]/g,'+')}`}
  />
);
export default LocationMap;
