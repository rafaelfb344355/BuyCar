import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


const Home = ({navigation, route}) => {
  
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    fetchCarros();
  }, [carros]);

  const fetchCarros = async () => {
    try {
      const response = await fetch('http://192.168.101.3:3000/Car');
      const data = await response.json();
      setCarros(data.cars); // Acessa a propriedade "cars"
    } catch (error) {
      console.error('Erro ao buscar os carros:', error);
    }
  };

  const renderCarCard = ({ item }) => {
    return ( 
        <Card
      style={styles.card}
      onPress={() => navigation.navigate('Car', { item })}
    >
      <View style={styles.cardView}>
      <Image
            style={{ width: 70, height: 70,  }}
            source={{ uri: item.picture }}
          />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{item.modelo}</Text>
          <Text style={styles.subtitle}>{item.fabricante}</Text>
        </View>
      </View>
    </Card>
  );
};

  return (
     <View style={{  flex: 1 }}>
    <LinearGradient
        colors={["rgb(132, 0, 255)", "#6bc1ff"]}
        style={{ flex: 1  }}
      >
      <View style={styles.content}>
        {carros.length > 0 ? (
          <FlatList
            data={carros}
            keyExtractor={(item, index) => item._id}
            renderItem={renderCarCard}
          />
        ) : (
          <Text style={styles.noCarsText}>Nenhum carro encontrado.</Text>
        )}
        <FAB
          onPress={() => navigation.navigate('Map')}
          style={styles.fab1}
          small={false}
          icon="map"
          theme={{ colors: { accent: '#006aff' } }}
        />
         <FAB
          onPress={() => navigation.navigate('Create')}
          style={styles.fab}
          small={false}
          icon="plus"
          theme={{ colors: { accent: '#006aff' } }}
        /> 
      </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    // Ponto final do gradiente (x, y)
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  noCarsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab1: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});

export default Home;
