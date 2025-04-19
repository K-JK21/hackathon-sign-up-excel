
import { useState } from 'react';
import translations from '../utils/i18n';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ky'>('en');
  const t = translations[language].hero;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ky' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <Button 
            onClick={toggleLanguage} 
            variant="outline" 
            className="text-sm font-medium"
          >
            {language === 'en' ? 'Кыргызча' : 'English'}
          </Button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">{t.date}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">{t.participants}</h3>
                <p className="text-gray-600">{t.participantsDescription}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">{t.prizes}</h3>
                <p className="text-gray-600">{language === 'en' ? 'Cash prizes, mentorship opportunities, and much more!' : 'Акчалай сыйлыктар, насаатчылык мүмкүнчүлүктөрү жана башка көптөгөн нерселер!'}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">{language === 'en' ? 'Timeline' : 'Күн тартиби'}</h3>
                <ul className="text-left text-gray-600">
                  <li className="mb-1">• {t.eventTimeline.day20}</li>
                  <li className="mb-1">• {t.eventTimeline.day21}</li>
                  <li className="mb-1">• {t.eventTimeline.day22}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
            {language === 'en' ? 'Register Now' : 'Азыр катталуу'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
