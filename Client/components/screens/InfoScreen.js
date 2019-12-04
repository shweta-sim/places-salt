import React from 'react'
import { View, Text, StyleSheet, Dimensions, Linking, Image } from 'react-native'
import Constants from 'expo-constants'

const InfoScreen = () => {
  return (
    <View style={styles.infoScreen}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>About Places</Text>
      </View>
      <Text>
        Places transforms under-utilized city space into a network of playful coworking, creating a tribe like community of creatives and startups.
        {'\n'}
        {'\n'}
      </Text>
      <Text>
        Follow these steps to start using Places:
        {'\n'}
        {'\n'}
        {'\n'}
        <Text style={styles.bulletText}>1. </Text>Go to{' '}
        <Text
          style={{ color: '#DF8187' }}
          onPress={() => Linking.openURL('http://joinplaces.co/join')}>joinplaces.co/join
        </Text>
        {'\n'}
        {'\n'}
        <Text style={styles.bulletText}>2. </Text>Enter your details and wait for a call from us.
        {'\n'}
        {'\n'}
        <Text style={styles.bulletText}>3. </Text>If accepted, enter billing details.
        {'\n'}
        {'\n'}
        <Text style={styles.bulletText}>4. </Text>Welcome to Places!
        {'\n'}
      </Text>
      <Image
        style={styles.logo}
        source={require('../../assets/logo-places-black.png')}
      />
      <Text style={styles.info}>
        Places AB{'\n'}
        hello@joinplaces.co{'\n'}
        +46 79 079 0632{'\n'}
        Östermalmsgatan 26A, 114 26 Stockholm{'\n'}
        Org. Nr: 559213-9694{'\n'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoScreen: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    paddingHorizontal: 30
  },
  view: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 15,
    color: '#4D4D4D'
  },
  headingText: {
    width: Dimensions.get('window').width
  },
  bulletText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 170
  },
  info: {
    textAlign: 'center',
    width: Dimensions.get('window').width - 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    lineHeight: 20
  }
})

export default InfoScreen