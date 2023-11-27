import React from 'react';
import { ImageBackground, Linking, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Para ícone do Twitter
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Para ícone do Instagram
import { StatusBar } from 'expo-status-bar';

const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';


const Login = ({ navigation }: any) => {

  const goToPage = (path: string) => {
    navigation.navigate(path)
  }
  const goToHome = () => {
    navigation.navigate('home');
  };

  const handleGmailLogin = () => {
    Linking.openURL('https://accounts.google.com/AccountChooser/identifier?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin&theme=glif');
  };

  const handleInstagramLogin = () => {
    Linking.openURL('https://www.instagram.com/accounts/login/?source=auth_switcher');
  };

  const handleTwitterLogin = () => {
    Linking.openURL('https://twitter.com/i/flow/login');
  };

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
        <TextInput placeholder='Insira seu email ou número de telefone'
          placeholderTextColor={'black'} style={styles.input} />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Senha:</Text>
        <TextInput placeholder='Insira sua senha'
          placeholderTextColor={'black'} secureTextEntry={true} style={styles.input} />
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
          onPress={goToHome}
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
