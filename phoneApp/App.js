import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Button} from 'react-native';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { Navigation } from 'react-native-navigation';

const sandyBrown = '#F89F5B';
const cerise = '#E53F71';
const redViolet = '#9c3587';
const daisy = '#653780';
const paua = '#3F1651';

const HomeScreen = (props) => {

  function scan(){
    alert('Starting to Scan');
    Navigation.push(props.componentId, {
      component: {
        name: 'Scan'
      }
    });
  }

  function listen(){
    alert('Starting Listener')
    return
  }

  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={scan}>
        <Text style={styles.buttonText}>{'Scan'}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={listen}>
        <Text style={styles.buttonText}>{'Listen'}</Text>
      </Pressable>

    </View>
  );
}

const ScanningScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Scanning Screen</Text>
    </View>
  );
}


Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Scan', () => ScanningScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});

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
    width:'50%',
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

export default HomeScreen;
