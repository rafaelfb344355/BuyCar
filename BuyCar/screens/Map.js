import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert,Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getLocationPermission();
    setMarkers([
      { latitude: -8.063260,longitude: -34.871080},
      {latitude: -8.054650, longitude: -34.881190},
      {latitude: -8.047540, longitude: -34.876530 }, 
      // Outro exemplo de marcador predefinido
      // Adicione mais marcadores predefinidos aqui
    ]);
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização negada');
      return;
    }

    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert('Erro ao obter a localização', error.message);
    }
  };

  const renderMarkers = () => {
    const renderedMarkers = markers.map((marker, index) => (
      <Marker key={index} coordinate={marker} /> // Marcadores predefinidos
    ));

    if (location) {
      renderedMarkers.push(
        <Marker key="currentLocation" coordinate={location}>
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Você está aqui</Text>
            </View>
          </Callout>
        </Marker>
      ); // Marcador da localização atual
    }

    return renderedMarkers;
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {renderMarkers()}
        </MapView>
      )}
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
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  calloutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Map;
