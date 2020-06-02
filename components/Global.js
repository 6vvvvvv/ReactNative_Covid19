import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      country: [],
    };
  }

  async componentDidMount() {

    await fetch('https://covid-193.p.rapidapi.com/statistics', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({cases:data.response})
        console.log("asdddddddddddd",this.state.cases);
      });

    await fetch(
      'https://covid-19-data.p.rapidapi.com/help/countries?format=json',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
          'x-rapidapi-key':
            '36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        
        
        this.setState({
          country:data
        })
        console.log("dddddddddddddd",this.state.country);
      });
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: this.state.country[0].latitude,
            longitude: this.state.country[0].longitude,
          }}
          tracksViewChanges={false}></Marker>
        
      </MapView>
    );
  }
}

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

export {Global};
