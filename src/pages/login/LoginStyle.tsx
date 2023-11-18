import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 40
      
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: '5%',
      marginTop: '3%',
      borderRadius:15,
    },
    createForgotLink: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginBottom: '5%',
      
      
    },
    link: {
      color : '#2196F3',
      marginLeft: '10%'
    },
    
    logo: {
      alignItems: 'center',
      marginBottom: '10%'
    },
    text:{
      fontSize: 34,
      color: 'gray',
    }
  });
  export default styles
  