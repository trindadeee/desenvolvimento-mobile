import React from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyle';

const Login = ({navigation}:any) => {
    
  const goToPage = (path:string) => {
        navigation.navigate(path)
    }
  const goToHome = () => {
      navigation.navigate('home');
    };
  
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
      <Pressable
                onPress= {goToHome}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 10,
                })}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Entrar</Text>
              </Pressable>
    </View>
        
    </ImageBackground>
  )
};

export default Login;

