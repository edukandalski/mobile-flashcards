import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions'
import { FLASHCARDS_STORAGE_KEY_PREFIX } from '../utils/api'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      const decks = action.decks.reduce((prev, current) => ({
          ...prev,
          [current[0]]: JSON.parse(current[1])
      }), {})
      return {
        ...state,
        ...decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [FLASHCARDS_STORAGE_KEY_PREFIX.concat(action.title)]: {
          title: action.title,
          questions: [],
        }
      }
    case ADD_CARD:
      const cards = state[FLASHCARDS_STORAGE_KEY_PREFIX.concat(action.title)].questions.concat(action.card)
      return {
        ...state,
        [FLASHCARDS_STORAGE_KEY_PREFIX.concat(action.title)]: {
          title: action.title,
          questions: cards,
        }
      }
    case DELETE_DECK:
      const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(action.title)
      const newDeck = { ...state }
      delete(newDeck[key])
      return newDeck
    default:
      return state
  }
}
