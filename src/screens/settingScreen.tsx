import {  View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen () {
  const navigation = useNavigation();
  return (
    <View style={css.container}>
      <Text>Settings</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()}/>
    </View>
  );
}

const css = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});