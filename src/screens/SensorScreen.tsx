import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SENSOR_DATA, Sensor } from '../data/sensors';
import Header from '../components/Header';

export default function SensorScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <Header title="Kamus Sensor" subtitle="Wiring Komponen Dasar IoT" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {SENSOR_DATA.map((sensor, index) => (
          <SensorCard key={sensor.id} sensor={sensor} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function SensorCard({ sensor, index }: { sensor: Sensor; index: number }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 120).duration(500).springify()}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{sensor.name}</Text>
      <Text style={styles.cardDesc}>{sensor.description}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DETAIL PINOUT</Text>
        <View style={styles.pinTable}>
          {sensor.pins.map((pin, idx) => (
            <View key={idx} style={[styles.pinRow, idx % 2 === 0 && styles.pinRowEven]}>
              <Text style={styles.pinName}>{pin.name}</Text>
              <Text style={styles.pinDesc}>{pin.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKEMA WIRING</Text>
        <View style={styles.wiringBox}>
          <Text style={styles.wiringText}>{sensor.wiring}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 8 },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  cardDesc: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    marginBottom: 12,
    letterSpacing: 2,
  },
  pinTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pinRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pinRowEven: {
    backgroundColor: '#F8FAFC',
  },
  pinName: {
    width: 60,
    fontSize: 13,
    fontWeight: '800',
    color: '#000000',
  },
  pinDesc: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  wiringBox: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 16,
  },
  wiringText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
