import React from 'react';
import { ImageBackground, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyle';
import Home from '../home/Home';

const Login = ({navigation}:any) => {
    const goToPage = (path:string) => {
        navigation.navigate(path)
    }
 
  return (

    <ImageBackground style={styles.imageBack} source={require('pharmacy-mobile/assets/farmBackground.jpg')}>
   
     <View style={styles.container} >
      <View style = {styles.logo} >
        <Icon name = 'plus-square' size={150} color={'#2196F3'}></Icon>
        <Text style = {styles.text}> PharmGO</Text>
      </View>
      <Text style={{fontWeight: 'bold'}}>Login:</Text>
      <TextInput style = {styles.input}/>
      <Text style={{fontWeight: 'bold'}}>Senha:</Text>
      <TextInput secureTextEntry={true} style = {styles.input}/>
      <View style = {styles.createForgotLink}>
        <Text onPress={() => {goToPage('createAccount')}} style = {[styles.link,{fontWeight: 'bold'}]}>Criar Usuário</Text>
        <Text onPress={() => {goToPage('forgotPassword')}} style = {[styles.link,{fontWeight: 'bold'}]}>Esqueceu sua senha?</Text>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={() => { goToPage('home') }}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
     
     
    </View>
        
    </ImageBackground>
  )
};

export default Login;
