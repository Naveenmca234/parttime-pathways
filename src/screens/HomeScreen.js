import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header, { HeroBanner } from '../components/Header';
import StatsCard from '../components/StatsCard';
import JobCard from '../components/JobCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { money } from '../services/store';

export default function HomeScreen() {
  const { t, user, role, jobs, metrics, bookJob, setTab } = useApp();
  const topJobs = jobs.slice(0, 3);
  const isProvider = role === 'provider';
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={`${t('hello')}, ${user?.name || 'Naveen'}!`} badge={isProvider ? t('provider') : t('worker')} />
      <HeroBanner />
      <View style={styles.statsRow}>
        <StatsCard icon="▣" value={isProvider ? jobs.length : metrics.activeJobs} label={isProvider ? 'Jobs Posted' : t('availableJobs')} />
        <StatsCard icon="▤" value={metrics.totalBookings} label={t('bookings')} />
        <StatsCard icon="₹" value={isProvider ? money(metrics.spent) : money(metrics.earnings)} label={isProvider ? t('spent') : t('earnings')} />
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{isProvider ? 'Your Recent Jobs' : t('recentJobs')}</Text>
        <Text onPress={() => setTab(isProvider ? 'post' : 'jobs')} style={styles.link}>{isProvider ? t('postJob') : 'View all'}</Text>
      </View>
      {topJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          actionLabel={isProvider ? undefined : t('bookNow')}
          statusLabel={isProvider ? t('active') : undefined}
          onAction={() => bookJob(job)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 12, marginTop: 8 },
  sectionHeader: { paddingHorizontal: 18, marginTop: 18, marginBottom: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 26, fontWeight: '900', color: colors.text },
  link: { color: colors.blue, fontWeight: '900', fontSize: 16 }
});
