import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//import from local files
import reducer from './reducers/index';
import { getAllDecks, getDeck, saveDeck, addCardToDeck } from './utils/Api';
import { receiveDecks } from './actions/decks';
import Home from './components/Home';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Deck from './components/Deck';
import QuizView from './components/QuizView';

//tab navigator
const TabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  NewDeck: { screen: NewDeck },
});

//component starck
const Stack = createStackNavigator({
  Home: TabNavigator,
  AddDeck: NewDeck,
  AddCard: NewCard,
  Deck: Deck,
  Quiz: QuizView,
});

//app container
const AppContaioner = createAppContainer(Stack);

export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppContaioner />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
