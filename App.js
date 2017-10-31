import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { black, yellow, white, darkGray } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckHome from './components/DeckHome'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const FlashStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
    }
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: yellow,
    style: {
      height: 56,
      backgroundColor: darkGray,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckHome: {
    screen: DeckHome,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.deckTitle,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGray,
      }, 
    }),
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGray,
      },
    },
  },
  Quiz : {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGray,
      },
    },
  },
})

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={black} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
