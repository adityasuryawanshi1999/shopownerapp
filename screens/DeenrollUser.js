import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'

const DeenrollUser = props => {

    const shopId = props.navigation.getParam('shopId')
    const query = shopId+"-transaction"
    const [email, setEmail] = useState("")
    const[warning, setWarning] = useState(true)

    useEffect(()=>{
        if(warning){
            Alert.alert("Warning!", "Please make sure the user has no due transactions with your store before deenrolling. Actions wont be reversed once done.", [{text: "Ok", onPress: ()=> {} }])
            setWarning(false)
        }
    },[])

    const checkUser = async()=> {
        fetch('https://rental-portal.000webhostapp.com/checkuser.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  email: email,
                  query: query
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                        //console.log(responseJson)
                        if(responseJson===1){
                            Alert.alert("Pending Dues", "The user has pending dues with your shops, please clear and then proceed to delete.", [{text: "Ok", onPress: ()=> {} }])
                        }
                        else{
                            Alert.alert("Clean", "The user has no dues, you can prodceed to delete.", [{text: "Ok", onPress: ()=> {} }])
                        }
                    }).catch((error) => {
                      console.error(error);
                    }); 
    }

    const deleteUser = async() => {
        fetch('https://rental-portal.000webhostapp.com/deleteuser.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  email: email,
                  shopId: shopId
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                        if(responseJson===1){
                            Alert.alert("Success", "All records are deleted for user.", [{text: "Ok", onPress: ()=> {} }])
                        }
                        else{
                            Alert.alert("Error", "Something went wrong, please try again.", [{text: "Ok", onPress: ()=> {} }])
                        }
                    }).catch((error) => {
                      console.error(error);
                    }); 
    }

    return(
        <View style={styles.root}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <Card style={styles.rootContainer}>
                    <Text style={{fontSize: 17, fontWeight: "bold"}}>De-Enroll</Text>
                    <TextInput style={styles.text} value={email} onChangeText={ text => setEmail(text)} />
                    <TouchableOpacity style={styles.buttonContainer} onPress={checkUser}  >
                        <Text>Check</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.buttonContainer,backgroundColor: 'red'}} onPress={deleteUser}  >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </View>
    )
}

DeenrollUser['navigationOptions'] = () => (
    {
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
  )

const styles = StyleSheet.create({
    rootContainer: {
        width: Dimensions.get('window').width*0.98,
        alignContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').height*0.40,
        justifyContent: "center",
    },
    buttonContainer:{
        width: Dimensions.get('window').width*0.5,
        height: 50,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginTop: 5,
    },
    text:{
        backgroundColor: '#ccc',
        width: Dimensions.get('window').width*0.90,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginTop: 5
    },
    root: {
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: "center",
        alignItems: "center"
    }
})

export default DeenrollUser