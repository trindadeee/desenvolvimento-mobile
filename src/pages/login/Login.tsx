import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyle';


const Login = ({navigation}:any) => {
    const goToPage = (path:string) => {
        navigation.navigate(path)
    }
  return (
    <View style={styles.container}>
      <View style = {styles.logo} >
        <Icon name = 'plus-square' size={150} color={'#2196F3'}></Icon>
        <Text style = {styles.text}> PharmGO</Text>
      </View>
      <Text>Login:</Text>
      <TextInput style = {styles.input}/>
      <Text>Senha:</Text>
      <TextInput secureTextEntry={true} style = {styles.input}/>
      <View style = {styles.createForgotLink}>
        <Text onPress={() => {goToPage('createAccount')}} style = {styles.link}>Criar Usuário</Text>
        <Text onPress={() => {goToPage('forgotPassword')}} style = {styles.link}>Esqueceu sua senha?</Text>
      </View>
      <Button onPress={() => {goToPage('home')}} title = 'Entrar'></Button>
    </View>
  )
}

export default Login