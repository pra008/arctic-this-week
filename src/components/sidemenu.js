import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  menuItemContainer: {
    marginTop: 20,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'knile-semibold',
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
});

export default function SideMenu({ navigation }) {
  return (
    <View>
      {/* About Us */}
      <TouchableOpacity onPress={() => navigation.navigate('AllNews')}>
        <View style={styles.menuItemContainer}>
          <Image style={styles.menuIcon} source={require('../images/logo.png')} />
          <Text style={styles.menuItem}>The Artic This Week</Text>
        </View>
      </TouchableOpacity>
      {/* About Us */}
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <View style={styles.menuItemContainer}>
          <Image style={styles.menuIcon} source={require('../images/about.png')} />
          <Text style={styles.menuItem}>About The Arctic Institute</Text>
        </View>
      </TouchableOpacity>

      {/* Contact */}
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <View style={styles.menuItemContainer}>
          <Image style={styles.menuIcon} source={require('../images/message.png')} />
          <Text style={styles.menuItem}>Contact</Text>
        </View>
      </TouchableOpacity>
      {/* Privacy Policy */}
      <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
        <View style={styles.menuItemContainer}>
        <Image style={styles.menuIcon} source={require('../images/privacy.png')} />
          <Text style={styles.menuItem}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}