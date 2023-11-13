import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const ShoppingCart = ({ route, navigation }: any) => {
  const { shoppingCart } = route.params;

  const removeItem = (index: number) => {
    const updatedCart = [...shoppingCart];
    updatedCart.splice(index, 1);
    // Atualizar o carrinho com o item removido
    navigation.setParams({ shoppingCart: updatedCart });
  };

  const updateItem = (index: number, updatedQuantity: number) => {
    const updatedCart = [...shoppingCart];
    updatedCart[index].quantity = updatedQuantity;
    // Atualizar o carrinho com a quantidade atualizada
    navigation.setParams({ shoppingCart: updatedCart });
  };

  return (
    <>
      {shoppingCart.map((prod: any, i: number) => (
        <View style={{ marginTop: 10, marginBottom: 10 }} key={i}>
          <Text>{prod.name}</Text>
          {/* Adicionar botão de remover */}
          <Button title="Remover Item" onPress={() => removeItem(i)} />
          {/* Adicionar botão de atualizar quantidade */}
          
        </View>
      ))}
    </>
  );
}

export default ShoppingCart;