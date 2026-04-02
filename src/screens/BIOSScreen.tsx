import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BIOS_CODES, BiosCode } from '../data/bios';
import Header from '../components/Header';

export default function BIOSScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return BIOS_CODES;
    return BIOS_CODES.filter(
      (item) =>
        item.pattern.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [search]);

  const renderItem: ListRenderItem<BiosCode> = ({ item, index }) => (
    <Animated.View 
      entering={FadeInDown.delay((index % 10) * 80).duration(400).springify()}
      style={styles.item}
    >
      <View style={styles.itemHeader}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <Text style={styles.patternText}>{item.pattern}</Text>
      </View>
      <Text style={styles.meaningText}>{item.meaning}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.screen}>
      <Header title="BIOS Beep Codes" subtitle="Referensi AMI & Award" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#D6D6D6" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari kode beep atau arti..."
            placeholderTextColor="#D6D6D6"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#F2F2F2" />
            <Text style={styles.emptyText}>Tidak ditemukan</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: '#000000',
    fontWeight: '700',
  },
  list: { padding: 24, paddingTop: 8 },
  item: {
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  patternText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
  },
  meaningText: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: '#D6D6D6',
    fontWeight: '700',
  },
});
