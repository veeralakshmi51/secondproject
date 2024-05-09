import { View, Text } from 'react-native'
import React from 'react'
import Onboarding from './components/Onboarding'

const App = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FFFFFF'}}>
    <Onboarding/>
    </View>
  )
}

export default App