import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Colors from '../constants/Colors'

const IssueProduct = props => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const shopId = props.navigation.getParam('shopId')
    const [issuerEmail, setIssuerEmail] = useState("")

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setIssuerEmail(data)
        checkemail(data);
      };

    const checkemail = async(r)=> {
        fetch('https://rental-portal.000webhostapp.com/checkemail.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
           
              // Getting the id.
              email: r,
              shopId: shopId
              //started making changes from here
              //hello

           
            }) 
            
          }).then((response) => response.json())
                .then((responseJson) => {
                  //console.log(query)
                  //console.log(responseJson)
                  if(responseJson === 1){
                      //console.log('navigate next')
                      Alert.alert("Email Found", "This user is enrolled for your shop, you can proceed to scan product code.", [{text: "Ok", onPress: ()=> {} }])
                      //props.navigation.navigate('ProductId',{shopId: shopId, issuerEmail: issuerEmail})
                  }
                  else{
                      //console.log('try again')
                      Alert.alert("Email Invalid", "The user email is not enrolled to your shop.Try scanning again or cancel the transaction.", [{text: "Ok", onPress: ()=> {} }])
                  }
                }).catch((error) => {
                  console.error(error);
                }); 
    } 
    
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    if(scanned===true){
      return(
        <View style={styles.root}>
          <View style={styles.rootContainer}>
              <Text style={{fontSize: 20, marginBottom: 5}} >Scan user profile code!</Text>
              {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                  <Text style={styles.greetingText}>Tap to scan again</Text>
                  </TouchableOpacity>}
                  <TouchableOpacity onPress={() => {props.navigation.navigate('ProductId',{shopId: shopId, issuerEmail: issuerEmail})}} style={styles.buttonContainer}>
                    <Text style={styles.greetingText}>Next</Text>
                  </TouchableOpacity>
          </View>
        </View>
      )
    }
    
      return(
        <View style={styles.root}>
        <View style={styles.rootContainer}>
            <Text style={{fontSize: 20, marginBottom: 5}} >Scan user profile code!</Text>
            <View style={styles.barcodeContainer}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            </View>
            {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                <Text style={styles.greetingText}>Tap to scan again</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => {props.navigation.navigate('ProductId',{shopId: shopId, issuerEmail: issuerEmail})}} style={styles.buttonContainer}>
                  <Text style={styles.greetingText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

IssueProduct['navigationOptions'] = () => (
  {
    headerStyle: {
      backgroundColor: Colors.primary
    }
  }
)

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    barcodeContainer:{
        height: 300,
        width: 300,
        borderRadius: 10,
        marginBottom: 5
    },
    buttonContainer:{
      width: Dimensions.get('window').width*0.7,
      height: 50,
      justifyContent: "center",
      //alignContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primary,
      borderRadius: 25,
      marginVertical: 5
  },
  root: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: "center",
    alignItems: "center"
  }
})

export default IssueProduct