import React, {Component, Fragment} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dimensions} from 'react-native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      //items should be a list
      items: this.props.aboutCountry,
      // tofather: this.props.aboutCases,
    };
    console.log('aboutCountry', this.state.items);
    // console.log('this.state.tofather', this.state.tofather);
  }

  // pass data to parent to change country view
  onClickTargetCountry = item => {
    this.props.onClickSelectCountry(item);
  };

  render() {
    return (
      <Fragment>
        <SearchableDropdown
          // multi={true}
          selectedItems={this.state.selectedItems}
          onItemSelect={item => {
            console.log('youhave click', item);
            this.onClickTargetCountry(item.id);
            // console.log('return',this.state.tofather[item.id]);


            // if (item.name === this.state.tofather[item.id].name) {
            //   console.log("**************",this.state.tofather[item.id])
            //   this.onClickTargetCountry(this.state.tofather[item.id]);
            // }
          }}
          containerStyle={{padding: 25}}
          // onRemoveItem={(item, index) => {
          //   const items = this.state.selectedItems.filter(
          //     sitem => sitem.id !== item.id,
          //   );
          //   this.setState({selectedItems: items});
          // }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 250}}
          //items should be a list
          items={this.state.items}
          // defaultIndex={2}
          // chip={true}
          // resetValue={false}
          textInputProps={{
            placeholder: 'Select a Country',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
            },
            // onTextChange: text => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </Fragment>
    );
  }
}

export {Search};
