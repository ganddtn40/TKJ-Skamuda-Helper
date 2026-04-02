import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CLI_DATA, CliCategory, CliCommand, MIKROTIK_CHECKLIST } from '../data/cli';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CLIScreen() {
  const insets = useSafeAreaInsets();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleCategory = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.screen}>
      <Header title="CLI Reference" subtitle="MikroTik, Cisco, Debian" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {CLI_DATA.map((category, index) => (
          <Animated.View key={index} entering={FadeInDown.delay(index * 150).duration(400).springify()}>
            <CategoryAccordion
              category={category}
              isOpen={openIndex === index}
              onToggle={() => toggleCategory(index)}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryAccordion({
  category,
  isOpen,
  onToggle,
}: {
  category: CliCategory;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isCisco = category.title.toLowerCase().includes('cisco');
  const isMikrotik = category.title.toLowerCase().includes('mikrotik');
  
  let iconName = 'logo-tux';
  if (isCisco) iconName = 'git-network';
  if (isMikrotik) iconName = 'router';

  return (
    <View style={[styles.accordion, isOpen && styles.accordionOpen]}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle} activeOpacity={0.7}>
        <View style={styles.categoryIcon}>
          <Ionicons name={iconName as any} size={20} color="#000000" />
        </View>
        <Text style={styles.categoryTitle}>{category.title.toUpperCase()}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#D6D6D6"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.accordionBody}>
          {isMikrotik && (
            <View style={styles.checklistContainer}>
              <Text style={styles.checklistHeader}>CHECKLIST SETUP GATEWAY</Text>
              {MIKROTIK_CHECKLIST.map((chk, i) => (
                <View key={i} style={styles.checkItem}>
                  <View style={styles.checkStepBox}>
                    <Text style={styles.checkStep}>{chk.step}</Text>
                  </View>
                  <View style={styles.checkContent}>
                    <Text style={styles.checkTitle}>{chk.title}</Text>
                    <Text style={styles.checkDesc}>{chk.desc}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.divider} />
              <Text style={styles.checklistHeader}>COMMAND TERMINAL DASAR</Text>
            </View>
          )}

          {category.data.map((item, idx) => (
            <CommandItem
              key={idx}
              item={item}
              isLast={idx === category.data.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function CommandItem({ item, isLast }: { item: CliCommand; isLast: boolean }) {
  return (
    <View style={[styles.commandItem, isLast && { borderBottomWidth: 0 }]}>
      <View style={styles.commandBox}>
        <Text style={styles.commandText}>{item.command}</Text>
      </View>
      <Text style={styles.commandDesc}>{item.description}</Text>
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
    paddingTop: 8,
  },
  accordion: {
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  accordionOpen: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderColor: '#F2F2F2',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1,
  },
  accordionBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  commandItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  commandBox: {
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  commandText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '700',
  },
  commandDesc: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
    fontWeight: '600',
  },
  checklistContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  checklistHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D6D6D6',
    marginBottom: 16,
    letterSpacing: 2,
  },
  checkItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  checkStepBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  checkStep: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  checkContent: {
    flex: 1,
  },
  checkTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  checkDesc: {
    fontSize: 12,
    color: '#888888',
    lineHeight: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 16,
  },
});
