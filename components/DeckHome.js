import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FLASHCARDS_STORAGE_KEY_PREFIX, deleteDeckTitle } from '../utils/api'
import { gray, black, white, red } from '../utils/colors'
import { deleteDeck } from '../actions' 

class DeckHome extends Component {
  navToQuiz = (deck, navigation) => {
    if (deck.questions.length === 0) {
      alert('This deck has no questions yet.')
    } else {
      navigation.navigate('Quiz', { deckTitle: deck.title})
    }
  }

  removeDeck = (title) => {
    const { navigation, dispatch } = this.props
    
    dispatch(deleteDeck(title))

    deleteDeckTitle(title)

    navigation.goBack()
  } 

  shouldComponentUpdate = (nextProps) => typeof nextProps.deck !== 'undefined'

  render () {
    const { deck, navigation } = this.props

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>
            {deck.title}
          </Text>
          <Text style={styles.cardsText}>
            {deck.questions.length} cards
          </Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.normalBtn, styles.addCardBtn]} onPress={() => navigation.navigate('AddQuestion', { deckTitle: deck.title})} >
            <Text>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.normalBtn, styles.startQuizBtn]} onPress={() => this.navToQuiz(deck, navigation)}>
            <Text style={styles.startQuizBtnText}>
              Start Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.normalBtn, styles.deleteBtn]} onPress={() => this.removeDeck(deck.title)}>
            <Text style={styles.deleteBtnText}>
              Delete Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  titleText: {
    marginBottom: 10,
    fontSize: 40,
    textAlign: 'center',
  },
  cardsText: {
    fontSize: 25,
    textAlign: 'center',
    color: gray,
  },
  normalBtn: {
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardBtn: {
    
  },
  startQuizBtn: {
    backgroundColor: black,
  },
  deleteBtn: {
    backgroundColor: red,
    borderColor: red,
  },
  startQuizBtnText: {
    color: white,
  },
  deleteBtnText: {
    color: white,
  },
})

const mapStateToProps = ( decks, { navigation }) => {
  const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(navigation.state.params.deckTitle)
  return {
    deck: decks[key]
  }
}

export default connect(mapStateToProps)(DeckHome)
