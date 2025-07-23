import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('services.decorations'),
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      description: t('services.descriptions.decorations'),
      features: [
        t('services.features.decorations.theme'),
        t('services.features.decorations.floral'),
        t('services.features.decorations.lighting'),
        t('services.features.decorations.stage'),
        t('services.features.decorations.table')
      ],
      path: '/services/decorations'
    },
    {
      title: t('services.catering'),
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      description: t('services.descriptions.catering'),
      features: [
        t('services.features.catering.menu'),
        t('services.features.catering.live'),
        t('services.features.catering.buffet'),
        t('services.features.catering.staff'),
        t('services.features.catering.custom')
      ],
      path: '/services/catering'
    },
    {
      title: t('services.soundLighting'),
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      description: t('services.descriptions.soundLighting'),
      features: [
        t('services.features.soundLighting.dj'),
        t('services.features.soundLighting.sound'),
        t('services.features.soundLighting.lighting'),
        t('services.features.soundLighting.effects'),
        t('services.features.soundLighting.live')
      ],
      path: '/services/sound-lighting'
    },
    {
      title: t('services.photography'),
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      description: t('services.descriptions.photography'),
      features: [
        t('services.features.photography.photographers'),
        t('services.features.photography.video'),
        t('services.features.photography.drone'),
        t('services.features.photography.booth'),
        t('services.features.photography.edits')
      ],
      path: '/services/photography'
    }
  ];

  return (
    <div className="services-page-wrapper" style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#1e293b' }}>{t('services.title')}</h1>
          <p className="text-lg text-gray-600" style={{ maxWidth: 600, margin: '0 auto' }}>{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full service-card" style={{ border: '1px solid #e2e8f0', transition: 'box-shadow 0.3s', minHeight: 500 }}>
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" style={{ borderBottom: '1px solid #e2e8f0' }} />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: '#2563eb' }}>{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center" style={{ minHeight: 60 }}>{service.description}</p>
                <div className="mb-4 flex-1">
                  <h4 className="font-medium mb-2 text-center" style={{ color: '#0f172a' }}>{t('services.whatWeOffer')}</h4>
                  <ul className="list-disc list-inside text-gray-600" style={{ paddingLeft: 20 }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => navigate(service.path)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-auto"
                  style={{ fontWeight: 500 }}
                >
                  {t('services.viewPackages')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8 mx-auto" style={{ maxWidth: 600, border: '1px solid #e2e8f0' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#16a34a' }}>{t('services.customPackage.title')}</h2>
          <p className="text-gray-600 mb-6">{t('services.customPackage.description')}</p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition duration-300"
            style={{ fontWeight: 500 }}
          >
            {t('services.customPackage.contact')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services; 