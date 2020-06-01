import React from 'react';
import {FlatList, StyleSheet, Text, Dimensions, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const Map = ({route}) => {
  var {lat} = route.params;
  var {lon} = route.params;

 

  const latit = parseFloat(JSON.stringify(lat[0]));
  const longi = parseFloat(JSON.stringify(lon[0]));
  console.log(latit);
  console.log(longi);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        coordinate={{
          latitude: latit,
          longitude: longi,
        }}>
        <Marker
          coordinate={{
            latitude: latit,
            longitude: longi,
          }}
          pinColor={'red'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: H,
    width: W,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export {Map};
