import React from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import { ceil } from 'react-native-reanimated'


const Temp = props => {

    const email = props.navigation.getParam('email')

    const InsertDataToServer = () =>{
 
 
        const TextInputName   = "test" ;
        
        
       fetch('https://rental-portal.000webhostapp.com/insert.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          name: TextInputName
       
        })
       
      }).then((response) => response.json())
            .then((responseJson) => {
       
      // Showing response message coming from server after inserting records.
              Alert.alert(responseJson);
       
            }).catch((error) => {
              console.error(error);
            });
       
       
        
         }


    return(
        <View style={styles.rootContainer}>
            <Text>Hello!</Text>
            <Text>{email}</Text>
            <Button title="Insert" onPress={ InsertDataToServer } />
        </View>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
})


export default Temp