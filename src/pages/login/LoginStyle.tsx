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
      textAlign: 'center',
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 15,
      paddingLeft: 10,
      paddingRight: 10
    },
    createForgotLink: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginBottom: '5%',
    },
    link: {
      color : '#236B8E',
      marginLeft: '10%',
  
    },
    logo: {
      alignItems: 'center',
      marginBottom: '10%'
    },
    text:{
      fontSize: 34,
      color: '#236B8E',
      fontWeight: 'bold'
    },

    loginIcon : {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginBottom: 10,
      marginRight: 30,
      padding: 10,
      marginTop: 18,
    }
  });
  export default styles
  
  
