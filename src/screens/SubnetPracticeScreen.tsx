import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { calculateSubnet, SubnetResult } from '../utils/subnetting';
import Header from '../components/Header';

export default function SubnetPracticeScreen() {
  const insets = useSafeAreaInsets();
  
  const [ip, setIp] = useState('');
  const [prefix, setPrefix] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<SubnetResult | null>(null);

  const [inputNetwork, setInputNetwork] = useState('');
  const [inputBroadcast, setInputBroadcast] = useState('');
  const [inputMask, setInputMask] = useState('');

  const [status, setStatus] = useState<null | 'success' | 'fail'>(null);

  const generateQuestion = () => {
    const octet1 = 192;
    const octet2 = 168;
    const octet3 = Math.floor(Math.random() * 256);
    const octet4 = Math.floor(Math.random() * 256);
    const newIp = `${octet1}.${octet2}.${octet3}.${octet4}`;
    const newPrefix = Math.floor(Math.random() * 6) + 24;

    setIp(newIp);
    setPrefix(newPrefix);
    const ans = calculateSubnet(newIp, newPrefix);
    setCorrectAnswer(ans);

    setInputNetwork('');
    setInputBroadcast('');
    setInputMask('');
    setStatus(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = () => {
    if (!correctAnswer) return;
    if (
      inputNetwork.trim() === correctAnswer.networkId &&
      inputBroadcast.trim() === correctAnswer.broadcast &&
      inputMask.trim() === correctAnswer.netmask
    ) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Latihan Subnet" subtitle="Uji pemahaman subnetting" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]} keyboardShouldPersistTaps="handled">
          
          <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.questionCard}>
            <Text style={styles.label}>SOAL</Text>
            <Text style={styles.ipText}>{ip} / {prefix}</Text>
            <Text style={styles.hintText}>Tentukan NetID, Broadcast, dan Subnet Mask</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(500).springify()} style={styles.formCard}>
            <InputGroup label="Network ID" placeholder="192.168.1.0" value={inputNetwork} onChange={setInputNetwork} />
            <InputGroup label="Broadcast" placeholder="192.168.1.255" value={inputBroadcast} onChange={setInputBroadcast} />
            <InputGroup label="Subnet Mask" placeholder="255.255.255.0" value={inputMask} onChange={setInputMask} />
            
            <View style={styles.rowButtons}>
              <TouchableOpacity style={[styles.btn, styles.btnCheck]} onPress={checkAnswer}>
                <Text style={styles.btnText}>CEK JAWABAN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnNext]} onPress={generateQuestion}>
                <Ionicons name="refresh" size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {status === 'success' && (
            <Animated.View entering={FadeInUp.duration(400).springify()} style={[styles.alert, styles.alertSuccess]}>
              <Text style={styles.alertTitle}>🎉 MANTAP!</Text>
              <Text style={styles.alertDesc}>Jawaban Anda tepat. Teruskan latihan!</Text>
            </Animated.View>
          )}

          {status === 'fail' && correctAnswer && (
            <Animated.View entering={FadeInUp.duration(400).springify()} style={[styles.alert, styles.alertFail]}>
              <Text style={styles.alertTitle}>❌ COBA LAGI</Text>
              <Text style={styles.alertDesc}>
                NetID: {correctAnswer.networkId}{'\n'}
                Broad: {correctAnswer.broadcast}{'\n'}
                Mask: {correctAnswer.netmask}
              </Text>
            </Animated.View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function InputGroup({ label, placeholder, value, onChange }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#D1D5DB"
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
      />
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingTop: 16 },
  questionCard: {
    backgroundColor: '#000000',
    borderRadius: 28,
    padding: 28,
    marginBottom: 24,
    alignItems: 'center',
  },
  label: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  ipText: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginBottom: 8, fontVariant: ['tabular-nums'] },
  hintText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', fontWeight: '600' },
  formCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 10, fontWeight: '900', color: '#D6D6D6', marginBottom: 8, marginLeft: 4, letterSpacing: 1.5, textTransform: 'uppercase' },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000000',
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  btn: { borderRadius: 16, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  btnCheck: { flex: 1, backgroundColor: '#000000', marginRight: 12 },
  btnNext: { width: 56, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D6D6D6' },
  btnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  alert: { borderRadius: 24, padding: 20, marginTop: 24 },
  alertSuccess: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#DCFCE7' },
  alertFail: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FEE2E2' },
  alertTitle: { fontSize: 14, fontWeight: '900', marginBottom: 4, color: '#000000' },
  alertDesc: { fontSize: 13, lineHeight: 22, color: '#666666', fontWeight: '600' },
});
