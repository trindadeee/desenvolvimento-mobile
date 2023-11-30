import React, { useState } from 'react';
import {ImageBackground,Image,Pressable,Text,TextInput,View,Alert,KeyboardAvoidingView,Platform,} from 'react-native';
import styles from './AccountStyle';
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

  const backgroundImageUrl =
    'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

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

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  };

  const deleteImage = () => {
    setImageUri(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
        {StatusBar && <StatusBar backgroundColor='#236B8E' />}

        <View style={styles.container}>

          {/*
        <View style={styles.logo}>
          <FontAwesome name="user-circle-o" size={150} color={'#236B8E'}></FontAwesome>
        </View> */}
          {imageUri && (
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              <Pressable onPress={deleteImage} style={{ marginLeft: 10, marginTop: -30 }}>
                <Ionicons name="trash-sharp" size={21} color={'#236B8E'} />
              </Pressable>
            </View>
          )}

          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Nome Completo: </Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque seu Nome Completo"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Email: </Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque seu Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Endereço: </Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque seu Endereço"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Telefone: </Text>
          <TextInput
            style={styles.input}
            placeholder="Coloque seu Telefone"
            value={telNumber}
            onChangeText={(text) => setTelNumber(text)}
          />
          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Senha: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Coloque sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={{ fontSize: 13, color: '#236B8E', fontWeight: 'bold' }}>Confirmar Senha: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confime sua senha"
            value={confPass}
            onChangeText={(text) => setConfPass(text)}
          />

          <Pressable
            onPress={selectImage}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? '#95CEDF' : '#236B8E',
              height: 40,
              width: '35%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 15,
              marginBottom: 10,
              marginTop: 28,
              marginLeft: '-1%',
            })}
          >
            <Text style={{ fontSize: 16, color: '#FFFFFF' }}>Enviar Foto</Text>
          </Pressable>

          <Pressable
            onPress={handleCreateAccount}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? '#95CEDF' : '#236B8E',
              height: 40,
              width: '60%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginBottom: 20,
              marginTop: 30,
              marginRight: 7,
            })}
          >
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Criar Conta</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
