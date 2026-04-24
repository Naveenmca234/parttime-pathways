import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { t } from '../i18n';

const icons = {
  home: '⌂',
  jobs: '▣',
  bookings: '▤',
  post: '+',
  profile: '♙',
  settings: '⚙'
};

export default function BottomNav({ active, onChange, lang }) {
  const tabs = ['home', 'jobs', 'bookings', 'post', 'profile', 'settings'];
  return (
    <View style={styles.nav}>
      {tabs.map((key) => {
        const isActive = active === key;
        return (
          <Pressable key={key} onPress={() => onChange(key)} style={styles.item}>
            <Text style={[styles.icon, isActive && styles.active]}>{icons[key]}</Text>
            <Text numberOfLines={1} style={[styles.label, isActive && styles.active]}>{t(lang, key)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 76,
    borderTopWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6
  },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  icon: { fontSize: 28, color: '#8A8D94', fontWeight: '800' },
  label: { fontSize: 12, color: '#8A8D94', fontWeight: '700', maxWidth: 72 },
  active: { color: colors.blue }
});
