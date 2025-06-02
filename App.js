import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-web';
import { PickerItem } from './src/Picker';

export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState("");

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

    useEffect(()=> {
      async function loadMoedas() {
      const response = await AppRegistry.get("all");
      let arrayMoedas = [];
      Object.keys(response.data).map( (key) => {
        arrayMoedas.push({
          key : key,
          label: key,
          value: key,
        })
      })
    setMoedas(arrayMoedas);
    setMoedaSelecionada(arrayMoedas[0].key);
    setLoading(false);
    }
    loadMoedas ();
  }, [])

  async function convert(){
    if(moedaBValor === 0 || moedaBValor === "" || moedaBValor === null){
      return;
    }
    const response = await api.get(`/all/${moedaSelecionada}-BRL`);
    console.log(response.data[moedaSelecionada].ask);

    let resultado = (response.data[moedaSelecionada].ask
      * parseFloat(moedaBValor));
    setValorConvertido(`${resultado.toLocaleString("pt-BR",
      {style:"currency",currency: "BRL"}
      )}`);
      setValorMoeda(moedaBValor);
      Keyboard.dismisss();
    }

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#101215'}}>
        <ActivityIndicator color= '#FFF' size="large"/>
      </View>
    )
  }


return (
  <View style={styles.container}>
    <View style={styles.areaMoeda}>
      <Text style={styles.titulo}>Selecione um moeda</Text>
      <PickerItem
        moedas={moedas}
        moedaSelecionada={moedaSelecionada}
        onChange={ (moeda) => setMoedaSelecionada(moeda)} />
    </View>
      <View style={styles.areaValor}>
        <Text style={style.titulo}>Digite um valor para converter (R$)</Text>
        <TextInput
          placeholder="EX: 1.50"
          style={styles.input}
          KeyboardType="numeric"
          value={moedaBValor}
          onChangeText={(valor) => setMoedaBValor (valor)} />
      </View> 

      <TouchableOpacity style={styles.botaoArea} onPress={converter}>
        <Text style={styles.botaoText}>Converter</Text>
      </TouchableOpacity> 
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
