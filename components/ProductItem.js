import { Text, View, StyleSheet, Image, Button, Platform, Touchable, Dimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

const ProductItem = props => {

    //let TouchableCmp = Platform.OS === 'android' && Platform.Version>=21 ? TouchableNativeFeedback : TouchableOpacity

    return(
        <TouchableOpacity onPress={props.onViewDetail} >
            <Card style={styles.container}>
                <Image style={styles.image} source={{uri: props.url}} />
                <View style={styles.textContent}>
                    <Text style={{fontSize: 15,fontWeight: "bold"}}>{props.title}</Text>
                    <Text>Product Id: {props.pid}</Text>
                    <Text>Status: {props.issued}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width*0.97,
        flexDirection: "row",
        marginVertical: 2,
        justifyContent: "space-around"
    },
    image:{
        height: 60,
        width: 60,
        borderRadius: 10
    },
    textContent:{
        width: Dimensions.get('window').width*0.60
    }
})

export default ProductItem