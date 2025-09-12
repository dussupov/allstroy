'use client'

import styles from './PricingRequestModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { useTranslation } from 'react-i18next';

const PricingRequestModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { modalData } = useSelector((state) => state.multiModal.modal);
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t('pricingModal.toast.fillAll'));
      return;
    }

    const body = {
      ...form,
      packages: modalData.packages, // уже локализованное имя пакета из карточек
    };

    const res = await fetch('/api/pricingRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(t('pricingModal.toast.success'));
      dispatch({ type: 'CLOSE_MODAL' });
      setForm({ name: '', phone: '' });
    } else {
      toast.error(t('pricingModal.toast.error'));
    }
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>{t('pricingModal.title')}</h2>
      <p className={styles.subtitle}>{t('pricingModal.subtitle')}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('pricingModal.form.namePlaceholder')}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          className={styles.input}
        />

        <IMaskInput
          mask="+7 (000) 000-00-00"
          placeholder={t('pricingModal.form.phonePlaceholder')}
          className={styles.input}
          value={form.phone}
          // onAccept надёжнее, чем onChange, для IMaskInput
          onAccept={(val) => setForm({ ...form, phone: val })}
        />

        <button type="submit" className={styles.submitBtn}>
          {t('pricingModal.form.submit')}
        </button>
      </form>
    </div>
  );
};

export default PricingRequestModal;
