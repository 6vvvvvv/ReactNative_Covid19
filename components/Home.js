import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, Image} from 'react-native';
import {Search} from './Subcomponent/Search';
import {List} from './Subcomponent/List';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      cases: [],
      dict: [],
      dict1: [],
      copydict1: [],
    };
  }

  componentDidMount = () => {
    //location detail
    const fetchcountry = async () => {
      const reponse = await fetch(
        'https://covid-19-data.p.rapidapi.com/help/countries?format=json',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
            'x-rapidapi-key':
              '36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366',
          },
        },
      );
      const result = await reponse.json();
      const tmp = result.length;
      /**
       * as result can be only read
       */
      for (let i = 0; i < tmp; i++) {
        this.state.countries.push(result[i]);
      }

      console.log('countries async', this.state.countries);
    };
    // case detail
    const fetchcovidSum = async () => {
      const reponse = await fetch(
        'https://covid-193.p.rapidapi.com/statistics',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key':
              '36ff827798msh0b08408c4d3522cp14bfcejsn602beb5fc366',
          },
        },
      );
      const result = await reponse.json();
      // console.log('covidsum:', result.response);

      const tmp = result.response.length;
      /**
       * as result can be only read
       */
      for (let i = 0; i < tmp; i++) {
        this.state.cases.push({
          description: result.response[i],
        });
      }

      // countries.push(result.response[i].country);

      console.log('cases async', this.state.cases);

      for (let i = 0; i < tmp; i++) {
        this.state.dict.push({
          id: i,
          name: this.state.cases[i].description.country,
        });
      }

      for (let i = 0; i < tmp; i++) {
        this.state.dict1.push({
          id: i,
          name: this.state.cases[i].description.country,
          new: this.state.cases[i].description.cases.new,
          death: this.state.cases[i].description.deaths.total,
          total: this.state.cases[i].description.cases.total,
          time: this.state.cases[i].description.time,
        });

        this.state.copydict1.push({
          id: i,
          name: this.state.cases[i].description.country,
          new: this.state.cases[i].description.cases.new,
          death: this.state.cases[i].description.deaths.total,
          total: this.state.cases[i].description.cases.total,
          time: this.state.cases[i].description.time,
        });
      }
      console.log('checkcopy', this.state.copydict1);
    };

    fetchcountry();
    fetchcovidSum();

    console.log('this.state.dict', this.state.dict);
    console.log('this.state.dict1', this.state.dict1);
  };

  onClickSelectCountry = (item) => {
    console.log('verify', this.state.copydict1);
    console.log('fromchilditem', item);
    //empty the list

    while (this.state.dict1.length > 0) {
      this.state.dict1.pop();
    }

    // setDict1(dict1)
    console.log('clear list', this.state.dict1);

    this.state.dict1.push(this.state.copydict1[item]);
    console.log('push', this.state.dict1);
    this.setState({
      dict1: this.state.dict1,
    });
  };

  render() {
    return (
      <View>
        <SafeAreaView>
          <View style={styles.search}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('./Subcomponent/assets/UI-covid19/drawable-hdpi/corona-8.png')}
              />
            </View>
            <View style={styles.Searchbarview}>
              <Search
                aboutCountry={this.state.dict}
                onClickSelectCountry={this.onClickSelectCountry}
              />
            </View>
          </View>
        
          <View style={styles.Flatlistview}>
            <List
              aboutCases={this.state.dict1}
              aboutCountry={this.state.countries}
              navigation={this.props.navigation}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor:'#f23f34',
  },
  Searchbarview: {
    position: 'relative',
    width: 0.95 * W,
    left: 30,
  },
  tinyLogo: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 6,
    top: 30,
  },
  Flatlistview: {
    position: 'relative',
    width: 0.95 * W,
    height: H,
    left: 10,
    backgroundColor:'white'
  },

});

export {Home};
