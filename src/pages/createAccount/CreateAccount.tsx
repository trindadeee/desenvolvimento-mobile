import React, { useState } from 'react';
import { ImageBackground, Image, Pressable, Text, TextInput, View, Alert, KeyboardAvoidingView, Platform, ScrollView, ScrollViewBase } from 'react-native';
import styles from '../createAccount/AccountStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

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

  const baseURL = 'http://10.5.0.33:3000';

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
      const response = await fetch(`${baseURL}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          address: address,
          telNumber: telNumber,
          password: password,
          confPass: confPass,
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
    <ScrollView>
      <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
        <StatusBar backgroundColor='#236B8E' />

        <View style={styles.container}>
          <View style={styles.logo}>
            <FontAwesome name="user-circle-o" size={150} color={'#236B8E'}></FontAwesome>
            <Text style={styles.text}>Criar Usuário </Text>
          </View>
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Nome Completo: </Text>
          <TextInput onChangeText={(text: string) => setName(text)} value={name} style={styles.input} autoCapitalize='words' />
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Email: </Text>
          <TextInput onChangeText={(text: string) => setEmail(text)} value={email} keyboardType='email-address' style={styles.input} autoCapitalize='none' />
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Número de telefone: </Text>
          <TextInput onChangeText={(text: string) => setTelNumber(text)} value={telNumber} maxLength={11} keyboardType='numeric' style={styles.input} autoCapitalize='none' />
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Endereço: </Text>
          <TextInput onChangeText={(text: string) => setAddress(text)} value={address} style={styles.input} autoCapitalize='none' />
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Senha: </Text>
          <TextInput onChangeText={(text: string) => setPassword(text)} value={password} secureTextEntry={true} style={styles.input} autoCapitalize='none' />
          <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Confirmar Senha: </Text>
          <TextInput onChangeText={(text: string) => setConfPass(text)} value={confPass} secureTextEntry={true} style={styles.input} autoCapitalize='none' />


          <Pressable
            onPress={handleCreateAccount}
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
    </ScrollView>

  );
};

export default CreateAccount;
