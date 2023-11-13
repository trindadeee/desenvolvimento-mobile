import React, { useState } from 'react'
import { ScrollView, Text, View,Button, ToastAndroid, Pressable } from 'react-native';
import { Card }  from 'react-native-elements';
import { products } from '../api/product';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/AntDesign';

const Home = ({shoppingCart, setShoppingCart, favorites, setFavorites}: any) => {
  const openToast = (message: string) => {
    ToastAndroid.show(message,3000)
  }
  const removeFavorite = (product: any) => {
    for(let i = 0; favorites.length; i++) {
      if (favorites[i] === product.name) {
        delete favorites[i]
      }
    }
  }
  const toggleFavorite = (product : any) => {
    const isFavorite = favorites.some ((fav : any) => fav.name === product.name);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav:any) => fav.name !== product.name);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, product])
    }
  }
  return (
    <ScrollView>
      <StatusBar backgroundColor='black'/>
      {
        products.map((product, i) => {
          const [favorite, setFavorite] = useState(false)
          return (
            <Card key={i}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri:product.image}} style={{width: '50%'}}/>
                <View style={{flexDirection:'row', alignSelf:'center', marginBottom:'8%', marginTop:'3%'}}>
                  <Text style={{fontSize:16, marginEnd:'5%'}}>Preço: {product.price}</Text>
                  <Text style={{fontSize:16}}>Quantidade: {product.quantity}</Text>
                </View>
                {
                  favorite ?
                  <Icon onPress={() => {removeFavorite(product),toggleFavorite(product), setFavorite(false)}} name = 'heart' size={28} color='red'></Icon>:
                  <Icon onPress={() => {setFavorites([...favorites,product]),toggleFavorite(product), setFavorite(true)}} name = 'hearto' size={28}></Icon>
                }
                {/*<Button onPress={() => {
                  openToast('Item Adcionado com Sucesso!')
                  setShoppingCart([...shoppingCart, product])
                }} title='Adicionar ao Carrinho'></Button>*/}

                <Pressable 
                  onPress={() => {
                    openToast('Item Adcionado com Sucesso!')
                    setShoppingCart([...shoppingCart, product]);
                }}
                  
                style= {
                  ({pressed}: any) => (
                    {
                      backgroundColor: pressed ? '#7FFF00' : '#2196F3',
                      height: 40,
                      justifyContent:'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      marginBottom: 10
                    }
                  )
                }
                >
                  <Text style={{ fontSize: 18, color: '#f0f' }}>Adicionar ao Carrinho</Text>
                </Pressable>
                <Pressable
                  onPress={(navigation:any) => {
                    openToast('Visualizando Favoritos');
                    toggleFavorite(product);
                    setFavorite(!favorite);
                    navigation.navigate('favorites')
                    }}
                  style= {
                    ({pressed}: any) => (
                      {
                        backgroundColor: pressed ? '#7FFF00' : '#2196F3',
                        height: 40,
                        justifyContent:'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        
                      }
                    )
                  }>
                    <Text style={{ fontSize: 18, color: '#f0f' }}>Meus Favoritos</Text>
                  
                </Pressable>
              </Card>
          )
        })
      }
    </ScrollView>

  );
};

export default Home;