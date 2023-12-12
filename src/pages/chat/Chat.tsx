import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Balloon from './Balloon';
import styles from './ChatStyle';
import io from 'socket.io-client';
//importa o storageService

/*
  sentBy: '(nome de quem enviou)',
  date: '(data e hora de quem enviou)',
  text: 'mensagem'
*/ 

const socket = io('http://ip_da_maquina')
const Chat = () => {
  const content: any = {messages:[]};
  const [text, setText] = useState('');
  const [chat ,setChat] = useState(content);
  const [userData,setuserData]= useState({name: ''});
  
  // useEffect(() => {
  //   storageService.get('userData').then ((userData: any) => {
  //     setuserData(userData)
  //     socket.on('chat', (response: any) => {
  //       setText('')
  //       chat.messages.push(response)
  //       setChat({messages: chat.mensages})
  //     })

  //   })
  // }, []) 
  const sendMessage = () => {
    socket.emit('chat', {content, sentBy: userData.name, date: new Date()})
  };  
  //     socket.on('chat', (messagem: any) => {
  //       chat.messages.push(messagem)
  //       setChat({messages: chat.mensages})
  //       setContent('')
  //     })
  //     setuserData(userData)
  //   })
  // }, [])
  // const sendMessage = () => {
  //   socket.emit('chat', {content, sentBy: userData.name, date: new Date()})
  // };
  
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
export default Chat;
// import React, { Fragment } from 'react';
// import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useState } from 'react';
// import { TextInput } from 'react-native-paper';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Balloon from './Balloon';
// import styles from './ChatStyle';
// //importa o storageService

// /*
//   sentBy: '(nome de quem enviou)',
//   date: '(data e hora de quem enviou)',
//   text: 'mensagem'
// */ 

// const Chat = () => {
//   const sendMessage = () => {};
//   const options: any = {messages:[]};
//   const [text, setText]= useState();
//   const [chat,setChat]= useState(options);
//   const [userData,setuserData]= useState(options);
//   // storageService.get('userData').then ((userData:any) =>  {

//   //   setuserData(JSON.parse(userData))
    
//   // }); 

//   return (
//     <Fragment>
//         <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//             {
//             chat.messages.length > 0 ?
//                 chat.messages.map(( m: any, index: number) => (
//                 <Balloon key={index} message={m} currentUser={userData.name}/> // colocar o userdata  no storageService.set do login
//                 )) : 
//                 <Text style={{marginTop:'5%' , alignSelf:'center' , color:'#848484'}}>
//                   Sem mensagens no momento!
//                 </Text>
//             }
//         </ScrollView>
//         <SafeAreaView>
//           <View style={styles.messageTextInputContainer}>
//             <TextInput
//             style={styles.messageTextInput}
//             placeholder= 'Digite sua mensagem aqui...' 
//             placeholderTextColor={Colors.ligth}
//             value={text}
//             multiline
//             onChangeText={(message) => setText(message)} 
//             />
//             <TouchableOpacity
//               style={styles.sendButton}
//               disabled={!text}
//               onPress={() => sendMessage()}>
//                 <Text style={{color:Colors.white}}>Enviar</Text>
//               </TouchableOpacity>
//               </View>
//         </SafeAreaView>
//     </Fragment>
//   )
// };
// export default Chat;