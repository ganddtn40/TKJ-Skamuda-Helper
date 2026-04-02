import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { STRAIGHT_CABLE, CROSS_CABLE_A, CROSS_CABLE_B, WireDetails } from '../data/lan';
import Header from '../components/Header';

export default function LANGuideScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <Header title="LAN Cable Guide" subtitle="Urutan Wiring Kabel UTP" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <CableCard
            title="KABEL STRAIGHT"
            description="Standar T568B di kedua ujung. Dipakai untuk PC ke Switch atau Router ke Switch."
            data1={STRAIGHT_CABLE}
            data2={STRAIGHT_CABLE}
            label1="UJUNG A"
            label2="UJUNG B"
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
          <CableCard
            title="KABEL CROSSOVER"
            description="Ujung A (T568B) & Ujung B (T568A). Dipakai untuk PC ke PC atau Switch ke Switch."
            data1={CROSS_CABLE_A}
            data2={CROSS_CABLE_B}
            label1="UJUNG A"
            label2="UJUNG B"
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function CableCard({
  title,
  description,
  data1,
  data2,
  label1,
  label2,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{description}</Text>

      <View style={styles.tableHeader}>
        <View style={styles.pinCol}><Text style={styles.colLabel}>PIN</Text></View>
        <View style={styles.wireCol}><Text style={styles.colLabel}>{label1}</Text></View>
        <View style={styles.wireCol}><Text style={styles.colLabel}>{label2}</Text></View>
      </View>

      {data1.map((wire: any, idx: number) => (
        <View key={wire.id} style={[styles.tableRow, idx % 2 === 0 && styles.rowEven]}>
          <View style={styles.pinCol}><Text style={styles.pinText}>{wire.id}</Text></View>
          <WireCell wire={wire} />
          <WireCell wire={data2[idx]} />
        </View>
      ))}
    </View>
  );
}

function WireCell({ wire }: { wire: WireDetails }) {
  return (
    <View style={styles.wireCol}>
      <View style={styles.wireCellInner}>
        <View style={[styles.colorDot, { backgroundColor: wire.hex }]} />
        <Text style={styles.wireText} numberOfLines={1}>{wire.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 8 },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 2,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 11,
    color: '#888888',
    lineHeight: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
  },
  colLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    letterSpacing: 2,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 2,
    alignItems: 'center',
  },
  rowEven: { backgroundColor: 'rgba(255,255,255,0.4)' },
  pinCol: { width: 36, alignItems: 'center' },
  wireCol: { flex: 1, paddingHorizontal: 4 },
  pinText: { fontSize: 13, fontWeight: '900', color: '#000000', fontVariant: ['tabular-nums'] },
  wireCellInner: { flexDirection: 'row', alignItems: 'center' },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  wireText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    flexShrink: 1,
  },
});
