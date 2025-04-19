
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import { ArrowRight, Code, Lightbulb, Users } from "lucide-react";
import { useTranslation } from "@/utils/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-violet-600">ЖаңырганАкыл</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/register">
                <Button variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50">
                  {t('common.register')}
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost">{t('common.admin')}</Button>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('index.about')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              {t('index.aboutSub')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 mb-4">
                <Code className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{t('index.build')}</h3>
              <p className="text-gray-500">
                {t('index.buildSub')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 mb-4">
                <Users className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{t('index.connect')}</h3>
              <p className="text-gray-500">
                {t('index.connectSub')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 mb-4">
                <Lightbulb className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{t('index.learn')}</h3>
              <p className="text-gray-500">
                {t('index.learnSub')}
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {t('index.registerHackathon')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2">
              <span className="text-gray-500">{t('footer.university')}</span>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-500">
                {t('index.questions')} <a href="mailto:info@techhack.com" className="text-violet-600 hover:text-violet-500">info@techhack.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
