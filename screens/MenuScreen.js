import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const MenuItem = ({ label, onPress, isFirst }) => (
  <TouchableOpacity
    style={[styles.item, isFirst && styles.itemFirst]}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <Text style={styles.itemText}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

export default function MenuScreen({ navigation }) {
  const { t } = useApp();

  const items = [
    { key: 'home',      label: t.home,      onPress: () => navigation.navigate('Result') },
    { key: 'info',      label: t.info,      onPress: () => navigation.navigate('Info') },
    { key: 'terms',     label: t.terms,     onPress: () => navigation.navigate('Terms') },
    { key: 'privacy',   label: t.privacy,   onPress: () => navigation.navigate('Privacy') },
    { key: 'language',  label: t.language,  onPress: () => navigation.navigate('Language') },
    { key: 'donations', label: t.donations, onPress: () => navigation.navigate('Donations') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.header}>
        <Text style={styles.title}>{t.menu}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {items.map((item, index) => (
          <MenuItem
            key={item.key}
            label={item.label}
            onPress={item.onPress}
            isFirst={index === 0}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  closeBtn: { padding: 6 },
  closeText: { fontSize: 20, color: '#999' },

  list: { paddingTop: 8 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemFirst: {
    borderTopWidth: 0,
  },
  itemText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  arrow: { fontSize: 22, color: '#CCC' },
});
