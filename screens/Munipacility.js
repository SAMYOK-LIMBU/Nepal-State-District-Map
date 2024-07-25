import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

// Fetch data and filter by district
const getMunicipalitiesData = async district => {
  const response = await fetch(
    'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions',
  );
  const data = await response.json();
  // Filter data by district
  return data.data.filter(item => item.district === district);
};

const Municipality = () => {
  const route = useRoute();
  const {district} = route.params; // Correct parameter name for district
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    // Fetch and filter data when district changes
    getMunicipalitiesData(district)
      .then(data => {
        const uniqueMunicipalities = [
          ...new Set(data.map(item => item.municipality)),
        ];
        setMunicipalities(
          uniqueMunicipalities.map(municipalityName => ({
            municipality: municipalityName,
          })),
        );
      })
      .catch(err => {
        console.warn(err);
      });
  }, [district]);

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
          Municipalities in {district}
        </Text>
      </View>
      {municipalities.map((item, index) => (
        <TouchableOpacity key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.municipality}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Municipality;

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
