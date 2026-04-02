import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SNIPPET_DATA } from '../data/snippets';
import Header from '../components/Header';

export default function SnippetScreen() {
  const insets = useSafeAreaInsets();
  
  const copyToClipboard = (text: string) => {
    Alert.alert('TERSALIN!', 'Kode telah disalin ke papan klip.');
  };

  return (
    <View style={styles.screen}>
      <Header title="IoT Snippets" subtitle="Template Skrip Siap Pakai" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {SNIPPET_DATA.map((snippet, index) => (
          <Animated.View
            key={snippet.id}
            entering={FadeInDown.delay(index * 150).duration(500).springify()}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.titleGroup}>
                <Text style={styles.cardTitle}>{snippet.title.toUpperCase()}</Text>
                <Text style={styles.cardDesc}>{snippet.description}</Text>
              </View>
              <TouchableOpacity style={styles.copyBtn} onPress={() => copyToClipboard(snippet.code)}>
                <Ionicons name="copy-outline" size={18} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{snippet.code}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 8 },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleGroup: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 1,
  },
  cardDesc: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '700',
  },
  copyBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  codeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#000000',
    fontSize: 11,
    lineHeight: 18,
    fontWeight: '500',
  },
});
