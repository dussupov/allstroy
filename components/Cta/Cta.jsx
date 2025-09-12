'use client';
import styles from './Cta.module.scss';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Cta = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t('cta.toast.fillAll'));
      return;
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success(t('cta.toast.success'));
      setForm({ name: '', phone: '' });
    }
  };

  return (
    <div className="container">
      <section className={styles.ctaSection} id="cta">
        <div className={styles.content}>
          <div className={styles.text}>
            <span className={styles.badge}>{t('cta.badge')}</span>
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>

            <form className={styles.form}>
              <input
                type="text"
                placeholder={t('cta.form.namePlaceholder')}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
                className={styles.input}
              />
              <IMaskInput
                mask="+7 (000) 000-00-00"
                placeholder={t('cta.form.phonePlaceholder')}
                className={styles.input}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button type="submit" onClick={handleSubmit}>
                {t('cta.form.submit')}
              </button>
            </form>
          </div>

          <div className={styles.decor}>
            <img src="/img/details/cta.png" alt={t('cta.imgAlt')} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cta;
