import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class DeckList extends Component {
  
  render() {
    const { id, title, cardsNum, navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.deck}
          onPress={() =>
            navigation.navigate('Deck', { deckId: id, deckName: title })
          }>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>
            {cardsNum}
            {cardsNum === 1 ? ' cards' : ' card'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'black',
  },
  count: {
    marginTop: 10,
    fontSize: 22,
    color: 'gray',
  },
});

function mapStateToProps(decks, props) {
  const { id } = props;
  return {
    id,
    title: id ? decks[id].title : null,
    cardsNum: id ? decks[id].questions.length : null,
  };
}

export default withNavigation(connect(mapStateToProps)(DeckList));
