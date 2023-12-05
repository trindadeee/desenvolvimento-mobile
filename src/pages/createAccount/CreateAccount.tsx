import React, { useState } from 'react';
import { ImageBackground, Image, Pressable, Text, TextInput, View, Alert, KeyboardAvoidingView, Platform, ScrollView, ScrollViewBase } from 'react-native';
import styles from '../createAccount/AccountStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

const dataList = [{ image_url: '' }];

const CreateAccount = ({ navigation }: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';
  
  const baseURL = 'http://10.5.5.55:3259';

  const goToPage = (path: string) => {
    navigation.navigate(path);
  };

  const handleCreateAccount = async () => {
    if (password !== confPass) {
      Alert.alert('Senhas não coincidem', 'Por favor, verifique suas senhas.');
      return;
    }

    if (!name || !email || !address || !telNumber || !password || !confPass) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('suaAPI/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address,
          telNumber,
          password,
          confPass,
        }),
      });

      if (response.ok) {
        navigation.navigate('login');
        Alert.alert('Conta criada com sucesso!');
      } else {
        const data = await response.json();
        Alert.alert('Erro ao criar conta', data.message || 'Ocorreu um erro ao criar a conta.');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
    }
  };

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
      <StatusBar backgroundColor='#236B8E' />
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logo}>
          <FontAwesome name="user-circle-o" size={150} color={'#236B8E'}></FontAwesome>
          <Text style={styles.text}>Criar Usuário </Text>
        </View>
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Nome Completo: </Text>
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          placeholder="Coloque seu Nome Completo"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Email: </Text>
        <TextInput
          placeholderTextColor={'black'}
          keyboardType='email-address' style={styles.input}
          placeholder="Coloque seu Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Endereço: </Text>
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          placeholder="Coloque seu Endereço"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Número de telefone: </Text>
        <TextInput
          placeholderTextColor={'black'}
          maxLength={11} keyboardType='numeric' style={styles.input}
          placeholder="Coloque seu Telefone"
          value={telNumber}
          onChangeText={(text) => setTelNumber(text)} />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Senha: </Text>
        <TextInput
          placeholderTextColor={'black'}
          secureTextEntry={true} style={styles.input}
          placeholder="Coloque sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)} />
        <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Confirmar Senha: </Text>
        <TextInput
          placeholderTextColor={'black'}
          secureTextEntry={true} style={styles.input}
          placeholder="Confime sua senha"
          value={confPass}
          onChangeText={(text) => setConfPass(text)}
        />

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
    </ScrollView>
    </ImageBackground>
  );
};

export default CreateAccount;


