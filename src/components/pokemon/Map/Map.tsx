import * as React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function MyComponent({ id, locations = [] }) {
  const markerLatLngs = locations.map((x) => {
    const [lat, lng] = x.split(',').map((x) => parseFloat(x));
    return { lat, lng, key: x };
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    for (let i = 0; i < markerLatLngs.length; i++) {
      bounds.extend(markerLatLngs[i]);
    }
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerLatLngs.map((x) => {
        return <Marker key={x.key} position={x} />;
      })}
    </GoogleMap>
  );
}

export default React.memo(MyComponent);
