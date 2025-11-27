import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, SectionList, StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda do dia</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.userText}>Felipe Battarra</Text>
        <Text style={styles.userText}> 5 ENGS</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Meus compromissos" 
          onPress={() => navigation.navigate('MeusCompromissos')} 
          color="#808080"
        />
        <View style={{height: 15}} />
        <Button 
          title="Compromissos da equipe" 
          onPress={() => navigation.navigate('CompromissosEquipe')} 
          color="#808080"
        />
      </View>
    </View>
  );
}

const DATA_MEUS = [
  { id: '1', hora: '09h30', desc: 'Reunião "Daily"' },
  { id: '2', hora: '14h00', desc: 'Reunião com cliente Carros & Carros' },
  { id: '3', hora: '16h30', desc: 'Prazo final Projeto X' },
];

function MeusCompromissosScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
         <Text style={styles.screenTitle}>(Eu)</Text>
         <Text style={styles.screenSubtitle}>Felipe Battarra</Text>
         <Text style={styles.screenSubtitle}>5 ENGS</Text>
      </View>

      <FlatList
        data={DATA_MEUS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.hora}: {item.desc}
          </Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const DATA_EQUIPE = [
  {
    title: 'Jurema (chefe)',
    data: [
      { hora: '09h30', desc: 'Reunião "Daily"' },
      { hora: '12h00', desc: 'Almoço com a diretoria' },
      { hora: '15h00', desc: 'Saída viagem' },
    ]
  },
  {
    title: 'Aderbal',
    data: [
      { hora: '09h30', desc: 'Reunião "Daily"' },
      { hora: '13h30', desc: 'Visita técnica Uni-FACEF' },
      { hora: '16h30', desc: 'Prazo final Projeto X' },
    ]
  }
];

function CompromissosEquipeScreen() {
  return (
    <View style={styles.screenContainer}>
       <View style={styles.headerContainer}>
         <Text style={styles.screenTitle}>(Eu)</Text>
         <Text style={styles.screenSubtitle}>Felipe Battarra</Text>
         <Text style={styles.screenSubtitle}>5 ENGS</Text>
      </View>

      <SectionList
        sections={DATA_EQUIPE}
        keyExtractor={(item, index) => item.hora + index}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.hora}: {item.desc}
          </Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MeusCompromissos" component={MeusCompromissosScreen} options={{ title: 'Meus compromissos' }} />
        <Stack.Screen name="CompromissosEquipe" component={CompromissosEquipeScreen} options={{ title: 'Compromissos da equipe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    width: '80%',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    padding: 5,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center', // Pra centralizara imagem
  },
});