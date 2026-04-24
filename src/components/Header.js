import React from 'react';
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';

export default function Header({ title, subtitle, badge, compact = false }) {
  const { width } = useWindowDimensions();
  const wide = width > 760;
  return (
    <LinearGradient colors={[colors.blue, colors.navy]} style={[styles.header, compact && styles.compact, wide && styles.wide]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
    </LinearGradient>
  );
}

export function HeroBanner() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80' }}
      style={styles.hero}
      imageStyle={{ borderRadius: radius.lg }}
    >
      <View style={styles.overlay}>
        <Text style={styles.heroTitle}>Part time Pathways</Text>
        <Text style={styles.heroSubtitle}>Connecting Workers and Employers</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 48, paddingHorizontal: 22, paddingBottom: 24 },
  compact: { paddingTop: 34, paddingBottom: 18 },
  wide: { borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { color: colors.white, fontSize: 34, fontWeight: '900' },
  subtitle: { color: 'rgba(255,255,255,0.86)', fontSize: 16, marginTop: 6 },
  badge: { color: colors.white, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18, fontWeight: '800', overflow: 'hidden' },
  hero: { height: 230, margin: 16, justifyContent: 'flex-end' },
  overlay: { padding: 22, backgroundColor: 'rgba(15,25,48,0.48)', borderBottomLeftRadius: radius.lg, borderBottomRightRadius: radius.lg },
  heroTitle: { color: colors.white, fontSize: 30, fontWeight: '900' },
  heroSubtitle: { color: colors.white, fontSize: 17, marginTop: 6 }
});
