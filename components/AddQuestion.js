import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { black, white } from '../utils/colors'

class AddQuestion extends Component {
  state = {
    question: null,
    answer: null,
  }

  handleQuestionChange = (question) => {
    this.setState(() => ({
      question,
    }))
  }

  handleAnswerChange = (answer) => {
    this.setState(() => ({
      answer,
    }))
  }

  submitCard = () => {
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state

    const title = navigation.state.params.deckTitle
    const card = { question, answer }

    dispatch(addCard(title, card))

    addCardToDeck(title, card)

    this.setState(() => ({
      question: null,
      answer: null,
    }))

    navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          value={question}
          placeholder='Question'
          onChangeText={this.handleQuestionChange}
          style={styles.input}
        />
        <TextInput
          value={answer}
          placeholder='Answer'
          onChangeText={this.handleAnswerChange}
          style={styles.input}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.submitCard}>
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
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: black,
    width: 130,
    height: 45,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
  },
})

export default connect()(AddQuestion)