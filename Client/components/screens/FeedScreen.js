import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import FeedCard from '../FeedCard'

const FeedScreen = () => {
  const { notifications } = useSelector(state => state)

  const filteredNotifications = () => {
    return [... new Set(notifications)]
  }

  return (
    <View style={styles.feedScreen}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>
          Feed
      </Text>
      </View>
      {notifications.length ?
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredNotifications()}
          extraData={notifications}
          refreshing={true}
          keyExtractor={item => item.notificationId.toString()}
          renderItem={(item) => <FeedCard data={item} />}
        /> : <Text style={styles.emptyFeed}>Empty Feed</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  emptyFeed: {
    marginTop: Dimensions.get('window').height * 0.35
  },
  feedScreen: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center'
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 15,
    color: '#4D4D4D'
  },
  headingText: {
    width: Dimensions.get('window').width
  }
})

export default FeedScreen
