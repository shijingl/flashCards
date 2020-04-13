import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {withNavigation} from 'react-navigation'

function Question(props) {
  const { count, deck, showAnswer, flip, answer } = props;
  const card = deck.questions[count];

  return (
    <View style={styles.container}>
      <Text style={styles.cardText}>
        {showAnswer ? card.answer : card.question}
      </Text>
      <TouchableOpacity onPress={flip}>
        <Text>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => answer('correct')}>
        <Text style={styles.btnText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: 'red' }]}
        onPress={() => answer('incorrect')}>
        <Text style={styles.btnText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  cardText: {
    fontSize: 25,
    color: 'black',
    marginLeft: 15,
    marginRight: 15,
  },
});
export default withNavigation(Question)