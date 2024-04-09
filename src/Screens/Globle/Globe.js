import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Button, Animated} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {drawArcPolyline} from '../../Utils/mapUtils'; // Import your utility function

const Globe = () => {
  const mapRef = useRef(null); // Ref for accessing MapView methods
  const markerPosition = useRef(new Animated.Value(0)).current;

  // Define start and end locations (example coordinates)
  const startingDestination = {latitude: 13.0667, longitude: 80.2833}; // Chennai coordinates
  const endingDestination = {latitude: 28.6448, longitude: 77.216721}; // New Delhi coordinates
  const handleZoomToLocations = () => {
    if (mapRef.current) {
      const centerLatitude =
        (startingDestination.latitude + endingDestination.latitude) / 2;
      const centerLongitude =
        (startingDestination.longitude + endingDestination.longitude) / 2;
      const latitudeDelta =
        Math.abs(startingDestination.latitude - endingDestination.latitude) *
        1.2;
      const longitudeDelta =
        Math.abs(startingDestination.longitude - endingDestination.longitude) *
        1.2;

      // Zoom in to the starting destination
      mapRef.current.animateToRegion(
        {
          latitude: startingDestination.latitude,
          longitude: startingDestination.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
        1500, // Animation duration in milliseconds
      );

      // After 1500ms (1.5 seconds), zoom out to the ending destination
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude: endingDestination.latitude,
            longitude: endingDestination.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          },
          2000, // Animation duration in milliseconds
        );

        // After 3500ms (3.5 seconds), zoom back out to the original center
        setTimeout(() => {
          // Use larger latitudeDelta and longitudeDelta for zooming out
          const originalLatitudeDelta = 25; // Adjust as needed for your map
          const originalLongitudeDelta = 25; // Adjust as needed for your map

          mapRef.current.animateToRegion(
            {
              latitude: centerLatitude,
              longitude: centerLongitude,
              latitudeDelta: originalLatitudeDelta,
              longitudeDelta: originalLongitudeDelta,
            },
            1500, // Animation duration in milliseconds
          );
        }, 2500); // Delay after zooming to ending destination
      }, 1500); // Delay after zooming to starting destination
    }
  };
  //animation

  useEffect(() => {
    const coordinates = drawArcPolyline(startingDestination, endingDestination);

    // Animate marker position along the polyline
    Animated.loop(
      Animated.sequence([
        Animated.timing(markerPosition, {
          toValue: 1,
          duration: 5000, // Total animation duration in milliseconds
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 1, // Number of iterations (1 for one-way animation)
      },
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: startingDestination.latitude,
          longitude: startingDestination.longitude,
          latitudeDelta: 1, // Initial delta values (you can adjust as needed)
          longitudeDelta: 1,
        }}>
        <Polyline
          coordinates={drawArcPolyline(
            {
              latitude: startingDestination.latitude,
              longitude: startingDestination.longitude,
            },
            {
              latitude: endingDestination.latitude,
              longitude: endingDestination.longitude,
            },
          )}
          geodesic
          strokeWidth={3}
          strokeColor={'#000'}
        />
        {/* Optional: Add markers for start and end destinations */}
        {/* <Marker coordinate={startingDestination} title="Chennai">
          <Image
            source={require('../../../assets/Airplane.png')}
            style={styles.markerImage}
          />
        </Marker> */}
        <Marker coordinate={startingDestination}>
          <Animated.Image
            source={require('../../../assets/Airplane.png')}
            style={[
              styles.markerImage,
              {
                transform: [
                  {
                    translateX: markerPosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1], // Move marker along the path
                    }),
                  },
                ],
              },
            ]}
          />
        </Marker>
        <Marker coordinate={endingDestination} title="New Delhi" />
      </MapView>
      <Button title="Zoom" onPress={handleZoomToLocations} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40, // Customize the width of the marker image
    height: 40, // Customize the height of the marker image
    resizeMode: 'contain', // Optional: Control how the image is resized within the specified dimensions
  },
});

export default Globe;
