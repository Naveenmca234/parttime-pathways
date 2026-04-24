import React, { useMemo, useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Chip from '../components/Chip';
import JobCard from '../components/JobCard';
import { useApp } from '../context/AppContext';
import { colors, radius } from '../theme';

const categories = ['all', 'construction', 'delivery', 'cleaning', 'shifting', 'errands'];

export default function JobsScreen() {
  const { t, jobs, bookJob } = useApp();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => jobs.filter((job) => {
    const categoryOk = category === 'all' || job.category === category;
    const searchOk = `${job.title} ${job.location} ${job.description}`.toLowerCase().includes(search.toLowerCase());
    return categoryOk && searchOk;
  }), [jobs, category, search]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={t('availableJobs')} compact />
      <View style={styles.searchBox}>
        <TextInput placeholder={t('searchJobs')} placeholderTextColor="#7B7E87" value={search} onChangeText={setSearch} style={styles.input} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((item) => <Chip key={item} label={item === 'all' ? 'All' : t(item)} active={category === item} onPress={() => setCategory(item)} />)}
      </ScrollView>
      <View style={styles.list}>
        {filtered.map((job) => <JobCard key={job.id} job={job} actionLabel={t('bookNow')} onAction={() => bookJob(job)} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  searchBox: { margin: 16, backgroundColor: colors.white, borderRadius: radius.md, paddingHorizontal: 16, height: 58, justifyContent: 'center' },
  input: { fontSize: 18, color: colors.text, outlineStyle: 'none' },
  chips: { paddingLeft: 16, paddingRight: 6, paddingBottom: 12 },
  list: { paddingHorizontal: 12 }
});
