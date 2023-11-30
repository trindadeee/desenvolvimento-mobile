import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 40,
    },
    imageBack: {
      flex: 1,
      width: '100%',
      height: '100%',
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
    logo: {
      alignItems: 'center',
      marginBottom: '10%'
    },
    text:{
      fontSize: 34,
      color: '#236B8E',
      fontWeight: 'bold'
    }
  });
  export default styles
  
