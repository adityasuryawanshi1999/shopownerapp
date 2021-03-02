import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';


const Card = (props) => {
    return(<View style={{...styles.cardStyles,...props.style}}>
        {props.children}
    </View>)
}



const styles = StyleSheet.create({
    cardStyles:{
        shadowColor:'black',
        shadowOffset:{ width:0, height:2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor:'white',
        elevation: 5,
        padding: 15,
        borderRadius: 10
    }
})

export default Card