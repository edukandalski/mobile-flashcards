import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FLASHCARDS_STORAGE_KEY_PREFIX } from '../utils/api'
import { white, red, green, black } from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    quizFinished: false,
    actualQuestion: 1,
    score: 0,
    showQuestion: true,
  }

  toggleQuestionAnswer = () => this.setState((state) => ({
                                showQuestion: !state.showQuestion,
  }))

  nextQuestion = (deck, correct = false) => this.setState((state) => ({
                                quizFinished: (state.actualQuestion) === deck.questions.length,
                                actualQuestion: state.actualQuestion + 1,
                                score: correct ? state.score + 1 : state.score,
                                showQuestion: true,
  }))

  calculateScore = (score, total) => parseFloat(((score * 100) / total).toFixed(1))

  render () {
    const { deck, navigation } = this.props
    const { quizFinished, actualQuestion, score, showQuestion } = this.state

    if (quizFinished) {
      clearLocalNotifications()
        .then(setLocalNotification)
    }

    return (
      <View style={{flex: 1}}>
        { quizFinished ?
          <View style={styles.containerSpaced}>
            <Text style={styles.resultText}>
              The quiz has ended. Your score is {this.calculateScore(score, deck.questions.length)} %
            </Text>
            <View>
                <TouchableOpacity style={[styles.basicBtn, styles.btnResult]} onPress={() => this.setState(() => ({ quizFinished: false,
                                                                                                                     actualQuestion: 1,
                                                                                                                     score: 0,
                                                                                                                     showQuestion: true,}))}>
                  <Text style={styles.btnText}>
                    Restart quiz
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.basicBtn, styles.btnResult]} onPress={() => navigation.goBack()}>
                  <Text style={styles.btnText}>
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        :
          <View style={styles.container}>
            <Text style={styles.progressText}>
              {actualQuestion} / {deck.questions.length}
            </Text>
            <View style={styles.containerSpaced}>
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>
                  {showQuestion ? deck.questions[actualQuestion - 1].question : deck.questions[actualQuestion - 1].answer}
                </Text>
                <TouchableOpacity onPress={this.toggleQuestionAnswer}>
                  <Text style={styles.btnTextAnswer}>
                    {showQuestion ? 'Answer' : 'Question'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={[styles.basicBtn, styles.correctBtn]} onPress={() => this.nextQuestion(deck, true)}>
                  <Text style={styles.btnText}>
                    Correct
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.basicBtn, styles.incorrectBtn]} onPress={() => this.nextQuestion(deck)}>
                  <Text style={styles.btnText}>
                    Incorrect
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSpaced: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  questionContainer: {
    alignItems: 'center',
  },
  progressText: {
    marginTop: 8,
    marginLeft: 10,
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 40,
  },
  btnTextAnswer: {
    marginTop: 10,
    color: red,
    fontSize: 20,
  },
  basicBtn: {
    borderRadius: 7,
    marginBottom: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctBtn: {
    backgroundColor: green,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  btnResult: {
    backgroundColor: black,
  },
  btnText: {
    color: white,
    fontSize: 15,
  },
  resultText: {
    fontSize: 40,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
})

const mapStateToProps = ( decks, { navigation }) => {
  const key = FLASHCARDS_STORAGE_KEY_PREFIX.concat(navigation.state.params.deckTitle)
  return {
    deck: decks[key]
  }
}

export default connect(mapStateToProps)(Quiz)