import React, { useState } from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './PasswordStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = ({navigation}:any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const goToPage = (path:String) => {
    navigation.navigate(path)
  }
  const handleCreateAccount = () => {
    setConfirmationMessage('Senha Alterada com Sucesso!');
    setModalVisible(true);
  };
  return (
    <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >
    <View style={styles.container}>
    <View style = {styles.logo} >
      <MaterialCommunityIcons name = 'shield-key-outline' size={150} color={'#236B8E'}></MaterialCommunityIcons>
      <Text style = {styles.text}> Recuperar Senha</Text>
    </View>
    <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Email:</Text>
    <TextInput style = {styles.input}/>
    <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Text style={{fontSize:15,color:'#236B8E', fontWeight: 'bold'}}>Confirmar Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Pressable
               
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  width:'60%',
                  alignSelf:'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 10,
                  marginTop: 30
                })}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Enviar</Text>
              </Pressable>
  </View>
  </ImageBackground>
  )
}

export default ForgotPassword;