import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import { gray } from '../utils/colors'

class Decks extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({
        ready: true,
      })))     
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckHome', { deckTitle: item.title})}>
        <Text style={{fontSize: 30}}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <Text style={{color: gray, fontSize: 15}}>
        {item.questions.length} cards
      </Text>
    </View>
  )

  obj2Array = (obj) => 
    Object.keys(obj).map((key) => obj[key])

  render () {
    const { decks } = this.props
    const { ready } = this.state

    if ( ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        {Object.keys(decks).length > 0 ?
          <FlatList 
            data={this.obj2Array(decks)} 
            renderItem={this.renderItem}
            keyExtractor={(item) => item.title} 
          />
        :
          <Text>
            You have no decks yet!
          </Text> 
        }        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomWidth: 1,
  }
})

const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(Decks)