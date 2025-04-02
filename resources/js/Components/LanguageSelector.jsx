import React from 'react';

const LanguageSelector = ({ locales, selectedLocale, onLanguageChange }) => {
    return (
        <div className="flex justify-end p-4">
            <select
                value={selectedLocale}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="px-4 py-2 border rounded-md"
            >
                {locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {locale === 'en' ? 'English' : 'Հայերեն'}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
