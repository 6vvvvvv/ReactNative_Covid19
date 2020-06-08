import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const Map = ({route}) => {
  var {lat} = route.params;
  var {lon} = route.params;
  var {newtomap} = route.params;
  var {totaltomap} = route.params;

  const latit = parseFloat(JSON.stringify(lat[0]));
  const longi = parseFloat(JSON.stringify(lon[0]));
  const newtomap1 = JSON.stringify(newtomap[0]);
  const totaltomap1 = JSON.stringify(totaltomap[0]);
  console.log(latit);
  console.log(longi);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: latit,
            longitude: longi,
          }}
          // pinColor={'red'}
          tracksViewChanges={false}
          // title={"test"}
        >
          <View style={styles.mapStyle}>
            <Text style={styles.maptext}>
              {newtomap1} /
              "{totaltomap1}"
            </Text>
          </View>
        </Marker>
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
  mapStyle:{
    padding:10,
    borderRadius:10,
    backgroundColor:'#f23f34',
  },
  maptext:{
    color:'white',
    fontWeight:"bold",
  }
});

export {Map};
