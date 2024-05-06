import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import RNFetchBlob from 'rn-fetch-blob'
const File = () => {
  return (
    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',}}>
      <Text style={{padding:20,color:'tomato',fontSize:25,fontWeight:'500'}}>File Downloader</Text>
      <TextInput placeholder='Enter file url' style={{width:'90%',height:50,borderRadius:20,borderColor:'grey',borderWidth:2,paddingLeft:25,fontSize:20}}/>
      <TouchableOpacity style={{backgroundColor:'tomato',width:'90%',height:50,borderRadius:20,borderWidth:1,alignItems:'center',justifyContent:'center',marginTop:30}}>
        <Text style={{color:'white',fontWeight:'600',fontSize:25}}>Download File</Text>
      </TouchableOpacity>
    </View>
  )
}

export default File