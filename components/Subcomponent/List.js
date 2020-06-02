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
import numeral from 'numeral';

// import { useNavigation } from '@react-navigation/native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const List = (props) => {
  // const navigation = useNavigation();
  console.log('after filtercountry:', props.aboutCountry);
  console.log('after filtercases:', props.aboutCases);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [newtomap, setNewtomap] = useState([]);
  const [totaltomap, setTotaltomap] = useState([]);

  // const PercentConfirmed = ((dataObj.cases.total * 100) / currentCon.population)
  // const PercentDeath = ((dataObj.deaths.total * 100) / dataObj.cases.total)
  // const PercentRecovered = ((dataObj.cases.recovered * 100) / dataObj.cases.total)

  const renderRow = ({item}) => {
    var Percentnew = ((item.new * 100) / item.total).toFixed(2);
    var PercentDeath = ((item.death * 100) / item.total).toFixed(2);
    return (
      <View style={styles.inview}>
        <View style={styles.topContainer}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.downContainer}>
          <Text>
            new:{numeral(item.new).format('0,0')}(%{Percentnew})
          </Text>
          <Text>
            death:{numeral(item.death).format('0,0')} (%{PercentDeath})
          </Text>
          <Text>total:{numeral(item.total).format('0,0')}</Text>
        </View>
        <View>
          <Button
            title="Go to Map"
            onPress={() => {
              for (let i = 0; i < props.aboutCountry.length; i++) {
                if (item.name == props.aboutCountry[i].name) {
                  lat.push(props.aboutCountry[i].latitude);
                  lon.push(props.aboutCountry[i].longitude);
                  newtomap.push(item.new);
                  totaltomap.push(item.total);
                }
              }
              console.log('lat', lat);
              console.log('lon', lon);
              console.log('newtomap', newtomap);
              console.log('totaltomap', totaltomap);
              props.navigation.navigate('Map', {
                lat: lat,
                lon: lon,
                newtomap: newtomap,
                totaltomap: totaltomap,
              });

              if (lat.length > 1) {
                lat.shift();
                lon.shift();
                newtomap.shift();
                totaltomap.shift();
              }
              console.log('cleanlat', lat);
              console.log('cleanlon', lon);
              console.log('cleannewtomap', newtomap);
              console.log('cleantotaltomap', totaltomap);
            }}
          />
        </View>
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
  inview: {
    marginTop: 30,
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',

    // alignItems: 'flex-',
  },
  downContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export {List};
