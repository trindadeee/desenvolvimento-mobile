import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageBack: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    productContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    productImage: {
      width: 100,
      height: 100,
    },
    productName: {
      fontSize: 18,
      color: '#236B8E',
      fontWeight: 'bold',
      marginTop: 10,
    },
    productQuantity: {
      fontSize: 15,
      color: '#236B8E',
      fontWeight: 'bold',
    },
    total: {
      fontSize: 20,
      color: '#236B8E',
      fontWeight: 'bold',
      marginTop: 20,
    },
  });
  
export default styles;