import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert} from 'react-native';
import React, { useState } from 'react'

const sandyBrown = '#F89F5B';
const cerise = '#E53F71';
const redViolet = '#9c3587';
const daisy = '#653780';
const paua = '#3F1651';

const App = () => {
  const [getData, setData] = useState('')
  return (
    <View style={styles.container}>

      <Text style={styles.textField}>Ultrasonic Covert Communications Mobile Receiver</Text>

      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.textInput}
        placeholder='Enter Messages to Send'
        onChangeText= {(data) => setData(data)}
        defaultValue={getData}
      ></TextInput>


      <Pressable style={styles.button} onPress={ () => {
        Alert.alert('Proceeding to Send Data');
      }
      }>
        <Text style={styles.buttonText}>Send Data</Text>
      </Pressable>

     
      <Pressable style={styles.button} onPress={ () => {
        Alert.alert('Starting Listener');
      }
      }>
        <Text style={styles.buttonText}>Scan Infections</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cerise,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: cerise,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: daisy,
    margin: 30,
    width:'60%'
  },

  textInput: {
      margin: 30,
      height: '25%',
      width: '80%',
      borderColor: paua,
      borderWidth: 1,
      backgroundColor: sandyBrown,
      color: redViolet,
      opacity: 0.7  ,
  },

  textField: {
    fontSize: 25,
    textAlign: 'center',
    margin: 25,
    color: daisy,
  },

});

export default App;
