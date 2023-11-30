import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './UserStyle';

const UserProfile = ({ route, navigation }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedAddress, setEditedAddress] = useState(''); 
  const [editedTelNumber, setEditedTelNumber] = useState(''); 
  const [userData, setUserData] = useState(route.params || {});
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  useEffect(() => {
    setUserData(route.params || {});
    setEditedUsername(route.params?.username || '');
    setEditedEmail(route.params?.email || '');
    setEditedAddress(route.params?.address || ''); 
    setEditedTelNumber(route.params?.telNumber || ''); 
  }, [route.params]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch('https://sua-api.com/atualizar-usuario', {
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
          <Text style={styles.username}>{isEditing ? 'Editar Perfil' : userData?.username || ''}</Text>
          <Text style={styles.email}>{userData?.email || ''}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {isEditing ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                value={editedUsername}
                onChangeText={(text) => setEditedUsername(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editedEmail}
                onChangeText={(text) => setEditedEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={editedAddress}
                onChangeText={(text) => setEditedAddress(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone de Contato"
                value={editedTelNumber}
                onChangeText={(text) => setEditedTelNumber(text)}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.label}>Nome de Usuário: {userData?.username || ''}</Text>
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
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default UserProfile;
