import React, { useState } from 'react';
import { ImageBackground, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../login/LoginStyle';

const ShoppingCart = ({ route, navigation }: any) => {
  const { shoppingCart } = route.params;

  const removeItem = (index: number) => {
    const updatedCart = [...shoppingCart];
    const itemToRemove = updatedCart[index];

    if (itemToRemove.quantity > 1) {
      itemToRemove.quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    navigation.setParams({ shoppingCart: updatedCart });
  };

  return (
    <ImageBackground style={styles.imageBack} source={require('pharmacy-mobile/assets/farmBackground.jpg')}>
      <>
        {shoppingCart.map((prod: any, i: number) => (
          <View key={i} style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Image source={{ uri: prod.image }} style={{ width: 100, height: 100 }} />
            <Text>{prod.name}</Text>
            <Text>Quantidade: {prod.quantity}</Text>
            <View style={{ margin: 10, width: '95%' }}>
              <Button title="Remover Item" onPress={() => removeItem(i)} />
            </View>
          </View>
        ))}
      </>
    </ImageBackground>
  );
};

export default ShoppingCart;
