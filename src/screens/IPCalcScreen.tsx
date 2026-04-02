import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { calculateSubnet, SubnetResult } from '../utils/subnetting';
import Header from '../components/Header';

export default function IPCalcScreen() {
  const insets = useSafeAreaInsets();
  const [ip, setIp] = useState('');
  const [prefix, setPrefix] = useState('');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const trimmedIp = ip.trim();
    const prefNum = parseInt(prefix.trim(), 10);

    if (!trimmedIp) {
      setError('IP Address tidak boleh kosong.');
      setResult(null);
      return;
    }
    if (isNaN(prefNum)) {
      setError('Prefix harus berupa angka (contoh: 24).');
      setResult(null);
      return;
    }

    const res = calculateSubnet(trimmedIp, prefNum);
    if (!res) {
      setError('IP Address atau Prefix tidak valid.');
      setResult(null);
    } else {
      setError('');
      setResult(res);
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="IP Subnet Calc" subtitle="Hitung IPv4 dengan cepat" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Input Card */}
          <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.card}>
            <Text style={styles.label}>ALAMAT IP</Text>
            <TextInput
              style={styles.input}
              placeholder="192.168.1.1"
              placeholderTextColor="#D1D5DB"
              value={ip}
              onChangeText={setIp}
              keyboardType="numeric"
              autoCorrect={false}
            />

            <Text style={styles.label}>PREFIX / CIDR</Text>
            <TextInput
              style={styles.input}
              placeholder="24"
              placeholderTextColor="#D1D5DB"
              value={prefix}
              onChangeText={setPrefix}
              keyboardType="numeric"
              autoCorrect={false}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleCalculate} activeOpacity={0.8}>
              <Text style={styles.buttonText}>HITUNG SEKARANG</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Result Card */}
          {result && (
            <Animated.View entering={FadeInUp.duration(600).springify()} style={styles.resultCard}>
              <Text style={styles.resultTitle}>Hasil Analisis</Text>
              <View style={styles.divider} />
              <ResultRow label="Network ID" value={result.networkId} />
              <ResultRow label="Broadcast" value={result.broadcast} />
              <ResultRow label="Subnet Mask" value={result.netmask} />
              <ResultRow label="Host Pertama" value={result.firstHost} />
              <ResultRow label="Host Terakhir" value={result.lastHost} />
              <ResultRow label="Total Host" value={result.totalHost.toLocaleString()} isLast />
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function ResultRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.resultRow, isLast && { borderBottomWidth: 0 }]}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  resultLabel: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
