import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './UserStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.5.5.55:3259';


const UserProfile = ({ route, navigation }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedAddress, setEditedAddress] = useState(''); 
  const [editedTelNumber, setEditedTelNumber] = useState(''); 
  const [userData, setUserData] = useState();
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  useEffect(() => {
    getCurrentUser();
    setEditedUsername(route.params?.username || '');
    setEditedEmail(route.params?.email || '');
    setEditedAddress(route.params?.address || ''); 
    setEditedTelNumber(route.params?.telNumber || ''); 
  }, [route.params]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  // const cancelChanges = () => {
  //   setIsEditing
  // }

  const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('jwtToken')

    console.log('jwtToken',token)
    try {
      const response = await fetch(`${baseURL}/current`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
      const result = await response.json();
      console.log(result)
      setUserData(result);
    } catch (err) {
      console.log(err)
    }
  }

  const handeLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');

    navigation.nagivate('login');
  }

  const saveChanges = async () => {
    try {
      const response = await fetch(`${baseURL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editedUsername,
          email: editedEmail,
          address: editedAddress, 
          telNumber: editedTelNumber, 
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        navigation.setParams({
          username: editedUsername,
          email: editedEmail,
          address: editedAddress, 
          telNumber: editedTelNumber, 
        });
      } else {
        console.error('Erro ao salvar as alterações');
      }
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const logout = () => {
    
    navigation.navigate('login'); 
  };

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <Text style={styles.username}>{isEditing ? 'Editar Perfil' : userData?.name || ''}</Text>
          <Text style={styles.email}>{userData?.email || ''}</Text> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {isEditing ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                // placeholder={userData?.name}
                value={editedUsername}
                onChangeText={(text) => setEditedUsername(text)}
              />
              <TextInput
                style={styles.input}
                // placeholder={userData?.email}
                placeholder="Email"
                value={editedEmail}
                onChangeText={(text) => setEditedEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Endereço"
                // placeholder={userData?.address}
                value={editedAddress}
                onChangeText={(text) => setEditedAddress(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone de Contato"
                // placeholder={userData?.telNumber}
                value={editedTelNumber}
                onChangeText={(text) => setEditedTelNumber(text)}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.label}>Nome de Usuário: {userData?.name || ''}</Text>
              <Text style={styles.label}>Email: {userData?.email || ''}</Text>
              <Text style={styles.label}>Endereço: {userData?.address || ''}</Text>
              <Text style={styles.label}>Telefone de Contato: {userData?.telNumber || ''}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          {isEditing ? (
            <View>
              {/* edição adicionais, como senha, etc. */}
            </View>
          ) : (
            <View>
              <Pressable
                onPress={toggleEdit}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  width: '60%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 20,
                  marginTop: 60,
                  marginRight: 10,
                })}
              >
                <Text style={{ color: 'white' }}>Editar Perfil</Text>
              </Pressable>

              {/* Novo botão de logout */}
              <Pressable
                onPress={logout}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  width: '60%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 20,
                  marginRight: 10,
                  marginTop:'70%'
                })}
              >
                <Text style={{ color: 'white' }}>Sair</Text>
              </Pressable>
            </View>
          )}
        </View>

        {isEditing && (
          <View>
          <Pressable
            onPress={saveChanges}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? '#95CEDF' : '#236B8E',
              height: 40,
              width: '60%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginBottom: 20,
              marginTop: 50,
              marginRight: 10,
            })}
          >
            <Text style={{ color: 'white' }}>Salvar Alterações</Text>
          </Pressable>
          <Pressable
            onPress={toggleEdit}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? '#95CEDF' : '#236B8E',
              height: 40,
              width: '60%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginBottom: 20,
              marginTop: 50,
              marginRight: 10,
            })}
          >
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </Pressable>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default UserProfile;
