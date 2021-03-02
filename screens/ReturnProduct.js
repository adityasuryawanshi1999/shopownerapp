import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { set } from 'react-native-reanimated';
import Colors from '../constants/Colors'

const ReturnProduct = props => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [pid, setPid] = useState(0)
    const [fine, setFine] = useState(0)
    const shopId = props.navigation.getParam('shopId')
    const query1 = shopId+"-transaction"
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    var collectedFine = 0
    

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setPid(data)
        //alert(`Product with productId of ${data} has been scanned!`);
        Alert.alert("Scanned", "The product code is scanned and you can proceed to return.", [{text: "Ok", onPress: ()=> {} }])
      };

    const startReturn = async() => {
        fetch('https://rental-portal.000webhostapp.com/getreturndate.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          // Getting the id.
          pid: pid,
          query1: query1,
          query2: shopId+"-transaction",
          query3: shopId+"-products"
       
        })  
       
      }).then((response) => response.json())
            .then((responseJson) => { 
                //console.log(responseJson)
                var returnDate = responseJson[0].return_date
                const words = returnDate.split('-')
                returnDate = words[2]+'/'+words[1]+'/'+words[0]
                const date1 = new Date(parseInt(yyyy),parseInt(mm),parseInt(dd));
                const date2 = new Date(parseInt(words[0]),parseInt(words[1]),parseInt(words[2]));
                const diffTime = date1 - date2;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                //console.log(diffDays*fine)
                if(diffTime<=0){
                  collectedFine = 0
                }
                else{
                  collectedFine = fine*diffDays
                }
                //alert(`Successfull return. Fine amount Rs.${collectedFine}`);
                Alert.alert("Successfull Return", `Product returned with fine amount Rs.${collectedFine}`, [{text: "Ok", onPress: ()=> {} }])
                props.navigation.navigate('Dashboard')
            }).catch((error) => {
              console.error(error);
            }); 
        }


    
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
        (async()=>{
            fetch('https://rental-portal.000webhostapp.com/getfine.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          // Getting the id.
          shopId: shopId
       
        }) 
       
      }).then((response) => response.json())
            .then((responseJson) => { 
              setFine(responseJson[0].fine)
              //shopId = responseJson[0].shopid;
              //console.log(fine)
              setLoaded(true)
              
            }).catch((error) => {
              console.error(error);
            }); 
        })();

      }, []);

    if(!loaded){
        return(
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="#ccc" />
            </View>
        )
    }

    if(scanned===true){
      return(
        <View style={styles.root}>
          <View style={styles.rootContainer}>
              <Text style={{fontSize: 20, marginBottom: 5}} >Scan product code!</Text>
              {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                  <Text style={styles.greetingText}>Tap to scan again</Text>
                  </TouchableOpacity>}
                  <TouchableOpacity onPress={startReturn} style={styles.buttonContainer}>
                    <Text style={styles.greetingText}>Return</Text>
                  </TouchableOpacity>
          </View>
        </View>
      )
    }
    
      return(
        <View style={styles.root}>
        <View style={styles.rootContainer}>
            <Text style={{fontSize: 20, marginBottom: 5}} >Scan user product code!</Text>
            <View style={styles.barcodeContainer}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            </View>
            {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={styles.buttonContainer}>
                <Text style={styles.greetingText}>Tap to scan again</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={startReturn} style={styles.buttonContainer}>
                  <Text style={styles.greetingText}>Return</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

ReturnProduct['navigationOptions'] = () => (
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
  activity:{
    flex: 1,
    justifyContent: "center"
  },
  root: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: "center",
    alignItems: "center"
}
})

export default ReturnProduct