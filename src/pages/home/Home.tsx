import React from 'react'
import { ScrollView, Text, View,Button } from 'react-native';
import { Card }  from 'react-native-elements';
import { products } from '../../api/products';

const Home = () => {
  return (
    <ScrollView>
      {
        products.map((product, i) => (
          <Card>
            <Card.Title>{product.name}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri:product.image}}/>
            <View style={{flexDirection:'row', alignSelf:'center', marginBottom:'8%', marginTop:'3%'}}>
              <Text style={{fontSize:18, marginEnd:'5%'}}>Preço: {product.price}</Text>
              <Text style={{fontSize:18}}>Quantidade: {product.quantity}</Text>
            </View>
            <Button title='Adicionar ao Carrinho'></Button>
          </Card>
        ))
      }

    </ScrollView>
  );
};

export default Home;
