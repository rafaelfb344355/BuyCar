
import * as Linking from 'expo-linking';
import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'


const  Spotify= () => {
  
  const playSong =(track)=> {
    Linking.openURL('spotify:'+ track);
    }
          return (
<View style={{flex: 1}}>
<LinearGradient
        colors={["rgb(132, 0, 255)", "#6bc1ff"]}
        style={{ flex: 1  }}
      >
            <ScrollView contentContainerStyle={styles.container}>
              <TouchableOpacity onPress={() => playSong('track:405HNEYKGDifuMcAZvqrqA')}>
                <ImageBackground
                  source={require('../assets/post_musica1.png')} // Substitua pelo caminho da imagem desejada
                  style={styles.card}
                  resizeMode="cover"
                >
                  <View style={styles.cardContent}>
                    
                  <Text style={styles.title}>Clair De Lune</Text>
                      <Text style={styles.subtitle}>Martin Jones</Text>
                  
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playSong('track:0VjIjW4GlUZAMYd2vXMi3b')}>
                <ImageBackground
                  source={require('../assets/post_musica2.jpg')} // Substitua pelo caminho da imagem desejada
                  style={styles.card}
                  resizeMode="cover"
                >
                  <View style={styles.cardContent}>
                  
                      <Text style={styles.title}>Blinding Lights</Text>
                      <Text style={styles.subtitle}>The Weeknd</Text>
                    
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playSong('track:0LcnCsepae3WOXMIa96Aok')}>
                <ImageBackground
                  source={require('../assets/post_musica3.jpg')} // Substitua pelo caminho da imagem desejada
                  style={styles.card}
                  resizeMode="cover"
                >
                  <View style={styles.cardContent}>
                    
                      <Text style={styles.title}>Haha, Hi</Text>
                      <Text style={styles.subtitle}>BoyWithUke</Text>
                    
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playSong('track:3KkXRkHbMCARz0aVfEt68P')}>
                <ImageBackground
                  source={require('../assets/post_musica4.jpg')} // Substitua pelo caminho da imagem desejada
                  style={styles.card}
                  resizeMode="cover"
                >
                  <View style={styles.cardContent}>
                    
                      <Text style={styles.title}>Sunflower</Text>
                      <Text style={styles.subtitle}>Post Malone</Text>
                    
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>
            </LinearGradient>
            </View>
          );
        }
        
        const styles = StyleSheet.create({
          container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          card: {
            width: 300,
            height: 350,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          },
          cardContent: {
            
            flex: 1,
            marginTop:'80%',
            padding: 16,
            alignItems: 'center',
          },
          title: {
            color:'rgb(0, 153, 255)',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            
          },
          subtitle: {
            color:'rgb(0, 153, 255)',
            fontSize: 16,
            marginBottom: 6,
            marginLeft: 8,
          },
        });
        

export default Spotify;