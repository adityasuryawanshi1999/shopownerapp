import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text,  Image, Dimensions,  ActivityIndicator, AsyncStorageStatic } from 'react-native'
import Card from '../components/Card'
import * as Google from 'expo-google-app-auth'
import { StackActions, NavigationActions } from 'react-navigation'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width

const Dashboardoptions = props => {

    const name = props.navigation.getParam('name')
    const email = props.navigation.getParam('email')
    const token = props.navigation.getParam('token')
    const url = props.navigation.getParam('url')
    //let shopId = null //use state instead
    const [shopId, setShopId] = useState(0) 
    const [laoding, setLoading] = useState(true)  

    
    useEffect( ()=>{
        getid();
    },[])    
    
    const signOut = async(r) => {
        //console.log('entered')
        //console.log(r)
        const logoutResult = await Google.logOutAsync({ 
        accessToken:r, 
        iosClientId:"771336740186-p0vd3pn0b2foilc39iuruounvb06ciik.apps.googleusercontent.com", 
        androidClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
        //iosStandaloneAppClientId, 
        androidStandaloneAppClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
        })

        const n = null;

        try {
            await AsyncStorage.setItem('status','f');
            await AsyncStorage.setItem('name','f');
            await AsyncStorage.setItem('email','f'); 
            await AsyncStorage.setItem('url','f'); 
            await AsyncStorage.setItem('token','f');  
            //setLoading(false)  
          } catch (error) {
            // Error saving data
            console.log(error)
          }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'Login',
            })],
            });
        props.navigation.dispatch(resetAction)
        
    }

    const getid = async() => {
        fetch('https://rental-portal.000webhostapp.com/getshopidfromemail.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          // Getting the id.
          email: email
       
        }) 
       
      }).then((response) => response.json())
            .then((responseJson) => { 
              setShopId(responseJson[0].shopid)
              //console.log(shopId)
              setLoading(false)
              
            }).catch((error) => {
              console.error(error);
            }); 
    }

    if(laoding){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#ccc" />
          </View>
        )

    }

    return(
        <ScrollView  style={styles.scrollview} >
            <View style={styles.rootContainer} >
                <Card style={styles.summary}>
                    <Image style={styles.image} source={{uri: url}} />
                    <View style={styles.greetingContainer}>
                        <Text style={{textAlign: "center",fontSize: 15}}>Welcome!</Text>
                        <Text style={{...styles.greetingText, fontWeight: "bold"}}>{name}</Text>
                        <Text style={{textAlign: "center",fontSize: 15}}>Authentication:</Text>
                        <Text style={{...styles.greetingText, fontWeight: "bold"}}>{email}</Text>
                    </View>
                </Card>
                <Card style={styles.optionsContainer}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Products',{email: email, shopId: shopId})    
                        }} style={styles.buttonContainer}>
                            <Text style={styles.greetingText}>Check Products</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Issue',{shopId: shopId}) }} style={{...styles.buttonContainer, backgroundColor: Colors.primary}}>
                            <Text style={styles.greetingText}>Issue Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Return',{shopId: shopId})}} style={{...styles.buttonContainer, backgroundColor: Colors.primary}}>
                            <Text style={styles.greetingText}>Return Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Transactions',{shopId: shopId})}} style={styles.buttonContainer}>
                            <Text style={styles.greetingText}>Check Issued Products</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Profiles')}} style={styles.buttonContainer}>
                            <Text style={styles.greetingText}>Check Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Enrolled',{shopId: shopId})}} style={styles.buttonContainer}>
                            <Text style={styles.greetingText}>Enrolled Customers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Deenroll',{shopId: shopId})}} style={styles.buttonContainer}>
                            <Text style={styles.greetingText}>De-enroll Customer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => signOut(token)} style={{...styles.buttonContainer, backgroundColor: 'red'}}>
                            <Text style={styles.greetingText}>Logout</Text>
                        </TouchableOpacity>
                </Card>
            </View>
        </ScrollView>
    )
}

Dashboardoptions['navigationOptions'] = () => (
    {
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

const styles = StyleSheet.create({
    rootContainer: {
        alignContent: "center",
        alignItems: "center"
    },
    greetingText:{
        textAlign: "center",
        //fontWeight: "bold",
        fontSize: 15
    },
    summary:{
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    greetingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    optionsContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: '98%',
        alignContent: "center",
        alignItems: "center",
        //justifyContent: "center"
    },
    buttonContainer:{
        width: width*0.7,
        height: 50,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center",
        backgroundColor: '#ccc',
        //backgroundColor:'#db4a39',
        borderRadius: 25,
        marginVertical: 5
    },
    scrollview: {
        flex: 1,
        height: '100%',
        backgroundColor: '#ccc'
    },
    activity:{
        flex: 1,
        justifyContent: "center"
      }
    
})

export default Dashboardoptions