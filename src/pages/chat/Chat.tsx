import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Balloon from './Balloon';
import styles from './ChatStyle';
//importa o storageService

/*
  sentBy: '(nome de quem enviou)',
  date: '(data e hora de quem enviou)',
  text: 'mensagem'
*/ 

const Chat = () => {
  const sendMessage = () => {};
  const options: any = {messages:[]};
  const [text, setText]= useState();
  const [chat,setChat]= useState(options);
  const [userData,setuserData]= useState(options);
 // storageService.get('userData').then ((userData:any) =>   (descomentar depois de importar o storage)

  //  setuserData(JSON.parse(userData))
    
 // }); 

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
            value={text}
            multiline
            onChangeText={(message) => setText(message)} 
            />
            <TouchableOpacity
              style={styles.sendButton}
              disabled={!text}
              onPress={() => sendMessage()}>
                <Text style={{color:Colors.white}}>Enviar</Text>
              </TouchableOpacity>
              </View>
        </SafeAreaView>
    </Fragment>
  )
};
export default Chat;