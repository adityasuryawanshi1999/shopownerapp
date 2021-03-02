import React,{ useEffect, useState} from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Dimensions, TextInput, TouchableOpacity } from 'react-native'
//import { add, ceil } from 'react-native-reanimated'
import ProductItem from '../components/ProductItem'
import Card from '../components/Card'
import { FloatingAction } from 'react-native-floating-action'
import Colors from '../constants/Colors'

const ProductsPage = props => { 

    const email = props.navigation.getParam('email')
    const shopId = props.navigation.getParam('shopId')
    const query = shopId + '-products'
    //console.log(query)
    const [ dataSource, setDataSource ] = useState({ data: []})
    const [laoding, setLoading] = useState(true)
    const [noresults, setNoResults] = useState(false)
    const [name, setName] = useState("")
    const action = [{text: "Add", name: "Add", icon: require('../assets/adaptive-icon-1.png'), color:Colors.primary }]
 
    useEffect( () => { 
        (async() => {
            fetch('https://rental-portal.000webhostapp.com/fetchproducts.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id.
                  query: shopId+"-products"
               
                }) 
                
              }).then((response) => response.json())
                    .then((responseJson) => {
                      setDataSource({ data: responseJson})
                      //console.log(dataSource)
                      setLoading(false)
                    }).catch((error) => {
                      console.error(error);
                    }); 
        })();
    },[])

    const clickHandler = () => {
      
    }

    const searchByName = async() => {
      setLoading(true)
        fetch('https://rental-portal.000webhostapp.com/fetchproductsbyname.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  query2: shopId+"-products",
                  name: '%'+name+'%'
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(false)
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setLoading(false)
                      setNoResults(false)
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.error(error);
                      setLoading(false)
                    });
    }

    const resetAction = async() => {
      setLoading(true)
      fetch('https://rental-portal.000webhostapp.com/fetchproducts.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id.
                  query: shopId+"-products"
               
                }) 
                
              }).then((response) => response.json())
                    .then((responseJson) => {
                      setDataSource({ data: responseJson})
                      //console.log(dataSource)
                      setNoResults(false)
                      setLoading(false)
                    }).catch((error) => {
                      console.error(error);
                    });
    }

    if(laoding){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.activity}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
            <FloatingAction color={Colors.primary} actions={action} onPressItem={ Add => { props.navigation.navigate('Add',{shopId: shopId})} }  />
        </View>
      )

    }
  
    if(noresults){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.noresults}>
                <Text style={{fontSize: 15}}>No active results</Text>
            </View>
            <FloatingAction color={Colors.primary} actions={action} onPressItem={ Add => { props.navigation.navigate('Add',{shopId: shopId})} }  />
        </View> 
      )
    }
    
    return(
        <View style={styles.rootContainer}>
            <Card style={styles.textContainer}>
                <Text style={{fontSize: 15, marginBottom: 4, marginLeft: 4}}>Filter by name:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={resetAction}  >
                      <Text style={styles.greetingText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={searchByName}  >
                      <Text style={styles.greetingText}>Search</Text>
                  </TouchableOpacity>
                </View> 
            </Card>
            <FlatList data={dataSource.data} keyExtractor={ item => item.product_id } renderItem={ itemData => <ProductItem title={itemData.item.name} pid={itemData.item.product_id} url ={itemData.item.image_url} issued={itemData.item.issued} onViewDetail={ ()=> props.navigation.navigate('Overview',{query: shopId, pid: itemData.item.product_id})  } /> } />
            <FloatingAction color={Colors.primary} actions={action} onPressItem={ Add => { props.navigation.navigate('Add',{shopId: shopId})} }  />
        </View> 
    )
}

ProductsPage['navigationOptions'] = () => (
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
        alignContent: "center",
        alignItems: "center",
        backgroundColor: '#ccc',
        paddingTop: 5
    },
    activity:{
      flex: 1,
      justifyContent: "center",
      backgroundColor: '#ccc'
    },
    textContainer:{
      width: Dimensions.get('window').width*0.98,
      alignItems: "center", 
      marginBottom: 5
    },
    text:{
      backgroundColor: '#ccc',
      width: Dimensions.get('window').width*0.90,
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 5
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


export default ProductsPage