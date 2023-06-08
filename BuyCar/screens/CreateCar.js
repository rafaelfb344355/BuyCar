import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateCar = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'fabricante':
          return route.params.fabricante;
        case 'modelo':
          return route.params.modelo;
        case 'ano':
          return route.params.ano;
        case 'valor':
          return route.params.valor;
        case 'picture':
          return route.params.picture;
      }
    }
    return '';
  };

  const [fabricante, setFabricante] = useState(getDetails('fabricante'));
  const [modelo, setModelo] = useState(getDetails('modelo'));
  const [ano, setAno] = useState(getDetails('ano'));
  const [valor, setValor] = useState(getDetails('valor'));
  const [picture, setPicture] = useState(getDetails('picture'));
  const [modal, setModal] = useState(false);
  const [enableShift, setEnableShift] = useState(false);

  const submitData = () => {
    fetch('http://192.168.101.3:3000/Car/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fabricante,
        modelo,
        ano,
        valor,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.modelo} foi cadastrado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Alguma coisa deu errado' + err);
      });
  };

  const updateDetails = () => {
    fetch('http://192.168.101.3:3000/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      _id,
        fabricante,
        modelo,
        ano,
        valor,
        picture
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} foi editado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('alguma coisa deu errado');
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert('você precisa de permissão para isso');
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert('você precisa de permissão para isso');
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employeeApp');
    data.append('cloud_name', 'dxnoiuj66');

    fetch('https://api.cloudinary.com/v1_1/dxnoiuj66/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert('erro durante o upload');
      });
  };
  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput
          label="Fabricante"
          style={styles.inputStyle}
          value={fabricante}
          onFocus={() => setEnableShift(false)}
          mode="outlined"
          onChangeText={(text) => setFabricante(text)}
        />
        <TextInput
          label="Modelo"
          style={styles.inputStyle}
          value={modelo}
          onFocus={() => setEnableShift(false)}
          mode="outlined"
          onChangeText={(text) => setModelo(text)}
        />
        <TextInput
          label="Ano"
          style={styles.inputStyle}
          value={ano}
          onFocus={() => setEnableShift(true)}
          mode="outlined"
          onChangeText={(text) => setAno(text)}
        />
        <TextInput
          label="Valor"
          style={styles.inputStyle}
          value={valor}
          onFocus={() => setEnableShift(true)}
          mode="outlined"
          onChangeText={(text) => setValor(text)}
        />
        <Button
          style={styles.inputStyle}
          icon={picture === '' ? 'upload' : 'check'}
          mode="contained"
          onPress={() => setModal(true)}
        >
          Upload de Imagem
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            onPress={() => updateDetails()}
          >
            Atualizar Detalhes
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            onPress={() => submitData()}
          >
            Salvar
          </Button>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                icon="camera"
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Câmera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Galeria
              </Button>
            </View>
            <Button onPress={() => setModal(false)}>Cancelar</Button>
          </View>
        </Modal>
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateCar;
