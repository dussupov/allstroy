'use client';
import styles from './Cta.module.scss';
import { IMaskInput } from 'react-imask';
import {useState} from "react";
import toast from 'react-hot-toast';

const Cta = () => {

  const [form, setForm] = useState({ name: '', phone: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Заполните все поля!');
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success('Успешно отправлено!');
      setForm({ name: '', phone: ''});
    }
  };

  return (
    <div className={'container'}>
      <section className={styles.ctaSection} id={'cta'}>
        <div className={styles.content}>
          <div className={styles.text}>
            <span className={styles.badge}>Бесплатно в день обращения</span>
            <h2>Получите бесплатный замер и консультацию</h2>
            <p>Узнайте стоимость ремонта вашей квартиры прямо сейчас</p>
            <form className={styles.form}>
              <input type="text" placeholder="Ваше имя"
                     onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name} className={styles.input}
              />
              <IMaskInput
                mask="+7 (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
                className={styles.input}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button type="submit" onClick={handleSubmit}>Отправить</button>
            </form>
          </div>
          <div className={styles.decor}>
            <img src="/img/details/cta.png" alt="Рулон чертежа"/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cta;