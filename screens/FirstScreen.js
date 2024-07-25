import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const getData = async () => {
  const response = await fetch(
    'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions',
  );
  const data = await response.json();
  return data.data;
};

const FirstScreen = () => {
  const [items, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData()
      .then(data => {
        const sameState = new Set();
        const uniqueState = data.filter(item => {
          if (sameState.has(item.state)) {
            return false;
          } else {
            sameState.add(item.state);
            return true;
          }
        });
        setData(uniqueState);
        console.log(uniqueState);
      })
      .catch(err => {
        console.warn(err);
      });
  }, []);

  return (
    <ScrollView style={{marginTop: 20}}>
      <View style={{textAlign: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
          }}>
          States
        </Text>
      </View>

      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('District', {state: item.state})}
          style={styles.container}>
          <Text style={styles.textStyle}>{item.state}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {margin: 10, alignItems: 'center'},
  textStyle: {
    textAlign: 'center',
    width: '100%',
    padding: 10,
    height: 50,
    backgroundColor: '#273c75',
    borderRadius: 8,
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
