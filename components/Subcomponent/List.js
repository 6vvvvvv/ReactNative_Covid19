import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const List = (props) => {
  // const navigation = useNavigation();
  console.log('after filter:', props);

  // TODO: it should pass the param to map detail
  const onClickToMap = (props) => {
    return 
  };

  return (
    <FlatList
      data={props.fromDict1}
      renderItem={({item}) => (
        <View style={styles.inview} onClick={onClickToMap}>
          <Text>{item.name}</Text>
          <Text>new:{item.new}</Text>
          <Text>death:{item.death}</Text>
          <Text>total:{item.total}</Text>
          <Button
            title="Go to Map"
            onPress={() => props.navigation.navigate('Map')}
          />
          {/* <Button
            title="Go to Map"
            onPress={() => navigation.navigate('Map')}
          /> */}
          {/* <Text style={styles.inview} >
            {item.name}
            {'            '}new:{item.new}
            {'            '}death:{item.death}
            {'            '}total:{item.total}
          </Text> */}
        </View>
      )}
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

export {List}
