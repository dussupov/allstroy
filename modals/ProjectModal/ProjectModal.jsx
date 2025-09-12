'use client'

import { useEffect, useState } from 'react';
import styles from './ProjectModal.module.scss';
import ScrollBox from '@/components/ScrollBox/ScrollBox';
import { Swiper, SwiperSlide } from 'swiper/react';
import { API_URL } from '@/config';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const mapLngToStrapiLocale = (lng) => (
  { ru: 'ru-RU', en: 'en', kz: 'kz' }[lng] || 'ru-RU'
);

const ProjectModal = () => {
  const { t, i18n } = useTranslation();
  const projectId = useSelector((state) => state.multiModal.modal.modalData.projectId);

  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [square, setSquare] = useState(null);
  const [packageType, setPackageType] = useState(null);
  const [term, setTerm] = useState(null);

  // описание
  const [contentBlocks, setContentBlocks] = useState([]);
  const [contentHTML, setContentHTML] = useState(null);

  const textOf = (node) => node?.text ?? (node?.children?.map(textOf).join('') ?? '');

  const getData = async () => {
    if (!projectId) return;
    try {
      const locale = mapLngToStrapiLocale(i18n.language);
      const response = await fetch(
        `${API_URL}/api/projects/${projectId}?locale=${encodeURIComponent(locale)}&populate=*`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const json = await response.json();
      const data = json?.data ?? {};

      setTitle(data?.title ?? null);
      setSquare(data?.square ?? null);
      setTerm(data?.term ?? null);
      setPackageType(data?.packageType ?? null);

      // описание
      const content = data?.content;
      if (Array.isArray(content)) {
        setContentBlocks(content);
        setContentHTML(null);
      } else if (typeof content === 'string') {
        setContentHTML(content);
        setContentBlocks([]);
      } else {
        setContentBlocks([]);
        setContentHTML(null);
      }

      // фото
      const imgs = Array.isArray(data?.images)
        ? data.images.map((img) =>
          img?.formats?.medium?.url
            ? `${API_URL}${img.formats.medium.url}`
            : `${API_URL}${img.url}`
        )
        : [];
      setImages(imgs);

      // видео
      setVideo(
        Array.isArray(data?.video) && data.video[0]?.url
          ? `${API_URL}${data.video[0].url}`
          : null
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    // перезагружать данные при смене projectId или языка
  }, [projectId, i18n.language]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalTitle}>
        <span>{title || t('projectModal.titleFallback')}</span>
      </div>

      <ScrollBox>
        <div className={styles.modalContent}>
          {images?.length > 0 && (
            <div className={styles.photoSection}>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className={styles.swiper}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${title || t('projectModal.titleFallback')} — ${t('projectModal.photoAlt', { index: idx + 1 })}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {(square || packageType || term) && (
            <div className={styles.paramsSection}>
              {square != null && (
                <div>
                  <span>{t('projectModal.area')}:</span>{' '}
                  {square} {t('projects.sqUnit')}
                </div>
              )}
              {packageType && (
                <div>
                  <span>{t('projectModal.package')}:</span> {packageType}
                </div>
              )}
              {term && (
                <div>
                  <span>{t('projectModal.term')}:</span> {term}
                </div>
              )}
            </div>
          )}

          {/* Описание */}
          {(contentBlocks.length > 0 || contentHTML) && (
            <div className={styles.descriptionSection}>
              {contentHTML && (
                <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
              )}

              {contentBlocks.length > 0 &&
                contentBlocks.map((block, i) => {
                  if (block.type === 'paragraph' || !block.type) {
                    const text = (block.children ?? []).map((ch) => textOf(ch)).join('');
                    return text.trim() ? <p key={i}>{text}</p> : null;
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={i}>
                        {(block.children ?? []).map((li, idx) => (
                          <li key={idx}>{textOf(li)}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type?.startsWith('heading')) {
                    const text = (block.children ?? []).map((ch) => textOf(ch)).join('');
                    return <h3 key={i}>{text}</h3>;
                  }
                  const fallback = (block.children ?? []).map((ch) => textOf(ch)).join('');
                  return fallback.trim() ? <p key={i}>{fallback}</p> : null;
                })}
            </div>
          )}
        </div>
      </ScrollBox>
    </div>
  );
};

export default ProjectModal;
