import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Question from './Question';
import Result from './Result';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
  };


  state = {
    count: 0,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
  };

  reset = () => {
    this.setState({
      index: 0,
      showAnswer: false,
      correct: 0,
      incorrect: 0,
    });
  };

  handleToggle = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer,
    }));
  };

  handleAnswer = result => {
    this.setState(state => ({
      count: state.count + 1,
      correct: result === 'correct' ? state.correct + 1 : state.correct,
      incorrect: result === 'incorrect' ? state.incorrect + 1 : state.incorrect,
      showAnswer: false,
    }));
  };

  render() {
    const { count, showAnswer, correct, incorrect } = this.state;
    const { deckId, deck } = this.props;

    const showQuestion = count < deck.questions.length ? true : false;
    return (
      <View style={styles.container}>
        <Text style={styles.count}>
          {showQuestion ? count + 1 : count}/{deck.questions.length}
        </Text>
        {showQuestion ? (
          <Question
            deck={deck}
            flip={this.handleToggle}
            count={count}
            showAnswer={showAnswer}
            answer={this.handleAnswer}
          />
        ) : (
          <Result
            deck={deck}
            deckId={deckId}
            restart={this.reset}
            correct={correct}
            incorrect={incorrect}
            flip={this.handleToggle}
            count={count}
            showAnswer={showAnswer}
            answer={this.handleAnswer}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
