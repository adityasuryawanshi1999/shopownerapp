import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import Card from '../components/Card'
import TransactionItem from '../components/TransactionItem'
import Colors from '../constants/Colors'


const CheckProfile = props => {

    const shopId = props.navigation.getParam('shopId')
    const [email, setEmail] = useState("")
    const [dataSource, setDataSource] = useState({data:[]})
    const [loading, setLoading] = useState(true)
    const [noresults, setNoResults] = useState(false)

    const searchByEmail = async() => {
        setLoading(false)
        fetch('https://rental-portal.000webhostapp.com/fetchtransactionsbyemail.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  query: shopId+"-transaction",
                  query2: shopId+"-products",
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
                      setLoading(true)
                      setNoResults(false)
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
                        <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                            <Text style={styles.greetingText}>Search</Text>
                        </TouchableOpacity>
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
                    <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                        <Text style={styles.greetingText}>Search</Text>
                    </TouchableOpacity>
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
                <TouchableOpacity style={styles.buttonContainer} onPress={searchByEmail}  >
                    <Text style={styles.greetingText}>Search</Text>
                </TouchableOpacity>
            </Card>
            <FlatList data={dataSource.data} keyExtractor={ item => item.product_id } renderItem={ itemData => <TransactionItem title={itemData.item.name} pid={itemData.item.product_id} issuedBy={itemData.item.email} issueDate={itemData.item.issue_date} returnDate={itemData.item.return_date} /> } />
        </View>
    )
}

CheckProfile['navigationOptions'] = () => (
    {
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
  )

const styles = StyleSheet.create({
    textContainer:{
        width: Dimensions.get('window').width*0.98,
        alignItems: "center", 
        marginBottom: 5
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
    text:{
        backgroundColor: '#ccc',
        width: Dimensions.get('window').width*0.90,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    buttonContainer:{
        width: Dimensions.get('window').width*0.5,
        height: 50,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginTop: 4,
    },
    noresults: {
        flex: 1,
        justifyContent: "center"
    }
})

export default CheckProfile