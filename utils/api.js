import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY_PREFIX = 'MobileFlashcards:'

export const getDecks = () => {
  return AsyncStorage.getAllKeys()
    .then((keys) => { 
      const realKeys = keys.filter((key) => key.indexOf(FLASHCARDS_STORAGE_KEY_PREFIX) !== -1)
      return AsyncStorage.multiGet(realKeys)
    })
}

export const getDeck = (id) => {
  const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(id)
  AsyncStorage.getItem(key)
    .then((result) => JSON.parse(result))
}

export const saveDeckTitle = (title) => {
  const newDeck = { title,
                    questions: []  
                  }
  const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(title)
  AsyncStorage.mergeItem(key, JSON.stringify(newDeck))
}

export const addCardToDeck = (title, card) => {
  const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(title)
  AsyncStorage.getItem(key)
    .then((result) => {
      let deck = JSON.parse(result)
      deck.questions.push(card)
      AsyncStorage.mergeItem(key, JSON.stringify(deck))
    })
}

export const deleteDeckTitle = (title) => AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY_PREFIX.concat(title))