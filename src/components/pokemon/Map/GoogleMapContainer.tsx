import * as React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface Props {
  locations: string[];
}

function MyComponent({ locations = [] }: Props) {
  const markerLatLngs = locations.map((loc: string) => {
    const [lat, lng] = loc.split(',').map((x) => parseFloat(x));
    return { lat, lng, key: loc };
  });

  // const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(mapInstance) {
    const bounds = new window.google.maps.LatLngBounds();

    for (let i = 0; i < markerLatLngs.length; i += 1) {
      bounds.extend(markerLatLngs[i]);
    }
    mapInstance.fitBounds(bounds);
    // setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    // setMap(null);
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
