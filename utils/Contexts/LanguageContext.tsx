import { createContext, useState, useContext, ReactNode } from 'react';


interface LanguageContextType {
  language: 'en' | 'bn'; 
  toggleLanguage: () => void; 
  font: string; 
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


interface LanguageProviderProps {
  children: ReactNode;
}


export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<'en' | 'bn'>('en'); 

  
  const fonts: { [key in 'en' | 'bn']: string } = {
    en: 'Roboto, sans-serif',
    bn: 'Hind Siliguri, sans-serif',
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, font: fonts[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
