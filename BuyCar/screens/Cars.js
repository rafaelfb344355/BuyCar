import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

const Cars = (props) => {
  const { _id, fabricante, modelo, ano, valor, picture } = props.route.params.item;

  const deleteCar = () => {
    fetch("http://192.168.101.3:3000/Car/delete", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id
      })
    })
      .then(res => res.json())
      .then(deletedCar => {
        Alert.alert(`${deletedCar.modelo} foi deletado!`);
        props.navigation.navigate("Home");
      })
      .catch(err => {
        Alert.alert("Alguma coisa deu errado");
      });
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["rgb(132, 0, 255)", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: -50 }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{fabricante}</Title>
      </View>
      <View style={{ alignItems: "center", margin: 18 }}>
        <Title>{modelo}</Title>
      </View>
      <Card style={styles.mycard}>
      <View style={styles.cardContent}>
          <Text style={styles.mytext}>Ano: {ano}</Text>
        </View>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.mytext}>{valor}</Text>
        </View>
      </Card>
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            props.navigation.navigate("CreateCar", {
              _id,
              fabricante,
              modelo,
              ano,
              valor,
              picture
            });
          }}>
          Editar
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => deleteCar()}>
          Deletar
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff"
  }
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  mycard: {
    margin: 3
  },
  cardContent: {
    flexDirection: "row",
    padding: 8
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5
  }
});

export default Cars;
