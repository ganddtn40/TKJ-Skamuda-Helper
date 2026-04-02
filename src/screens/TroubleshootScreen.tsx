import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const FLOW_STEPS = [
  { 
    layer: 'Layer 1 (Physical)', 
    title: 'Cek Fisik & Kabel', 
    desc: 'Pastikan indikator lampu LAN menyala. Jika mati, cek crimping UTP atau ganti port.', 
    icon: 'hardware-chip', 
    color: '#000000' 
  },
  { 
    layer: 'Layer 2 (Data Link)', 
    title: 'Cek MAC & Switch', 
    desc: 'Cek lampu indikator Switch. Verifikasi VLAN dan status duplex interface.', 
    icon: 'git-compare', 
    color: '#000000' 
  },
  { 
    layer: 'Layer 3 (Network)', 
    title: 'Cek IP & Ping', 
    desc: 'Pastikan IP satu subnet. PING ke Gateway. Jika RTO, cek routing router.', 
    icon: 'globe', 
    color: '#000000' 
  },
  { 
    layer: 'Layer 4 (Transport)', 
    title: 'Cek Port & Firewall', 
    desc: 'Jika PING sukses tapi layanan (HTTP/DNS) gagal, cek firewall atau filter rules.', 
    icon: 'shield-checkmark', 
    color: '#000000' 
  },
  { 
    layer: 'Layer 5-7 (Upper)', 
    title: 'Aplikasi & DNS', 
    desc: 'Cek resolusi DNS (nslookup). Restart service aplikasi di server (Apache/Nginx).', 
    icon: 'browsers', 
    color: '#000000' 
  },
];

export default function TroubleshootScreen() {
  const insets = useSafeAreaInsets();
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <View style={styles.screen}>
      <Header title="Flow Diagnosa" subtitle="Urutan Troubleshooting OSI" />
      
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Ionicons name="information-circle" size={20} color="#FFFFFF" />
          <Text style={styles.bannerText}>
            Jangan melompat! Mulailah diagnosa dari Layer terbawah (Fisik) untuk hasil akurat.
          </Text>
        </View>

        <View style={styles.timeline}>
          {FLOW_STEPS.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            
            return (
              <Animated.View 
                key={index} 
                entering={FadeInDown.delay(index * 120).duration(400).springify()}
                style={styles.stepContainer}
              >
                {index !== FLOW_STEPS.length - 1 && (
                  <View style={[styles.line, { backgroundColor: isPast ? '#000000' : '#F2F2F2' }]} />
                )}

                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => setActiveStep(index)}
                  style={styles.stepRow}
                >
                  <View style={[styles.iconBox, { 
                    backgroundColor: isActive || isPast ? '#000000' : '#F2F2F2',
                  }]}>
                    <Ionicons 
                      name={isPast && !isActive ? 'checkmark' : step.icon as any} 
                      size={18} 
                      color={isActive || isPast ? '#FFFFFF' : '#D6D6D6'} 
                    />
                  </View>
                  
                  <View style={[styles.card, isActive && styles.cardActive]}>
                    <Text style={[styles.layerBadge, isActive ? styles.whiteText : styles.grayText]}>
                      {step.layer.toUpperCase()}
                    </Text>
                    <Text style={[styles.stepTitle, isActive && styles.whiteText]}>{step.title}</Text>
                    {isActive && (
                      <Animated.Text entering={FadeInDown.duration(300)} style={styles.stepDesc}>
                        {step.desc}
                      </Animated.Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.resetBtn} 
          onPress={() => setActiveStep(0)}
        >
          <Text style={styles.resetBtnText}>MULAI ULANG DIAGNOSA</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 8 },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 12,
    lineHeight: 18,
  },
  timeline: {
    marginLeft: 8,
  },
  stepContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  line: {
    position: 'absolute',
    left: 19,
    top: 40,
    bottom: -20,
    width: 2,
    zIndex: 0,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 2,
  },
  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardActive: {
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  layerBadge: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  grayText: { color: '#D6D6D6' },
  whiteText: { color: 'rgba(255,255,255,0.6)' },
  stepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
  },
  stepDesc: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 18,
    marginTop: 8,
    fontWeight: '600',
    opacity: 0.8,
  },
  resetBtn: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
  },
  resetBtnText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  }
});
