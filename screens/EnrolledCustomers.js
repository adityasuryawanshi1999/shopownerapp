import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import Card from '../components/Card'
import EnrolledItem from '../components/EnrolledItem'
import Colors from '../constants/Colors'

const EnrolledCustomers = props => {

    const shopId = props.navigation.getParam('shopId')
    const [email, setEmail] = useState("")
    const [dataSource, setDataSource] = useState({data:[]})
    const [loading, setLoading] = useState(false)
    const [noresults, setNoResults] = useState(false)

    useEffect(()=>{
        (async() => {
            fetch('https://rental-portal.000webhostapp.com/fetchenrolledcustomers.php', {
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
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(true)
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setNoResults(false)
                      setLoading(true)
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.error(error);
                      setLoading(true)
                    }); 
        })();
    },[])


    const searchByEmail = async() => {
        setLoading(false)
        fetch('https://rental-portal.000webhostapp.com/fetchenrolledcustomersbyemail.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  shopId: shopId,
                  email: '%'+email+'%'
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(true)
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setNoResults(false)
                      setLoading(true)
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.error(error);
                      setLoading(true)
                    });
    }

    const resetAction = async()=> {
      setLoading(false)
      setEmail("")
      fetch('https://rental-portal.000webhostapp.com/fetchenrolledcustomers.php', {
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
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(true)
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setNoResults(false)
                      setLoading(true)
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.error(error);
                      setLoading(true)
                    });
    }
    
    if(!loading){
        return(
            <View style={{alignContent: "center", alignItems: "center", paddingTop: 5, flex: 1, backgroundColor: '#ccc'}}>
                    <Card style={styles.textContainer}>
                        <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by email:</Text>
                        <TextInput style={styles.text} value={email} onChangeText={ text => setEmail(text)} />
                        <View style={styles.buttonWrapper}>
                          <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                              <Text style={styles.greetingText}>Reset</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                              <Text style={styles.greetingText}>Search</Text>
                          </TouchableOpacity>
                        </View>
                    </Card>
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
            </View>
        )
    }

    if(noresults){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by email:</Text>
                <TextInput style={styles.text} value={email} onChangeText={ text => setEmail(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.noresults}>
                    <Text style={{fontSize: 15}}>No active results</Text>
            </View>
        </View>
      )
    }

    return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by email:</Text>
                <TextInput style={styles.text} value={email} onChangeText={ text => setEmail(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <FlatList data={dataSource.data} keyExtractor={ item => item.email } renderItem={ itemData => <EnrolledItem email={itemData.item.email} /> } />
        </View>
    )
}

EnrolledCustomers['navigationOptions'] = () => (
    {
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
  )

const styles = StyleSheet.create({
    text:{
        backgroundColor: '#ccc',
        width: Dimensions.get('window').width*0.90,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    textContainer:{
        width: Dimensions.get('window').width*0.98,
        alignItems: "center", 
        marginBottom: 5
    },
    buttonContainer:{
        width: Dimensions.get('window').width*0.35,
        height: 50,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginTop: 4,
    },
    activity:{
        flex: 1,
        justifyContent: "center",
        marginTop: 25
    },
    rootContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        //justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        paddingTop: 5,
        backgroundColor: '#ccc'
    },
    noresults:{
      flex: 1,
      justifyContent: "center"
    },
    buttonWrapper:{
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 2
    }
})


export default EnrolledCustomers