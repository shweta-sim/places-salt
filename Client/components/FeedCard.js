import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const FeedCard = ({ data: { item: { data: { message, title } } } }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBg}>
        <Text style={styles.icon}>{title.charAt(0)}</Text>
      </View>
      <View style={styles.pushMessage}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 30,
    paddingTop: 30,
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row'
  },
  title: {
    fontWeight: '600',
    paddingBottom: 10,
    paddingLeft: 15
  },
  message: {
    paddingLeft: 15
  },
  iconBg: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#DF8187'
  },
  icon: {
    fontSize: 36,
    color: 'white',
    fontWeight: '900'
  },
  pushMessage: {
    justifyContent: 'center'
  }
})

export default FeedCard