import { AsyncStorage } from 'react-native';

export const Storage_key = 'falshCards:Decks';

export function generateId() {
  return Math.random()
    .toString(34)
    .substring(2, 25);
}

export function createCard(question, answer) {
  return {
    question,
    answer,
  };
}

export function createDeck(title) {
  return {
    title,
    questions: [],
  };
}

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

//get all decks
export function getAllDecks() {
  return AsyncStorage.getItem(Storage_key).then(formatDecksResults);
}

function setData() {
  AsyncStorage.setItem(Storage_key, JSON.stringify(dummyData));
  return dummyData;
}

export function formatDecksResults(results) {
  return results === null ? setData() : JSON.parse(results);
}

//save deck
export function saveDeck(key, deck) {
  AsyncStorage.mergeItem(
    Storage_key,
    JSON.stringify({
      [key]: deck,
    })
  );
  return getAllDecks();
}

//add card
export function addCardToDeck(key, question, answer) {
  AsyncStorage.getItem(Storage_key).then(result => {
    let decks = JSON.parse(result);
    decks[key].questions.push(createCard(question, answer));
    AsyncStorage.mergeItem(Storage_key, JSON.stringify(decks));
  });
  return getAllDecks()
}
