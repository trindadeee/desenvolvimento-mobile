import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, Image, Pressable, ScrollView } from 'react-native';
import styles from './ShoppingStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCart = ({ route, navigation }: any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const baseURL = 'http://10.5.0.33:3000';

  const [cart, setCart] = useState(route.params.shoppingCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateTotal(cart);
    setCart(route.params.shoppingCart);
  }, [route.params.shoppingCart]);

  const updateTotal = (updatedCart: any[]) => {

    const newTotal = updatedCart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
    setTotal(newTotal);
  };

  const updateQuantity = (id: number, increment: number) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item._id === id);

    if (index !== -1) {
      updatedCart[index].quantity += increment;

      if (updatedCart[index].quantity <= 0) {
        updatedCart.splice(index, 1);
      }

      setCart(updatedCart);
      updateTotal(updatedCart);
      navigation.setParams({ shoppingCart: updatedCart });
    }
  };

  const handleBuy = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      await fetch(`${baseURL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          products: cart
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ImageBackground
        source={{ uri: backgroundImageUrl }}
        style={styles.imageBack}
      >
      <ScrollView>
        {cart.map((prod: any) => (
          prod.quantity > 0 && (
            <View key={prod._id} style={{ alignItems: 'center', marginVertical: 10, backgroundColor: 'white', marginHorizontal: 20, borderRadius: 15, padding: 10 }}>
              <Image source={{ uri: prod.image }} style={{ width: 100, height: 100 }} />
              <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold', marginTop: 10 }}>{prod.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                    height: 30,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 18,
                    marginRight: 8,
                  })}
                  onPress={() => updateQuantity(prod._id, -1)}
                >
                  <Text style={{ fontSize: 18, color: '#FFFFFF' }}>-</Text>
                </Pressable>
                <Text style={{ fontSize: 15, color: '#236B8E', fontWeight: 'bold' }}>Quantidade: {prod.quantity}</Text>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                    height: 30,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 18,
                    marginLeft: 8,
                  })}
                  onPress={() => updateQuantity(prod._id, 1)}
                >
                  <Text style={{ fontSize: 18, color: '#FFFFFF' }}>+</Text>
                </Pressable>
              </View>
            </View>
          )
        ))}
      </ScrollView>
      </ImageBackground>
      {cart.length > 0 ? (
        <>
          <View style={[styles.totalContainer, { alignSelf: 'center' }]}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          </View>
          <View style={{ alignSelf: 'center', marginBottom: 27 }}>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#95CEDF' : '#236B8E',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 10,
                height: 40,
                width: 200,
              })}
              onPress={() => {
                handleBuy();
                navigation.navigate('orders', { shoppingCart: cart, total });
              }}
            >
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Finalizar Compra</Text>
            </Pressable>
          </View>
        </>
      ) : null}

    </>
  );
};

export default ShoppingCart;
