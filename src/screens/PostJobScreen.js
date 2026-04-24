import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Field from '../components/Field';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { calculateMoney, money } from '../services/store';

const categories = ['construction', 'delivery', 'cleaning', 'shifting', 'errands'];

export default function PostJobScreen() {
  const { t, addJob } = useApp();
  const [form, setForm] = useState({
    title: 'Shifting Assistant',
    description: 'Need workers to shift boxes, bags and small furniture safely.',
    category: 'shifting',
    location: 'Chennai, Tamil Nadu',
    date: '20 June 2026',
    startTime: '9:00 AM',
    endTime: '2:00 PM',
    amount: '600',
    workersNeeded: '2'
  });

  const financials = calculateMoney(form.amount);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (!form.title || !form.location || !form.amount) return alert('Please fill job title, location and amount');
    await addJob(form);
    alert('Job posted successfully. Workers nearby can now book it.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={t('postJob')} compact />
      <View style={styles.form}>
        <Field label={t('title')} value={form.title} onChangeText={(v) => update('title', v)} placeholder={t('enterTitle')} />
        <Field label={t('description')} value={form.description} onChangeText={(v) => update('description', v)} placeholder={t('enterDescription')} multiline />
        <Text style={styles.label}>{t('category')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {categories.map((item) => <Chip key={item} label={t(item)} active={form.category === item} onPress={() => update('category', item)} />)}
        </ScrollView>
        <Field label={t('location')} icon="📍" value={form.location} onChangeText={(v) => update('location', v)} placeholder={t('enterLocation')} />
        <Field label={t('date')} icon="📅" value={form.date} onChangeText={(v) => update('date', v)} placeholder="DD/MM/YYYY" />
        <View style={styles.row}>
          <View style={styles.half}><Field label={t('startTime')} icon="🕘" value={form.startTime} onChangeText={(v) => update('startTime', v)} placeholder="HH:MM" /></View>
          <View style={styles.half}><Field label={t('endTime')} icon="🕔" value={form.endTime} onChangeText={(v) => update('endTime', v)} placeholder="HH:MM" /></View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}><Field label={t('amount')} value={form.amount} onChangeText={(v) => update('amount', v)} placeholder={t('enterAmount')} keyboardType="numeric" /></View>
          <View style={styles.half}><Field label={t('workers')} value={form.workersNeeded} onChangeText={(v) => update('workersNeeded', v)} placeholder={t('enterWorkers')} keyboardType="numeric" /></View>
        </View>
        <Card style={styles.summary}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <Text style={styles.summaryLine}>Job amount: {money(financials.amount)}</Text>
          <Text style={styles.summaryLine}>Platform commission 10%: {money(financials.commissionAmount)}</Text>
          <Text style={styles.summaryLine}>Worker receives: {money(financials.workerPayout)}</Text>
        </Card>
        <Button title={t('createJob')} onPress={submit} style={styles.submit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  form: { padding: 16 },
  label: { color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 10, marginBottom: 8 },
  chips: { paddingVertical: 4, paddingRight: 10 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  summary: { marginHorizontal: 0, backgroundColor: colors.blueSoft },
  summaryTitle: { fontSize: 18, fontWeight: '900', color: colors.text, marginBottom: 8 },
  summaryLine: { color: colors.text, fontSize: 15, marginTop: 4 },
  submit: { marginTop: 12 }
});
