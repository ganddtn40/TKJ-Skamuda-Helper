import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { PINOUT_DATA } from '../data/pinouts';
import Header from '../components/Header';

export default function PinoutScreen() {
  const insets = useSafeAreaInsets();
  const [activeBoard, setActiveBoard] = useState<string>(PINOUT_DATA[0].id);

  const currentBoard = PINOUT_DATA.find((b) => b.id === activeBoard);

  return (
    <View style={styles.screen}>
      <Header title="Board Pinouts" subtitle="Referensi Visual NodeMCU & ESP32" />
      
      <View style={styles.tabContainer}>
        {PINOUT_DATA.map((board) => (
          <TouchableOpacity
            key={board.id}
            style={[styles.tab, activeBoard === board.id && styles.activeTab]}
            onPress={() => setActiveBoard(board.id)}
          >
            <Text style={[styles.tabText, activeBoard === board.id && styles.activeTabText]}>
              {board.id.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {currentBoard && (
          <Animated.View key={currentBoard.id} entering={FadeIn.duration(400)} style={styles.boardCard}>
            <Text style={styles.boardTitle}>{currentBoard.name}</Text>
            <Text style={styles.boardDesc}>{currentBoard.description}</Text>
            
            <View style={styles.tableHeader}>
              <Text style={styles.headerLabel}>PIN</Text>
              <Text style={styles.headerLabel}>FUNGSI / GPIO</Text>
            </View>

            {currentBoard.pins.map((pin, index) => (
              <Animated.View
                key={pin.pin}
                entering={FadeInDown.delay(index * 40).duration(400).springify()}
                style={[styles.pinRow, index % 2 === 0 && styles.pinRowEven]}
              >
                <View style={styles.pinLabelBox}>
                  <Text style={styles.pinName}>{pin.pin}</Text>
                </View>
                <Text style={styles.pinFunc}>{pin.function}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>
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
    marginBottom: 16,
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
  content: { padding: 24, paddingTop: 8 },
  boardCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  boardDesc: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 24,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
  },
  headerLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    letterSpacing: 2,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  pinRowEven: { backgroundColor: 'rgba(255,255,255,0.3)' },
  pinLabelBox: {
    width: 90,
  },
  pinName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000000',
  },
  pinFunc: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
  },
});
