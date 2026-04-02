import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const NET_TOOLS = [
  { id: 'IPCalc', name: 'IP Subnet', icon: 'calculator', desc: 'Kalkulator IPv4', color: '#000000' },
  { id: 'SubnetPractice', name: 'Latihan', icon: 'bar-chart', desc: 'Generator Acak', color: '#000000' },
  { id: 'CLITools', name: 'CLI Cheat', icon: 'terminal', desc: 'MikroTik, Cisco', color: '#000000' },
  { id: 'OSIPort', name: 'OSI & Port', icon: 'layers', desc: 'Ref TCP/IP', color: '#000000' },
  { id: 'Troubleshoot', name: 'Diagnosa', icon: 'git-merge', desc: 'Troubleshooting', color: '#000000' },
  { id: 'LANGuide', name: 'LAN Kabel', icon: 'git-network', desc: 'Standar Susunan', color: '#000000' },
];

const HW_TOOLS = [
  { id: 'Resistor', name: 'Resistor', icon: 'color-palette', desc: 'Gelang Warna', color: '#000000' },
  { id: 'BIOSBeep', name: 'BIOS Beep', icon: 'hardware-chip', desc: 'Kode Ami/Award', color: '#000000' },
  { id: 'Sensors', name: 'Kamus Sensor', icon: 'speedometer', desc: 'DHT11, HC-SR04', color: '#000000' },
];

const IOT_TOOLS = [
  { id: 'Pinout', name: 'Board Pinout', icon: 'hardware-chip-outline', desc: 'ESP8266/ESP32', color: '#000000' },
  { id: 'Snippet', name: 'IoT Snippet', icon: 'code-slash', desc: 'Template C++', color: '#000000' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const renderSection = (title: string, tools: any[], delayOffset: number) => (
    <View style={styles.section}>
      <Animated.Text entering={FadeIn.delay(delayOffset).duration(400)} style={styles.sectionTitle}>
        {title}
      </Animated.Text>
      <View style={styles.grid}>
        {tools.map((tool, index) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            index={index} 
            delay={delayOffset + (index * 60)} 
            onPress={() => navigation.navigate(tool.id)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>Skamuda</Text>
          <Text style={styles.appSubtitle}>TOOLKIT HELPER</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person" size={20} color="#000000" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(200).duration(600).springify()} style={styles.heroCard}>
          <Text style={styles.heroTitle}>Master Your Skills.</Text>
          <Text style={styles.heroDesc}>Peralatan tempur digital untuk siswa TKJ Skamuda.</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Eksplor Sekarang</Text>
          </TouchableOpacity>
        </Animated.View>

        {renderSection('🌐 NETWORKING', NET_TOOLS, 300)}
        {renderSection('🔌 HARDWARE', HW_TOOLS, 600)}
        {renderSection('💻 IOT & CODE', IOT_TOOLS, 800)}
      </ScrollView>
    </View>
  );
}

function ToolCard({ tool, index, delay, onPress }: any) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).duration(400).springify()}
      style={[{ width: (width - 48) / 2 - 8, marginBottom: 16 }, animatedStyle]}
    >
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={tool.icon as any} size={24} color="#000000" />
        </View>
        <Text style={styles.cardTitle}>{tool.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={1}>{tool.desc}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -1,
  },
  appSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D6D6D6',
    letterSpacing: 2,
    marginTop: -2,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  heroCard: {
    backgroundColor: '#000000',
    borderRadius: 32,
    padding: 28,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  heroBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 13,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#D6D6D6',
    marginBottom: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 20,
    alignItems: 'flex-start',
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  cardDesc: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '600',
  },
});
