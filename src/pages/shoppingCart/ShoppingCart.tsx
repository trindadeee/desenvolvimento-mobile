import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';

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
    console.log(updatedCart)
    navigation.setParams({ shoppingCart: updatedCart });
  };


  return (
    <>
      {shoppingCart.map((prod: any, i: number) => (
        <View style={{ marginTop: 10, marginBottom: 10 }} key={i}>
          <Text>{prod.name}</Text>
          <Text>quantidade: {prod.quantity}</Text>
          <Button title="Remover Item" onPress={() => removeItem(i)} />
          
        </View>
      ))}
    </>
  );
}

export default ShoppingCart;