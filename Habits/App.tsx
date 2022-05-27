import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [textResult, setResult] = useState("");

  const getTest = async () => {
    const result = await fetch("http://176.10.157.225:5000",{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const res = await result.json();
    setResult(res.message);
  }

  return (
    <View style={styles.container}>
      <Text>{textResult}</Text>
      <TouchableOpacity
        onPress={getTest}
        >
          <Text>Fetch text</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
