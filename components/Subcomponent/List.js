import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
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

  const renderRow = ({item}) => {
    var Percentnew = ((item.new * 100) / item.total).toFixed(2);
    var PercentDeath = ((item.death * 100) / item.total).toFixed(2);
    var iconName;
    for (let i = 0; i < props.aboutCountry.length; i++) {
      if (item.name == props.aboutCountry[i].name) {
        iconName = props.aboutCountry[i].alpha2code;
      }
    }

    const _onPressButton = () => {
      for (let i = 0; i < props.aboutCountry.length; i++) {
        if (item.name == props.aboutCountry[i].name) {
          lat.push(props.aboutCountry[i].latitude);
          lon.push(props.aboutCountry[i].longitude);
          newtomap.push(item.new);
          totaltomap.push(item.total);
        }
      }
      // console.log('lat', lat);
      // console.log('lon', lon);
      // console.log('newtomap', newtomap);
      // console.log('totaltomap', totaltomap);
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
      // console.log('cleanlat', lat);
      // console.log('cleanlon', lon);
      // console.log('cleannewtomap', newtomap);
      // console.log('cleantotaltomap', totaltomap);
    };

    return (
      <View style={styles.inview}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={_onPressButton} underlayColor="white">
            <View style={styles.topContainerLeft}>
              <Image
                style={styles.img}
                source={{
                  uri:
                    'https://www.countryflags.io/' + iconName + '/shiny/64.png',
                }}
              />
              <Text style={styles.txt}>{item.name}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.topContainerRight}>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.downContainer}>
          <Text style={styles.new}>
            New:{numeral(item.new).format('0,0')}(%{Percentnew})
          </Text>
          <Text style={styles.death}>
            Death:{numeral(item.death).format('0,0')} (%{PercentDeath})
          </Text>
          <Text style={styles.total}>
            Total:{numeral(item.total).format('0,0')}
          </Text>
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
    borderTopColor:'#dbc3c1',
    borderTopWidth:3,
    borderBottomColor:'transparent',
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderWidth:1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainerLeft: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  downContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  img: {
    width: 40,
    height: 40,
  },
  new: {
    color: 'orange',fontWeight:'bold'
  },
  death: {color: 'red',fontWeight:'bold'},
  total: {color: 'green',fontWeight:'bold'},
  txt: {fontSize: 18, fontWeight: 'bold', marginLeft: 15},
  time:{fontWeight:'bold'}
});

export {List};
