import * as React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import config from '@/config';
import Loading from '../../Loading';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface Props {
  locations: string[];
}

function GooglMapContainer({ locations = [] }: Props) {
  const markerLatLngs = locations.map((loc: string) => {
    const [lat, lng] = loc.split(',').map((x) => parseFloat(x));
    return { lat, lng, key: loc };
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.google.maps,
  });

  // const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds();

    for (let i = 0; i < markerLatLngs.length; i += 1) {
      bounds.extend(markerLatLngs[i]);
    }
    mapInstance.fitBounds(bounds);
    // setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(() => {
    // setMap(null);
  }, []);

  if (loadError) {
    return <p>Error Loading Map</p>;
  }

  if (!isLoaded) {
    return <Loading withBg>Loading...</Loading>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerLatLngs.map((x) => (
        <Marker key={x.key} position={x} />
      ))}
    </GoogleMap>
  );
}

export default React.memo(GooglMapContainer);
