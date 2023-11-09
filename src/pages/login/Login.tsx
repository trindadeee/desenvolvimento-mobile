import React from 'react'   //rafce
import {Text, TextInput, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './LoginStyle';

const Login = ({navigation}:any) => {
  const goToPage = (path:String) => {
    navigation.navigate(path)
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Icon name="disconnect" size={120} color={'#2089DC'}></Icon>
        <Text style={styles.text}>Nome </Text>
      </View>
      <Text>Login: </Text>
      <TextInput style = {styles.input}/>
      <Text>Password: </Text>
      <TextInput secureTextEntry={true} style={styles.input}/>
      <View style={styles.createForgotLink}>
        <Text onPress={() => {goToPage('CreateAccount')}} style={styles.link}>Create Account </Text>
        <Text onPress={() => {goToPage('ForgotPassword')}} style={styles.link}>Forgot Password </Text>
      </View>
      <Button onPress={() => {goToPage('Home')}} title = 'Entrar'></Button>
    </View>
  );
};

export default Login;