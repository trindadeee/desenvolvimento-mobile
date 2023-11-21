import React from 'react'
import {Text, TextInput, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './CreateAccountStyle';


const CreateAccount = ({navigation}:any) => {
  const goToPage = (path:String) => {
    navigation.navigate(path)
  }
  return (
    
    <View style={styles.container}>
      <View style={styles.logo}>
      <Icon name = 'adduser' size={150} color={'#2196F3'}></Icon>
        <Text style={styles.text}>Criar Usuário </Text>
      </View>
      <Text>Nome Completo: </Text>
      <TextInput style = {styles.input}/>
      <Text>Email: </Text>
      <TextInput secureTextEntry={true} style={styles.input}/>
      <Text>Password: </Text>
      <TextInput secureTextEntry={true} style={styles.input}/>
      <Text>Confirm Password: </Text>
      <TextInput secureTextEntry={true} style={styles.input}/>
      <View style={styles.createForgotLink}>
      </View>
      <Button  onPress={() => {goToPage('login')}} title = 'Create'></Button>
    </View>
  );
};

export default CreateAccount;



