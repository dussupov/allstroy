'use client'

import styles from './CalculatorRequestModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { useTranslation } from 'react-i18next';

const CalculatorRequestModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { modalData } = useSelector((state) => state.multiModal.modal);
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t('calcModal.toast.fillAll'));
      return;
    }

    const body = {
      ...form,
      packages: modalData.packages,
      area: modalData.area,
      options: modalData.options,
      total: modalData.total,
    };

    const res = await fetch('/api/calculateRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(t('calcModal.toast.success'));
      dispatch({ type: 'CLOSE_MODAL' });
      setForm({ name: '', phone: '' });
    } else {
      toast.error(t('calcModal.toast.error'));
    }
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>{t('calcModal.title')}</h2>
      <p className={styles.subtitle}>{t('calcModal.subtitle')}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('calcModal.form.namePlaceholder')}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          className={styles.input}
        />
        <IMaskInput
          mask="+7 (000) 000-00-00"
          placeholder={t('calcModal.form.phonePlaceholder')}
          className={styles.input}
          value={form.phone}
          onAccept={(val) => setForm({ ...form, phone: val })}
        />
        <button type="submit" className={styles.submitBtn}>
          {t('calcModal.form.submit')}
        </button>
      </form>
    </div>
  );
};

export default CalculatorRequestModal;
