import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageBack: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 40,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10, // Altere este valor conforme necessário
      marginTop: 10, // Altere este valor conforme necessário
      borderRadius: 15,
      paddingLeft: 10, // Adiciona espaço à esquerda do texto
      paddingRight: 10
    },
    createForgotLink: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginBottom: '5%',
    },
    link: {
      color : '#2196F3',
      marginLeft: '10%',
  
    },
    logo: {
      alignItems: 'center',
      marginBottom: '10%'
    },
    text:{
      fontSize: 34,
      color: '#666666',
      fontWeight: 'bold'
    
    }
  });
  export default styles
  
