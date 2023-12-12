import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10
    },
    imageBack: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#236B8E',
      marginTop: 5 ,
      marginLeft: 5
    },
    productItem: {
      width: '45%',
      marginVertical: 10,
    },
    productContainer: {
      flexDirection:'row',
      flexWrap: 'wrap',
      justifyContent:'space-around'
    },
    productImage: {
      width: 100,
      height: 100,
    },
    productName: {
      fontSize: 13,
      marginBottom: 2,
      color: '#236B8E',
      fontWeight: 'bold'
    },
    productQuantity: {
      fontSize: 13,
      color: '#236B8E',
      fontWeight: 'bold',
    },
    total: {
      fontSize: 15,
      color: '#236B8E',
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'center'
    },
  });
  
export default styles;