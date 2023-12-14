import React, { Fragment, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Balloon from './Balloon';
import styles from './ChatStyle';
import io from 'socket.io-client';
import storageService from '../../services/storageService';
//importa o storageService

/*
  sentBy: '(nome de quem enviou)',
  date: '(data e hora de quem enviou)',
  text: 'mensagem'
*/ 

const socket = io('http://10.5.0.33:3000')
const Chat = ({route}: any) => {
  
  // const content: any = {messages:[]};
  const [content, setContent] = useState('');
  const [text, setText] = useState('');
  const [chat, setChat] = useState<{ messages: any[] }>({ messages: [] });
  const [userData, setUserData]= useState({name: ''});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await storageService.get('userData');
        setUserData(userData);
        
        socket.on('chat', (response: any) => {
          setChat(prevChat => ({ messages: [...prevChat.messages, response] }));
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const sendMessage = async () => {
    await socket.emit('chat', { content, sentBy: userData.name, date: new Date() });
    setContent('');
  };  
  return (
    <Fragment>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {
            chat.messages.length > 0 ?
                chat.messages.map(( m: any, index: number) => (
                <Balloon key={index} message={m} currentUser={userData.name}/> // colocar o userdata  no storageService.set do login
                )) : 
                <Text style={{marginTop:'5%' , alignSelf:'center' , color:'#848484'}}>
                  Sem mensagens no momento!
                </Text>
            }
        </ScrollView>
        <SafeAreaView>
          <View style={styles.messageTextInputContainer}>
            <TextInput
            style={styles.messageTextInput}
            placeholder= 'Digite sua mensagem aqui...' 
            placeholderTextColor={Colors.ligth}
            value={content}
            multiline
            onChangeText={(message) => setContent(message)} 
            />
            <TouchableOpacity
              style={styles.sendButton}
              disabled={!content}
              onPress={() => sendMessage()}>
                <Text style={{color:Colors.white}}>Enviar</Text>
              </TouchableOpacity>
              </View>
        </SafeAreaView>
    </Fragment>
  )
};
export default Chat;