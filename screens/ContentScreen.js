import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function ContentScreen({ navigation, title, content }) {
  const { t } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <Text style={styles.backText}>‹  {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { marginBottom: 12 },
  backText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: 24,
    paddingBottom: 56,
  },
  content: {
    fontSize: 15,
    lineHeight: 26,
    color: '#444',
    fontFamily: 'Inter_400Regular',
  },
});
