import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { OSI_LAYERS, COMMON_PORTS } from '../data/osi';
import Header from '../components/Header';

export default function OSIScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'osi' | 'ports'>('osi');

  return (
    <View style={styles.screen}>
      <Header title="OSI & Port Ref" subtitle="Referensi Layer & Port Jaringan" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'osi' && styles.activeTab]}
          onPress={() => setActiveTab('osi')}
        >
          <Text style={[styles.tabText, activeTab === 'osi' && styles.activeTabText]}>OSI MODEL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ports' && styles.activeTab]}
          onPress={() => setActiveTab('ports')}
        >
          <Text style={[styles.tabText, activeTab === 'ports' && styles.activeTabText]}>COMMON PORTS</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'osi' ? (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>
          {OSI_LAYERS.map((layer, index) => (
            <Animated.View 
              key={layer.level} 
              entering={FadeInDown.delay(index * 100).duration(500).springify()}
              style={styles.card}
            >
              <View style={styles.layerBadge}>
                <Text style={styles.layerLevel}>L{layer.level}</Text>
              </View>
              <View style={styles.layerContent}>
                <Text style={styles.layerName}>{layer.name.toUpperCase()}</Text>
                <Text style={styles.layerDesc}>{layer.description}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>PROTOKOL</Text>
                  <Text style={styles.metaValue}>{layer.protocols}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>HARDWARE</Text>
                  <Text style={styles.metaValue}>{layer.device}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      ) : (
        <Animated.FlatList
          entering={FadeIn.duration(400)}
          data={COMMON_PORTS}
          keyExtractor={(item) => item.port.toString()}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View 
              entering={FadeInDown.delay((index % 10) * 50).duration(400).springify()}
              style={styles.portItem}
            >
              <View style={styles.portNumBadge}>
                <Text style={styles.portNum}>{item.port}</Text>
                <Text style={styles.portProto}>{item.protocol}</Text>
              </View>
              <View style={styles.portContent}>
                <Text style={styles.portName}>{item.name}</Text>
                <Text style={styles.portDesc}>{item.description}</Text>
              </View>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: { fontSize: 11, fontWeight: '900', color: '#D6D6D6', letterSpacing: 1 },
  activeTabText: { color: '#000000' },
  content: { padding: 24 },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  layerBadge: { 
    width: 60, 
    backgroundColor: '#000000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  layerLevel: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  layerContent: { flex: 1, padding: 20 },
  layerName: { fontSize: 16, fontWeight: '900', color: '#000000', marginBottom: 6, letterSpacing: -0.5 },
  layerDesc: { fontSize: 12, color: '#888888', marginBottom: 16, lineHeight: 18, fontWeight: '600' },
  metaRow: { flexDirection: 'row', marginBottom: 6 },
  metaLabel: { fontSize: 10, fontWeight: '900', color: '#D6D6D6', width: 80, letterSpacing: 1 },
  metaValue: { fontSize: 11, color: '#000000', flex: 1, fontWeight: '700' },
  portItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  portNumBadge: {
    width: 64,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 16,
  },
  portNum: { fontSize: 15, fontWeight: '900', color: '#000000' },
  portProto: { fontSize: 9, fontWeight: '900', color: '#D6D6D6', marginTop: 2, letterSpacing: 1 },
  portContent: { flex: 1 },
  portName: { fontSize: 15, fontWeight: '800', color: '#000000', marginBottom: 2 },
  portDesc: { fontSize: 12, color: '#888888', fontWeight: '600' }
});
