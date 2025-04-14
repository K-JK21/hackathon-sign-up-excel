
import { Link } from "react-router-dom";
import RegistrationForm from "@/components/RegistrationForm";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/utils/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Register() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 flex justify-between items-center">
          <Link to="/" className="flex items-center text-sm text-violet-600 hover:text-violet-500">
            <ArrowLeft className="mr-1 h-4 w-4" /> {t('common.backToHome')}
          </Link>
          <LanguageSwitcher />
        </div>
        
        <div className="max-w-3xl mx-auto pb-16">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-violet-600 py-8 px-6">
              <h1 className="text-2xl font-bold text-white text-center">{t('register.title')}</h1>
              <p className="mt-2 text-violet-100 text-center">{t('register.subtitle')}</p>
            </div>
            <div className="p-6 md:p-8">
              <RegistrationForm />
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>{t('register.terms')}</p>
            <p className="mt-2">
              {t('register.alreadyRegistered')} <Link to="/success" className="text-violet-600 hover:underline">{t('register.checkStatus')}</Link> {t('register.checkStatusLink')}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
