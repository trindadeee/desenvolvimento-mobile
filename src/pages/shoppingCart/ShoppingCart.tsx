import React, { useState } from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import styles from '../login/LoginStyle';
import { products } from '../../../api/product';

const ShoppingCart = ({ route, navigation }: any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const goToPage = (path: string) => {
    navigation.navigate(path);
  };

  const updateQuantity = (id: number, increment: number) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === id);

    if (index !== -1) {
      updatedCart[index].quantity += increment;

      if (updatedCart[index].quantity <= 0) {
        updatedCart.splice(index, 1);
      }

      setCart(updatedCart);
      navigation.setParams({ shoppingCart: updatedCart });
    }
  };

  const submitBuy = (products: Array<any>) => {

  }

  return (
    <>
      <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >
        {cart.map((prod: any) => (
          <View key={prod.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginVertical: 10, backgroundColor: 'white', marginHorizontal: 5, borderRadius: 15 }}>
            <Image source={{ uri: prod.image }} style={{ marginVertical: 10, width: 100, height: 100 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 'auto' }}>
              <Pressable
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 18,
                  marginRight: 8,
                })}
                onPress={() => updateQuantity(prod.id, -1)}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>-</Text>
              </Pressable>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 150, justifyContent: 'center' }}>
                <Text style={{ marginVertical: 5 }} >{prod.name}</Text>
                <Text>Quantidade: {prod.quantity}</Text>
              </View>
              <Pressable
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                  height: 40,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 18,
                  marginLeft: 8,
                })}
                onPress={() => updateQuantity(prod.id, 1)}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>+</Text>
              </Pressable>
            </View>
          </View>
        ))}
        { cart.length > 0 ? (
        <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>
        <Pressable
                style={({ pressed }: any) => ({
                backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                height: 40,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 18,
                marginLeft: 8,
              })}
              onPress={() => submitBuy(products)}
            >
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Comprar</Text>
            </Pressable>
        </View>
        ): 
        <View>
          <Text style={{fontSize: 18, marginLeft:'15%' ,marginVertical: '60%'}}>Seu carrinho de compras está vazio</Text>  
        </View>}
      </ImageBackground>
    </>
  );
};

export default CreateAccount;


