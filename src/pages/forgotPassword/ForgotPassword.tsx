import React from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../login/LoginStyle';

const ForgotPassword = ({navigation}:any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const goToPage = (path:String) => {
    navigation.navigate(path)
  }
  return (
    <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >
    <View style={styles.container}>
    <View style = {styles.logo} >
      <Icon name = 'key' size={150} color={'#2196F3'}></Icon>
      <Text style = {styles.text}> Recuperar Senha</Text>
    </View>
    <Text>Email:</Text>
    <TextInput style = {styles.input}/>
    <Text>Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Text>Confirmar Nova Senha:</Text>
    <TextInput secureTextEntry={true} style = {styles.input}/>
    <Pressable
               
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 10,
                })}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Enviar</Text>
              </Pressable>
  </View>
  </ImageBackground>
  )
}

export default ForgotPassword;
