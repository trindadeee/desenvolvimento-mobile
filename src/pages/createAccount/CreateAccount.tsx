import React, { useState } from 'react';
import { ImageBackground, Pressable, Text, TextInput, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Para ícone do Instagram
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Para ícone do Twitter
import styles from '../login/LoginStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';


const CreateAccount = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const backgroundImageUrl ='https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const goToPage = (path: string) => {
    navigation.navigate(path);
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

  const handleCreateAccount = () => {
    setConfirmationMessage('Conta criada com sucesso!');
    setModalVisible(true);
  };

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
      <StatusBar backgroundColor='#236B8E' />

      <View style={styles.container}>
        <View style={styles.logo}>
          <FontAwesome name="user-circle-o" size={150} color={'#236B8E'}></FontAwesome>
          <Text style={styles.text}>Criar Usuário </Text>
        </View>
        <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Nome Completo: </Text>
        <TextInput style={styles.input} />
        <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Email: </Text>
        <TextInput keyboardType='email-address' style={styles.input} />
        <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Número de telefone: </Text>
        <TextInput maxLength={11} keyboardType='numeric' style={styles.input} />
        <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Senha: </Text>
        <TextInput secureTextEntry={true} style={styles.input} />
        <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Confirmar Senha: </Text>
        <TextInput secureTextEntry={true} style={styles.input} />


        <Pressable
          style={({ pressed }: any) => ({
            backgroundColor: pressed ? '#95CEDF' : '#236B8E',
            height: 40,
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 15,
            marginBottom: 40,
            marginTop: 35,
          })}
        >
          <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Enviar</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default CreateAccount;


