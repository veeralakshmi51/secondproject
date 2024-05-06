import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

const requestLocation = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok'
      }
    );
    console.log('location permission granted');
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

const App: React.FC = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const permission = async (): Promise<void> => {
    const latitudeThreshold = 0.0001;
    const longitudeThreshold = 0.0001;
    
    const granted = await requestLocation();
    if (granted) {
      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          console.log('position', position);
          const { latitude, longitude } = position.coords;
          setLocation(position);
          try {
            if (
              Math.abs(latitude - 9.502537) <= latitudeThreshold &&
              Math.abs(longitude - 77.5859619) <= longitudeThreshold
            ) {
              Alert.alert('Success', 'Found the location');
            } else {
              Alert.alert('Could not find the location');
            }
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
        (error: any) => {
          console.error('Error getting current position:', error);
          Alert.alert('Error', error.message);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      );
    } else {
      console.log('Location permission denied');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>Track User location</Text>
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Get Location" onPress={permission} />
      </View>
      {location && (
        <>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10
  }
});

export default App;
