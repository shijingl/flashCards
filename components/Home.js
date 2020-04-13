import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { receiveDecks } from '../actions/decks';
import { getAllDecks } from '../utils/Api';
import DeckList from './deckList';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25,
      
    },
  };
  componentDidMount() {
    getAllDecks().then(decs => {
      this.props.dispatch(receiveDecks(decs));
    });
  }
  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks).map(id => {
            return { key: id };
          })}
          renderItem={({ item }) => <DeckList key={item.key} id={item.key} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

function mapStateToProps(decks) {
  return {
    decks: decks,
  };
}

export default connect(mapStateToProps)(Home);
