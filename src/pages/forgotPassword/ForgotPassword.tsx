import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../login/LoginStyle';

const ForgotPassword = ({navigation}:any) => {
  const goToPage = (path:String) => {
    navigation.navigate(path)
  }
  return (
    <View style={styles.container}>
    <View style = {styles.logo} >
      <Icon name = 'key' size={150} color={'#2196F3'}></Icon>
      <Text style = {styles.text}> Recuperar Senha</Text>
    </View>
    <Text>Email:</Text>
    <TextInput style = {styles.input}/>
    <Text>Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Text>Confirmar Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Button onPress={() => {goToPage('login')}} title = 'Enviar'></Button>
  </View>
  )
}

export default ForgotPassword;