import React from 'react';
import styles from './OrderStyle';
import { Image, ImageBackground, Text, View } from 'react-native';

const OrderConfirmation  = ({ route }: any) => {
    const { shoppingCart, total } = route.params;
    const backgroundImageUrl ='https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  
    return (
      <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
      <View style={styles.container}>
        {shoppingCart.map((prod: any) => (
          <View key={prod._id} style={styles.productContainer}>
            <Image source={{ uri: prod.image }} style={styles.productImage} />
            <Text style={styles.productName}>{prod.name}</Text>
            <Text style={styles.productQuantity}>Quantidade: {prod.quantity}</Text>
          </View>
        ))}
        <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      </View>
      </ImageBackground>
    );
  };

export default OrderConfirmation;