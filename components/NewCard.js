import React, { Component } from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { addCard } from '../actions/decks';
import { addCardToDeck } from '../utils/Api';

class NewCard extends Component {
  static navigationOptions = {
    title: 'New Card',
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
    question: '',
    answer: '',
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { deckId, dispatch } = this.props;
    if (question === '' || answer === '') {
      alert('Please fill in all input fields');
      return;
    }

    dispatch(addCard(deckId, question, answer));
    this.setState({
      question: '',
      answer: '',
    });
    addCardToDeck(deckId, question, answer);
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          autoFocus={true}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text style={styles.submitBtnText}>Create Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    fontSize: 20,
  },
  label: {
    fontSize: 20,
  },
  submitBtn: {
    backgroundColor: 'black',
    padding: 12,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 100,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
}

export default connect(mapStateToProps)(NewCard);
