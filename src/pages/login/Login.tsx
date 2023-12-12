import React, { useState } from 'react';
import { ImageBackground, Linking, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Para ícone do Twitter
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Para ícone do Instagram
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

const baseURL = 'http:// 10.0.0.111:3000';

const Login = ({ navigation }: any) => {

  const [login, setLogin] = useState('');
  const [loginPlaceHolder, setLoginPlaceHolder] = useState('Insira seu email ou número de telefone')
  const [password, setPassword] = useState('');
  const [passwordPlaceHolder, setPasswordPlaceHolder] = useState('Insira sua senha')

  const goToPage = (path: string) => {
    navigation.navigate(path)
  }

  const handleLogin = async () => {
    try {
      const isEmail = login.includes('@');

      const loginBody: {
        password: string;
        email?: string;
        telNumber?: number;
      } = {
        password: password,
      }

      if(isEmail) {
       loginBody.email = login.toLowerCase();
      } else {
        loginBody.telNumber = parseInt(login, 10)
      }
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginBody)
      });

      if(response.status === 204) {
        ToastAndroid.show("Login ou senha inválidos", 2000);
      }

      if (response.ok) {

        const jwtToken = response.headers.get('Authorization');
        
        if (jwtToken) {
          await AsyncStorage.setItem('jwtToken', jwtToken);
          await getCurrentUser()
          navigation.navigate('home');
        }
      } else {
        ToastAndroid.show("É necessário inserir login e senha", 2000);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleLoginInputFocus = () => {

    setLoginPlaceHolder('')
    if(login === '') {

      setLoginPlaceHolder('Insira seu email ou número de telefone');
    }
  }

  const handlePasswordInputFocus = () => {
    setPasswordPlaceHolder('')
    if(login === '') {
      setPasswordPlaceHolder('Insira sua senha');
    }
  }

  const handleGmailLogin = () => {
    Linking.openURL('https://accounts.google.com/AccountChooser/identifier?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin&theme=glif');
  };

  const handleInstagramLogin = () => {
    Linking.openURL('https://www.instagram.com/accounts/login/?source=auth_switcher');
  };

  const handleTwitterLogin = () => {
    Linking.openURL('https://twitter.com/i/flow/login');
  };

  const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('jwtToken')

    try {
      const response = await fetch(`${baseURL}/current`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
      const result = await response.json();
      AsyncStorage.setItem('userId', result._id)
      return result._id
    } catch (err) {
      console.error(err)
    }
  }

  return (

    <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >

      <View style={styles.container} >
        <View style={styles.logo} >
          <Icon name='plus-square' size={150} color={'#236B8E'}></Icon>
          <Text style={styles.text}> PharmGO</Text>
        </View>
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Login:</Text>
        <TextInput placeholder={loginPlaceHolder}
          placeholderTextColor={'black'} style={styles.input}
          value={login}
          autoCapitalize='none'
          onChangeText={(text) => setLogin(text)}
          onFocus={handleLoginInputFocus} />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Senha:</Text>
        <TextInput placeholder={passwordPlaceHolder}
          placeholderTextColor={'black'} secureTextEntry style={styles.input}
          value={password}
          autoCapitalize='none'
          onChangeText={(text: string) => setPassword(text)}
          onFocus={handlePasswordInputFocus} />
        <View style={styles.createForgotLink}>
          <Text onPress={() => { goToPage('createAccount') }} style={[styles.link, { fontSize: 15, color: '#236B8E', fontWeight: 'bold' }]}>Criar Usuário</Text>
          <Text onPress={() => { goToPage('forgotPassword') }} style={[styles.link, { fontSize: 15, color: '#236B8E', fontWeight: 'bold' }]}>Esqueceu sua senha?</Text>
        </View>

        <View style={styles.createForgotLink}>
          <Pressable
            onPress={handleGmailLogin}
            style={({ pressed }: any) => [
              styles.loginIcon,
              { backgroundColor: pressed ? '#95CEDF' : '#236B8E' }
            ]}
          >
            <Icon name="google" size={25} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={handleInstagramLogin}
            style={({ pressed }: any) => [
              styles.loginIcon,
              { backgroundColor: pressed ? '#95CEDF' : '#236B8E' }
            ]}
          >
            <FontAwesomeIcon name="instagram" size={25} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={handleTwitterLogin}
            style={({ pressed }: any) => [
              styles.loginIcon,
              { backgroundColor: pressed ? '#95CEDF' : '#236B8E' }
            ]}
          >
            <MaterialIcon name="twitter" size={25} color="#FFFFFF" />
          </Pressable>
        </View>
        <Pressable
          onPress={handleLogin}
          style={({ pressed }: any) => ({
            backgroundColor: pressed ? '#95CEDF' : '#236B8E',
            height: 40,
            width: '60%',
            alignSelf: 'center',
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
