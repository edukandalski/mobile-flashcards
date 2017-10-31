import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { FLASHCARDS_STORAGE_KEY_PREFIX, saveDeckTitle } from '../utils/api'
import { black, white } from '../utils/colors'

class AddDeck extends Component {
  state = {
    input: null,
  }

  handleInputChange = (input) => {
    this.setState(() => ({
      input,
    }))
  }

  submitDeck = () => {
    const { dispatch, navigation } = this.props
    const { input } = this.state

    dispatch(addDeck(input))

    saveDeckTitle(input)

    this.setState(() => ({
      input: null,
    }))
    
    Keyboard.dismiss()

    navigation.navigate('DeckHome', { deckTitle: input})
  }

  render () {
    const { input } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.questionText}>What is the title of your new deck?</Text>
        <TextInput 
          value={input}
          placeholder='Title'
          style={styles.input}
          onChangeText={this.handleInputChange}          
        />
        <TouchableOpacity onPress={this.submitDeck} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 30, 
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 40,
    marginBottom: 40,
  },
  submitBtn: {
    backgroundColor: black,
    padding: 10,
    width: 120,
    height: 45,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
    textAlign: 'center',
  },
})

export default connect()(AddDeck)