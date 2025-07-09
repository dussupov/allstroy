'use client'

import styles from './CalculatorRequestModal.module.scss';
import {useSelector} from "react-redux";
import {useState} from "react";
import toast from "react-hot-toast";
import {IMaskInput} from "react-imask";

const CalculatorRequestModal = () => {

  const {modalData} = useSelector(state => state.multiModal.modal);

  const [form, setForm] = useState({ name: '', phone: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Заполните все поля!');
      return;
    }

    const body = {
      ...form,
      packages: modalData.packages,
      area: modalData.area,
      options: modalData.options,
      total: modalData.total
    };

    const res = await fetch('/api/calculateRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success('Успешно отправлено!');
      setForm({ name: '', phone: '' });
    } else {
      toast.error('Ошибка при отправке запроса');
    }
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Оставьте заявку</h2>
      <p className={styles.subtitle}>Мы свяжемся с вами для консультации</p>

      <div className={styles.form}>
        <input type="text" placeholder="Ваше имя"
               onChange={(e) => setForm({...form, name: e.target.value})}
               value={form.name} className={styles.input}
        />
        <IMaskInput
          mask="+7 (000) 000-00-00"
          placeholder="+7 (___) ___-__-__"
          className={styles.input}
          value={form.phone}
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />
        <button type="submit" onClick={handleSubmit}>Отправить</button>
      </div>
    </div>
  );
};

export default CalculatorRequestModal;
