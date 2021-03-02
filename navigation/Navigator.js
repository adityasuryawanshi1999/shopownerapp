import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DashboardOptions from '../screens/DashboardOptions'
import ProductsPage from '../screens/ProductsPage'
import LoginPage from '../screens/LoginPage'
import ProductDetailPage from '../screens/ProductDetailPage'
import AddProduct from '../screens/AddProduct'
import IssueProduct from '../screens/IssueProuct'
import GetProductIdIssue from '../screens/GetProductIdIssue'
import ReturnProduct from '../screens/ReturnProduct'
import IssuedProducts from '../screens/IssuedProducts'
import CheckProfile from '../screens/CheckProfile'
import EnrolledCustomers from '../screens/EnrolledCustomers'
import DeenrollUser from '../screens/DeenrollUser'

const Navigator = createStackNavigator({
    Login: LoginPage,
    Dashboard: DashboardOptions,
    Products: ProductsPage,
    Overview: ProductDetailPage,
    Add: AddProduct,
    Issue: IssueProduct,
    ProductId: GetProductIdIssue,
    Return: ReturnProduct,
    Transactions: IssuedProducts,
    Profiles: CheckProfile,
    Enrolled: EnrolledCustomers,
    Deenroll: DeenrollUser
})

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default createAppContainer(Navigator)