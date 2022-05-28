import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UserWrapper from './assets/Components/UserWrapper';
import Main from "./assets/Components/Main";

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
    <UserWrapper>
      <View style={styles.container}>
        <Main/>
      </View>
    </UserWrapper>
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
