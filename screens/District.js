import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

// Updated fetch function to handle filtering
const getDistrictData = async state => {
  const response = await fetch(
    'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions',
  );
  const data = await response.json();
  // Filter data by state
  return data.data.filter(item => item.state === state);
};

const District = () => {
  const route = useRoute();
  const {state} = route.params;
  const [district, setDistrict] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch and filter data when state changes
    getDistrictData(state)
      .then(data => {
        const uniqueDistrict = [...new Set(data.map(item => item.district))];
        setDistrict(
          uniqueDistrict.map(districtName => ({
            district: districtName,
          })),
        );
      })
      .catch(err => {
        console.warn(err);
      });
  }, [state]);

  const handlePress = districtName => {
    navigation.navigate('Municipality', {
      district: districtName,
    });
  };

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
          Districts of {state}
        </Text>
      </View>
      {district.map((item, index) => (
        <TouchableOpacity
          onPress={() => handlePress(item.district)}
          key={index}
          style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.district}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default District;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    width: '100%',
    padding: 10,
    height: 50,
    backgroundColor: '#273c75',
    borderRadius: 8,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
