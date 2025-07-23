import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t, currentLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredTime: '',
    department: ''
  });

  const departments = [
    { value: 'general', label: t('contact.departments.general')[currentLanguage] },
    { value: 'bookings', label: t('contact.departments.bookings')[currentLanguage] },
    { value: 'catering', label: t('contact.departments.catering')[currentLanguage] },
    { value: 'decor', label: t('contact.departments.decor')[currentLanguage] },
    { value: 'technical', label: t('contact.departments.technical')[currentLanguage] },
    { value: 'feedback', label: t('contact.departments.feedback')[currentLanguage] }
  ];

  const timeSlots = [
    { value: 'morning', label: t('contact.timeSlots.morning')[currentLanguage] },
    { value: 'afternoon', label: t('contact.timeSlots.afternoon')[currentLanguage] },
    { value: 'evening', label: t('contact.timeSlots.evening')[currentLanguage] }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactMethodSelect = (method) => {
    setContactMethod(method);
    setStep(2);
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(prev => prev + 1);
    } else {
      alert(t('contact.validation.fillRequired')[currentLanguage]);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 2:
        return formData.name.trim() !== '' && 
          (contactMethod === 'email' ? formData.email.trim() !== '' : formData.phone.trim() !== '');
      case 3:
        return formData.department !== '';
      case 4:
        return formData.subject.trim() !== '';
      case 5:
        return formData.preferredTime !== '';
      case 6:
        return formData.message.trim() !== '';
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact.submit.success')[currentLanguage]);
    setStep(1);
    setContactMethod('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredTime: '',
      department: ''
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.method.title')[currentLanguage]}</h3>
            <div className="contact-method-selector">
              <button 
                className={`method-btn ${contactMethod === 'email' ? 'active' : ''}`}
                onClick={() => handleContactMethodSelect('email')}
              >
                <i className="fas fa-envelope"></i> {t('contact.steps.method.email')[currentLanguage]}
              </button>
              <button 
                className={`method-btn ${contactMethod === 'phone' ? 'active' : ''}`}
                onClick={() => handleContactMethodSelect('phone')}
              >
                <i className="fas fa-phone"></i> {t('contact.steps.method.phone')[currentLanguage]}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.contact.title')[currentLanguage]}</h3>
            <div className="form-group">
              <label htmlFor="name">{t('contact.steps.contact.name')[currentLanguage]}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            {contactMethod === 'email' ? (
              <div className="form-group">
                <label htmlFor="email">{t('contact.steps.contact.email')[currentLanguage]}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="phone">{t('contact.steps.contact.phone')[currentLanguage]}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.department.title')[currentLanguage]}</h3>
            <div className="form-group">
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('contact.steps.department.select')[currentLanguage]}</option>
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.subject.title')[currentLanguage]}</h3>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder={t('contact.steps.subject.placeholder')[currentLanguage]}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.time.title')[currentLanguage]}</h3>
            <div className="form-group">
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('contact.steps.time.select')[currentLanguage]}</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-container">
            <h3>{t('contact.steps.message.title')[currentLanguage]}</h3>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder={t('contact.steps.message.placeholder')[currentLanguage]}
                rows="5"
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-form-container">
        <h2>{t('contact.title')[currentLanguage]}</h2>
        <div className="step-indicator">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className={`step ${step >= num ? 'active' : ''}`}>
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {renderStep()}
          
          <div className="form-navigation">
            {step > 1 && (
              <button type="button" className="back-btn" onClick={handleBack}>
                {t('contact.navigation.back')[currentLanguage]}
              </button>
            )}
            {step < 6 ? (
              <button type="button" className="next-btn" onClick={handleNext}>
                {t('contact.navigation.next')[currentLanguage]}
              </button>
            ) : (
              <button type="submit" className="submit-btn">
                {t('contact.navigation.submit')[currentLanguage]}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;