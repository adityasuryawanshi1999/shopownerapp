import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import Card from '../components/Card'
import * as Google from 'expo-google-app-auth'
import { StackActions, NavigationActions } from 'react-navigation'
import { SocialIcon } from 'react-native-elements'
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

const LoginPage = props => {

  useEffect(()=>{
    (async()=>{
      try {
        const value = await AsyncStorage.getItem('status');
        const email = await AsyncStorage.getItem('email');
        const name = await AsyncStorage.getItem('name');
        const token = await AsyncStorage.getItem('token');
        const url = await AsyncStorage.getItem('url');

        if (value === 'f') {
          console.log('hello')
        }
         else if (value === null){
          console.log('hello')
         }
         else{
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'Dashboard',
              params:{name: name, email: email, url: url, token: token}
            })],
            });
          //props.navigation.setParams({name: result.user.name, email: result.user.email, url: result.user.photoUrl, token: result.accessToken})
          props.navigation.dispatch(resetAction)
        }
      } catch (error) {
        // Error retrieving data
      }
    })();
  },[])

    const imageArray = ['https://rental-portal.000webhostapp.com/1-2.png','https://rental-portal.000webhostapp.com/2.png','https://rental-portal.000webhostapp.com/3.png','https://rental-portal.000webhostapp.com/4.png']

    const signIn = async() =>{
            try {
              const result = await Google.logInAsync({
                androidClientId:
                  "771336740186-p0vd3pn0b2foilc39iuruounvb06ciik.apps.googleusercontent.com",
                iosClientId: "771336740186-l2mt8lerr1pj5dukiskm6pnbe27uoi84.apps.googleusercontent.com",
                androidStandaloneAppClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
                scopes: ["profile", "email"]
              })
              
              if (result.type === "success") {
                //console.log(result)
                try {
                  await AsyncStorage.setItem('status','true');
                  await AsyncStorage.setItem('name',result.user.name);
                  await AsyncStorage.setItem('email',result.user.email); 
                  await AsyncStorage.setItem('url',result.user.photoUrl); 
                  await AsyncStorage.setItem('token',result.accessToken);  
                  //setLoading(false)         
                } catch (error) {
                  // Error saving data
                }
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({
                    routeName: 'Dashboard',
                    params:{name: result.user.name, email: result.user.email, url: result.user.photoUrl, token: result.accessToken}
                  })],
                  });
                //props.navigation.setParams({name: result.user.name, email: result.user.email, url: result.user.photoUrl, token: result.accessToken})
                props.navigation.dispatch(resetAction)
              } else {
                console.log("cancelled")
              }
            } catch (e) {
              console.log("error", e)
            }
          }        
    
    return(  
        <ScrollView style={styles.root}>
            <View style={styles.rootContainer} >
                <View style={styles.sliderContainer}>
                    <SliderBox images={imageArray} circleLoop={true} sliderBoxHeight={290} paginationBoxVerticalPadding={20}  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}} resizeMethod={'resize'} resizeMode={'cover'} paginationBoxStyle={{position: "absolute", bottom: 0, padding: 0, alignItems: "center", alignSelf: "center", justifyContent: "center", paddingVertical: 10}} />
                </View>
                <View style={styles.textContainer} >
                    <Card style={{width: '98%', flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center'}} >
                        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}} >Choose any method to get started without any hazzle!</Text>
                        <SocialIcon style={{width: 200, backgroundColor: Colors.primary}} title='Sign In With Google' button type='google' raised={true} onPress={ signIn } />
                    </Card>
                </View>
                <Text style={{color: 'black', marginTop: Dimensions.get('screen').width*0.05, textAlign: 'center'}} >Rental Portal Shops</Text>
                <Text style={{color: 'black', textAlign: 'center', paddingBottom: 10}} >No Copyrights Intended</Text>
            </View>
        </ScrollView>
    )
}

LoginPage['navigationOptions'] = () => (
  {
    headerStyle: {
      backgroundColor: Colors.primary
    }
  }
)

const styles = StyleSheet.create({
    rootContainer: {
        height: '100%',
        //justifyContent: "center",
        alignItems: "center",
        //marginBottom: 200
    },
    sliderContainer: {
        marginTop: 5,
        height: 300
    },
    textContainer: {
        marginTop: 5,
        width: '98%',
        height: 250,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    root:{
      flex: 1,
      backgroundColor: '#ccc',
      paddingBottom: 15
    }
})

export default LoginPage