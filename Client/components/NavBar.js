import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs' 
import HomeScreen from './screens/HomeScreen'
import FeedScreen from './screens/FeedScreen'
import ProfileScreen from './screens/ProfileScreen'
import InfoScreen from './screens/InfoScreen'
import { AntDesign } from '@expo/vector-icons'

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Feed: FeedScreen,
    Profile: ProfileScreen,
    Info: InfoScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = AntDesign
        let iconName

        switch (routeName) {
          case 'Home':
            iconName = 'home'
            break
          case 'Feed':
            iconName = 'message1'
            break
          case 'Profile':
            iconName = 'user'
            break
          case 'Info':
            iconName = 'infocirlceo'
            break
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#DF8187',
      inactiveTintColor: '#4C4C4C',
      showLabel: false
    }
  }
)

export default createAppContainer(TabNavigator)