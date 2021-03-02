import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'


const ProductDetailPage = props => {
    
    const shopId = props.navigation.getParam('query')
    const query = shopId+"-products"
    const pid = props.navigation.getParam('pid')
    const [laoding, setLoading] = useState(true)
    const [dataSource, setDataSource] = useState({data:[]})

    useEffect( ()=> {
        (async() => {
            fetch('https://rental-portal.000webhostapp.com/fetchproductdetail.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  query: shopId+"-products",
                  pid: pid
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                      setDataSource({ data: responseJson})
                      setLoading(false)
                    }).catch((error) => {
                      console.error(error);
                    }); 
        })();    
    },[])

    const del = async()=> {
      fetch('https://rental-portal.000webhostapp.com/deleteproduct.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
           
              // Getting the id.
              query: query,
              pid: pid
           
            }) 
            
          }).then((response) => response.json())
                .then((responseJson) => {
                  //console.log(query)
                  //console.log(responseJson)
                  Alert.alert("Record Deleted","Your record for given product has been deleted from the database.",[{text: "Ok", onPress: ()=> console.log('ok') }])
                  props.navigation.navigate('Dashboard')
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
        <ScrollView style={styles.scrollview}>
          <View style={styles.rootContainer}>
              <Image style={styles.image} source={{uri: dataSource.data[0].image_url}} />
              <Card style={styles.textContainer}>
                <Text style={{fontSize: 20, textAlign: "center"}}>{dataSource.data[0].name}</Text>
                <Text style={{fontSize: 15, textAlign: "center"}}>{dataSource.data[0].genre}</Text>
                <Text style={{fontSize: 15}}>{dataSource.data[0].description}</Text>
              </Card>
              <TouchableOpacity onPress={del} style={styles.buttonContainer}>
                <Text style={{fontSize: 18}} >Delete</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    )
}

ProductDetailPage['navigationOptions'] = () => (
  {
    headerStyle: {
      backgroundColor: Colors.primary
    }
  }
)

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        //justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#ccc',
        paddingVertical: 5
    },
    image: {
      width: Dimensions.get('window').width*0.98,
      height: 450,
      borderRadius: 10
    },
    textContainer:{
      width: Dimensions.get('window').width*0.98,
      marginTop: 5,
    },
    activity:{
      flex: 1,
      justifyContent: "center"
    },
    scrollview:{
      flex: 1,
      backgroundColor: "#ccc"
    },
    buttonContainer:{
      width: Dimensions.get('window').width*0.7,
      height: 50,
      justifyContent: "center",
      //alignContent: "center",
      alignItems: "center",
      backgroundColor: '#db4a39',
      borderRadius: 25,
      marginVertical: 5,
      marginHorizontal: Dimensions.get('window').width*0.15
  }
})

export default ProductDetailPage