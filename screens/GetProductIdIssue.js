import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Colors from '../constants/Colors'

const GetProductIdIssue = props => {

    const shopId = props.navigation.getParam('shopId')
    const issuerEmail = props.navigation.getParam('issuerEmail')
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [pid, setPid] = useState(999)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    //today = dd + '/' + mm + '/' + yyyy;
    today = yyyy + '-' + mm + '-' + dd
    var future = new Date(); // get today date
    future.setDate(future.getDate() + 7); // add 7 days
    var finalDate = future.getFullYear() +'-'+ ((future.getMonth() + 1) < 10 ? '0' : '') + (future.getMonth() + 1) +'-'+ future.getDate();


    const issue = async() => {
        fetch('https://rental-portal.000webhostapp.com/issueproduct.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
           
              // Getting the id.
              query: shopId+"-transaction",
              query2: shopId+"-products",
              email: issuerEmail,
              pid: pid,
              issueDate: today,
              returnDate: finalDate
           
            }) 
            
          }).then((response) => response.json())
                .then((responseJson) => {
                  Alert.alert("Issue Status:", responseJson, [{text: "Ok", onPress: ()=> {} }])
                  props.navigation.navigate('Dashboard')
                }).catch((error) => {
                  console.error(error);
                }); 
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setPid(data)
        //alert(`QR code with data ${data} has been scanned!`);
        Alert.alert("Scanned", "The product id is scanned and you can proceed to issue.", [{text: "Ok", onPress: ()=> {} }])
      };

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
                <Text style={{fontSize: 20, marginBottom: 5}} >Scan product code!</Text>
                {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                <Text style={styles.greetingText}>Tap to scan again</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={issue} style={styles.buttonContainer}>
                    <Text style={styles.greetingText}>Issue!</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }

    return(
        <View style={styles.root}>
          <View style={styles.rootContainer}>
              <Text style={{fontSize: 20, marginBottom: 5}} >Scan product code!</Text>
              <View style={styles.barcodeContainer}>
                  <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                  />
              </View>
              {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                  <Text style={styles.greetingText}>Tap to scan again</Text>
              </TouchableOpacity>}
          </View>
        </View>
    )
}

GetProductIdIssue['navigationOptions'] = () => (
  {
    title: "Scan Product",
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
      alignItems: "center",
      //alignContent: "center",
  }
})

export default GetProductIdIssue