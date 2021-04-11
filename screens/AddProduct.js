import React,{ useState} from 'react'
import { Text, TextInput, StyleSheet, Alert, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'
import {Picker, PickerIOS} from '@react-native-picker/picker'

const AddProduct = props => {

    const shopId = props.navigation.getParam('shopId')
    const query = shopId + "-products"
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [laoding, setLoading] = useState(false)  

    const insert = async() => {
      console.log(genre)
      setLoading(true)
        fetch('https://rental-portal.000webhostapp.com/addproducts.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
           
              // Getting the id.
              query: query,
              name: name,
              url: url,
              description: description,
              genre: genre
           
            }) 
            
          }).then((response) => response.json())
                .then((responseJson) => {
                  //console.log(query)
                  //console.log(responseJson)
                  setLoading(false)
                  Alert.alert("Record Inserted","Your record for given product has been added to the database.",[{text: "Okay", onPress: ()=> {} }])
                  props.navigation.navigate('Dashboard')
                }).catch((error) => {
                  Alert.alert("Try Again","Something went wrong, please try again.",[{text: "Okay", onPress: ()=> {} }])
                  console.log(error);
                  setLoading(false)
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
            <Card style={styles.rootContainer} >
                <Text>Name:</Text>
                <TextInput style={styles.text} value={name} onChangeText={ text => setName(text)} />
                <Text>Image URL:</Text>
                <TextInput style={styles.text} value={url} onChangeText={ text => setUrl(text)} />
                <Text>Genre</Text>
                <Picker
                    style={{width: 150, backgroundColor: '#ccc'}}
                    selectedValue={genre}
                    itemStyle={{fontSize: 20, backgroundColor: '#ccc'}}
                    onValueChange={(itemValue, itemIndex) =>
                      setGenre(itemValue)
                    }>
                    <Picker.Item label="Romantic" value="Romantic" />
                    <Picker.Item label="Thriller" value="Thriller" />
                    <Picker.Item label="Fictional" value="Fictional" />
                    <Picker.Item label="Horror" value="Horror" />
                    <Picker.Item label="Real-Life" value="Real-Life" />
                    <Picker.Item label="Educational" value="Educational" />
                </Picker>
                <Text>Description:</Text>
                <TextInput multiline={true} style={styles.description} value={description} onChangeText={ text => setDescription(text)} />
            </Card>
            <TouchableOpacity onPress={insert} style={styles.buttonContainer}>
                <Text style={{fontSize: 18}} >Add</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

AddProduct['navigationOptions'] = () => (
    {
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: Dimensions.get('window').width*0.01 
    },
    scrollview:{
        flex: 1,
        //justifyContent: "center",
        backgroundColor: "#ccc"
      },
    text:{
        backgroundColor: '#ccc',
        width: Dimensions.get('window').width*0.80,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    buttonContainer:{
        width: Dimensions.get('window').width*0.7,
        height: 50,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginVertical: 5,
        marginHorizontal: Dimensions.get('window').width*0.15
    },
    description:{
        backgroundColor: '#ccc',
        width: Dimensions.get('window').width*0.80,
        height: 100,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    activity:{
      flex: 1,
      justifyContent: "center"
    }

})

export default AddProduct