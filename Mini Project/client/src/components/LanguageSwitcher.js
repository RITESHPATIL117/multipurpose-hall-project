import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, LANGUAGES } = useLanguage();

  return (
    <div className="language-selector">
      <div className="language-radio-group">
        {LANGUAGES.map((lang) => (
          <label key={lang.code} className="language-radio-label">
            <input
              type="radio"
              name="language"
              value={lang.code}
              checked={currentLanguage === lang.code}
              onChange={() => changeLanguage(lang.code)}
              className="language-radio"
            />
            <span className="language-name">{lang.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 