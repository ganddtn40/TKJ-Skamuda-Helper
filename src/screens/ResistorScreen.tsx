import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

type BandType = 'digit1' | 'digit2' | 'digit3' | 'multiplier' | 'tolerance';

const COLORS = [
  { name: 'Black', hex: '#000000', val: 0, mult: 1, tol: null },
  { name: 'Brown', hex: '#8B4513', val: 1, mult: 10, tol: 1 },
  { name: 'Red', hex: '#DC2626', val: 2, mult: 100, tol: 2 },
  { name: 'Orange', hex: '#EA580C', val: 3, mult: 1000, tol: null },
  { name: 'Yellow', hex: '#EAB308', val: 4, mult: 10000, tol: null },
  { name: 'Green', hex: '#16A34A', val: 5, mult: 100000, tol: 0.5 },
  { name: 'Blue', hex: '#2563EB', val: 6, mult: 1000000, tol: 0.25 },
  { name: 'Violet', hex: '#7C3AED', val: 7, mult: 10000000, tol: 0.1 },
  { name: 'Gray', hex: '#6B7280', val: 8, mult: null, tol: null },
  { name: 'White', hex: '#FFFFFF', val: 9, mult: null, tol: null },
  { name: 'Gold', hex: '#EAB308', val: null, mult: 0.1, tol: 5 },
  { name: 'Silver', hex: '#94A3B8', val: null, mult: 0.01, tol: 10 },
];

export default function ResistorScreen() {
  const insets = useSafeAreaInsets();
  
  const [b1, setB1] = useState(1);
  const [b2, setB2] = useState(0);
  const [b3, setB3] = useState(0);
  const [mult, setMult] = useState(2);
  const [tol, setTol] = useState(10);

  const [isFiveBand, setIsFiveBand] = useState(false);
  const [activeBand, setActiveBand] = useState<BandType>('digit1');

  const d1 = COLORS[b1].val ?? 0;
  const d2 = COLORS[b2].val ?? 0;
  const d3 = COLORS[b3].val ?? 0;
  const m = COLORS[mult].mult ?? 1;
  const t = COLORS[tol].tol ?? 5;
  
  const ohms = isFiveBand 
    ? ((d1 * 100) + (d2 * 10) + d3) * m
    : ((d1 * 10) + d2) * m;
  
  const formatOhms = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(2)} MΩ`;
    if (val >= 1000) return `${(val / 1000).toFixed(2)} kΩ`;
    return `${val.toFixed(2)} Ω`;
  };

  const getAvailableColors = (band: BandType) => {
    return COLORS.map((c, i) => {
      let isAvailable = false;
      if (band === 'digit1' || band === 'digit2' || band === 'digit3') isAvailable = c.val !== null;
      if (band === 'multiplier') isAvailable = c.mult !== null;
      if (band === 'tolerance') isAvailable = c.tol !== null;
      return { ...c, index: i, isAvailable };
    }).filter(c => c.isAvailable);
  };

  const selectColor = (idx: number) => {
    if (activeBand === 'digit1') setB1(idx);
    if (activeBand === 'digit2') setB2(idx);
    if (activeBand === 'digit3') setB3(idx);
    if (activeBand === 'multiplier') setMult(idx);
    if (activeBand === 'tolerance') setTol(idx);
  };

  return (
    <View style={styles.screen}>
      <Header title="Resistor Calc" subtitle={`Nilai ${isFiveBand ? '5' : '4'}-Gelang`} />
      
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, !isFiveBand && styles.toggleBtnActive]} 
            onPress={() => { setIsFiveBand(false); if(activeBand === 'digit3') setActiveBand('digit2'); }}
          >
            <Text style={[styles.toggleText, !isFiveBand && styles.toggleTextActive]}>4 BANDS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, isFiveBand && styles.toggleBtnActive]} 
            onPress={() => setIsFiveBand(true)}
          >
            <Text style={[styles.toggleText, isFiveBand && styles.toggleTextActive]}>5 BANDS</Text>
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultLabel}>RESISTANSI TOTAL</Text>
            <Text style={styles.resultValue}>{formatOhms(ohms)}</Text>
            <Text style={styles.resultTol}>Toleransi ± {t}%</Text>
          </View>

          <View style={styles.resistorBody}>
            <View style={styles.wire} />
            <View style={styles.bodyCore}>
              <View style={[styles.band, { backgroundColor: COLORS[b1].hex }]} />
              <View style={[styles.band, { backgroundColor: COLORS[b2].hex }]} />
              {isFiveBand && <View style={[styles.band, { backgroundColor: COLORS[b3].hex }]} />}
              <View style={[styles.band, { backgroundColor: COLORS[mult].hex }]} />
              <View style={[styles.bandSpace]} />
              <View style={[styles.band, { backgroundColor: COLORS[tol].hex }]} />
            </View>
            <View style={styles.wire} />
          </View>
        </Animated.View>

        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
            <BandTab label="G1" active={activeBand === 'digit1'} onPress={() => setActiveBand('digit1')} />
            <BandTab label="G2" active={activeBand === 'digit2'} onPress={() => setActiveBand('digit2')} />
            {isFiveBand && <BandTab label="G3" active={activeBand === 'digit3'} onPress={() => setActiveBand('digit3')} />}
            <BandTab label="MULT" active={activeBand === 'multiplier'} onPress={() => setActiveBand('multiplier')} />
            <BandTab label="TOL" active={activeBand === 'tolerance'} onPress={() => setActiveBand('tolerance')} />
          </ScrollView>
        </View>

        <Animated.View entering={FadeIn.delay(200).duration(300)} style={styles.paletteContainer}>
          <Text style={styles.paletteTitle}>PILIH WARNA GELANG</Text>
          <View style={styles.grid}>
            {getAvailableColors(activeBand).map((c) => {
              const isActive = (activeBand === 'digit1' && b1 === c.index) ||
                               (activeBand === 'digit2' && b2 === c.index) ||
                               (activeBand === 'digit3' && b3 === c.index) ||
                               (activeBand === 'multiplier' && mult === c.index) ||
                               (activeBand === 'tolerance' && tol === c.index);
              return (
                <TouchableOpacity 
                  key={c.name} 
                  activeOpacity={0.7}
                  onPress={() => selectColor(c.index)}
                  style={[styles.colorBtn, isActive && styles.colorBtnActive]}
                >
                  <View style={[styles.colorSwatch, { backgroundColor: c.hex, borderWidth: (c.name === 'White' || c.name === 'Silver') ? 1 : 0, borderColor: '#D6D6D6' }]} />
                  <Text style={styles.colorName}>{c.name}</Text>
                  {isActive && <Ionicons name="checkmark-circle" size={16} color="#000000" />}
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.View>

      </ScrollView>
    </View>
  );
}

function BandTab({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.tab, active && styles.tabActive]} onPress={onPress}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 8 },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#D6D6D6',
    letterSpacing: 1,
  },
  toggleTextActive: {
    color: '#000000',
  },
  resultCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  resultLabel: { color: '#D6D6D6', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  resultValue: { color: '#000000', fontSize: 36, fontWeight: '900', marginBottom: 2, letterSpacing: -1 },
  resultTol: { color: '#888888', fontSize: 13, fontWeight: '700' },
  resistorBody: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    width: '100%',
  },
  wire: {
    flex: 1,
    height: 4,
    backgroundColor: '#D6D6D6',
  },
  bodyCore: {
    width: 160,
    height: 44,
    backgroundColor: '#EEE4D1', 
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
  },
  band: { width: 12, height: '100%' },
  bandSpace: { width: 14 },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    width: 72,
    backgroundColor: '#F2F2F2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  tabActive: { backgroundColor: '#000000' },
  tabText: { fontSize: 11, fontWeight: '900', color: '#D6D6D6', letterSpacing: 1 },
  tabTextActive: { color: '#FFFFFF' },
  paletteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  paletteTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    marginBottom: 20,
    letterSpacing: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  colorBtnActive: {
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 8,
    marginRight: 12,
  },
  colorName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000000',
    flex: 1,
  },
});
