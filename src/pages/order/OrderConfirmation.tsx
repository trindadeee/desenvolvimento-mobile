import React, { useEffect, useState } from 'react';
import styles from './OrderStyle';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderConfirmation = ({ route }: any) => {
  const { shoppingCart, total } = route.params;
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';
  const [history, setHistory] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const baseURL = 'http://10.5.0.33:3000';

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const request = await fetch(`${baseURL}/list-history?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await request.json()
      await setProducts(response[0].products)
      await setHistory(response);
      await clearOrders();
    } catch (err) {
      console.error(err)
    }
  }

    const clearOrders = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      await fetch(`${baseURL}/clear-orders`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        })
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.imageBack}>
      <ScrollView>
        <Text style={styles.title}>Pedido ativo</Text>
        <View style={styles.container}>
          <View style={styles.productContainer}>
            {shoppingCart.map((prod: any) => (
              <View key={prod._id} style={styles.productItem}>
                {/* <Image source={{ uri: prod.image }} style={styles.productImage} /> */}
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productQuantity}>Quantidade: {prod.quantity}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
        </View>
        <Text style={styles.title}>Histórico de pedidos</Text>
        {history.map((order: any) => (
          <View key={order._id}>
            {/* <Text>{order._id}</Text> */}
            <View style={styles.container}>
              <View style={styles.productContainer}>
                {order.products.map((prod: any) => (
                  <View key={prod._id}>
                    {/* <Image source={{ uri: prod.image }} style={styles.productImage} /> */}
                    <Text style={styles.productName}>{prod.name}</Text>
                    <Text style={styles.productQuantity}>Quantidade: {prod.quantity}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.total}>Total R$: {order.totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        ))}



      </ScrollView>
    </ImageBackground>
  );
};

export default OrderConfirmation;