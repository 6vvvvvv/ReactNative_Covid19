import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  ListViewBase,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const List = (props) => {
  // const navigation = useNavigation();
  console.log('after filter:', props.aboutCountry);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const renderRow = ({item}) => {
    return (
      <View style={styles.inview}>
        <Text>{item.name}</Text>
        <Text>new:{item.new}</Text>
        <Text>death:{item.death}</Text>
        <Text>total:{item.total}</Text>
        <Button
          title="Go to Map"
          onPress={() => {
            for (let i = 0; i < props.aboutCountry.length; i++) {
              if (item.name == props.aboutCountry[i].name) {
                lat.push(props.aboutCountry[i].latitude);
                lon.push(props.aboutCountry[i].longitude);
              }
            }
            console.log('lat', lat);
            console.log('lon', lon);
            props.navigation.navigate('Map', {lat: lat, lon: lon});

            if (lat.length > 1) {
              lat.shift();
              lon.shift();
            }
            console.log('cleanlat', lat);
            console.log('cleanlon', lon);
          }}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={props.aboutCases}
      renderItem={({item}) => renderRow({item})}
      keyExtractor={(item) => item.id}
      style={styles.FlatListtext}
    />
  );
};

const styles = StyleSheet.create({
  FlatListtext: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
  },
  inview: {
    marginTop: 30,
    textAlign: 'center',
  },
});

export {List};
