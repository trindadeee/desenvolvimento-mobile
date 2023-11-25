import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import styles from '../login/LoginStyle';

const ShoppingCart = ({ route, navigation }: any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const [cart, setCart] = useState(route.params.shoppingCart);

  const updateQuantity = (id: number, increment: number) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === id);

    if (index !== -1) {
      updatedCart[index].quantity += increment;

      if (updatedCart[index].quantity <= 1) {
        updatedCart.splice(index, 1);
      }

      setCart(updatedCart);
      navigation.setParams({ shoppingCart: updatedCart });
    }
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item:any) => item.id !== id);
    setCart(updatedCart);
    navigation.setParams({ shoppingCart: updatedCart });
  };

  return (
      <>
      <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >
        {cart.map((prod: any) => (
          <View key={prod.id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Image source={{ uri: prod.image }} style={{ width: 100, height: 100 }} />
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
              <View>
                <Text>{prod.name}</Text>
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
            <Pressable
              style={({ pressed }: any) => ({
                backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                height: 40,
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                marginRight: 20, // Ajuste a margem à esquerda para afastar da borda
              })}
              onPress={() => removeItem(prod.id)}
            >
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Remover</Text>
            </Pressable>
          </View>
        ))}
        </ImageBackground>
      </>
  );
};

export default ShoppingCart;
