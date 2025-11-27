

import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // Estado começa NULO (sem foto do usuário)
  const [imagem, setImagem] = useState(null); 

  // URL de um avatar genérico (bonequinho cinza) para quando não tiver foto
  const avatarPadrao = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  async function abrirCamera() {
    if (!permission?.granted) {
      const resposta = await requestPermission();
      if (!resposta.granted) return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true, // Importante: permite cortar a foto quadrada
      aspect: [1, 1],      // Força o corte quadrado para ficar bonito no círculo
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  async function abrirGaleria() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      {/* LÓGICA DO PASSO 7: Mostra imagem do usuário OU o avatar padrão */}
      <Image 
        source={{ uri: imagem ? imagem : avatarPadrao }} 
        style={styles.avatar} // Estilo de círculo aplicado aqui
      />

      <View style={styles.botoes}>
        <Button title="📷 Tirar Foto" onPress={abrirCamera} />
        <View style={{height: 10}} />
        <Button title="🖼️ Galeria" onPress={abrirGaleria} color="purple" />
      </View>
    </View>
  );
}

// Estilos exigidos no Passo 7 (Slide 4 do PDF)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  // O segredo do avatar redondo está aqui:
  avatar: {
    width: 150,        // Largura [cite: 305]
    height: 150,       // Altura [cite: 306]
    borderRadius: 75,  // Metade da largura/altura para ficar redondo [cite: 307]
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  botoes: {
    width: '80%',
  },
});

