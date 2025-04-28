
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

// Available languages
export type Language = 'ky' | 'ru' | 'en';

// Store to manage the current language
export const useLanguageStore = create(
  persist<{
    language: Language;
    setLanguage: (language: Language) => void;
  }>(
    (set) => ({
      language: 'ky', // Default language is Kyrgyz
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-store', // name for localStorage
    }
  )
);

// Safe hook wrapper to use in components
export function useLanguage() {
  // Empty dependency array to only run once on component mount
  const [store, setStore] = useState({
    language: 'ky' as Language,
    setLanguage: (lang: Language) => {}
  });
  
  useEffect(() => {
    // Only access the store inside effects or events
    const { language, setLanguage } = useLanguageStore.getState();
    setStore({ language, setLanguage });
    
    // Subscribe to store changes
    const unsubscribe = useLanguageStore.subscribe(
      (state) => setStore({ language: state.language, setLanguage: state.setLanguage })
    );
    
    return unsubscribe;
  }, []);
  
  return store;
}

// Helper function to get translations for current language
export function useTranslation() {
  const { language } = useLanguage();
  
  return {
    t: (key: string) => {
      const path = key.split('.');
      let translation: any = translations[language];
      
      // Navigate through the nested translation object
      for (const segment of path) {
        if (!translation[segment]) return key; // Return key if translation not found
        translation = translation[segment];
      }
      
      return translation;
    },
    language,
  };
}

// Translations for all supported languages
export const translations = {
  ky: {
    common: {
      register: 'Катталуу',
      admin: 'Админ',
      backToHome: 'Башкы бетке кайтуу',
      submit: 'Каттоону аяктоо',
      loading: 'Каттоо жүрүүдө...',
    },
    hero: {
      title: 'Жаңырган Акыл 2025',
      subtitle: 'Жусуп Баласагын атындагы Кыргыз Улуттук университетинин чатбот технологиялары боюнча хакатону',
      description: 'Кыргыз Республикасындагы эң кызыктуу хакатонго катышыңыз. Инновациялык долбоорлорду түзүңүз, командалар менен иштешиңиз жана сыйлыктарды утуп алыңыз!',
      register: 'Азыр катталуу',
      learnMore: 'Көбүрөөк маалымат',
      date: '20-22-май, 2025',
      dateSub: 'Хакатон күндөрү: 20-майда (баштоо күнү) старт, 21-майда долбоорлорду сынап көрүү, 22-майда жыйынтыктарды чыгаруу.',
      participants: '200+ катышуучу',
      participantsSub: 'Дүйнөнүн булуң-бурчунан келген жүздөгөн программисттер, дизайнерлер жана ишкерлер менен катышыңыз.',
      prize: 'Баалуу сыйлык фонду',
      prizeSub: 'Акчалай сыйлыктар, насаатчылык мүмкүнчүлүктөрү жана башка көптөгөн нерселер!',
    },
    index: {
      about: 'Хакатон жөнүндө',
      aboutSub: 'Инновация, кызматташтык жана көйгөйлөрдү чечүүнүн бир апта мааласы.',
      build: 'Укмуштуудай нерсе жаратыңыз',
      buildSub: 'Реалдуу дүйнөдөгү көйгөйлөрдү чечүү үчүн каалаган технологиялык стекти колдонуңуз.',
      connect: 'Башкалар менен байланыш түзүңүз',
      connectSub: 'Катышуучулар, менторлор жана тармактык адистер менен байланышыңыз.',
      learn: 'Жаңы көндүмдөрдү үйрөнүңүз',
      learnSub: 'Семинарларга катышыңыз, насаатчылык алыңыз жана көндүмдөрүңүздү жогорулатыңыз.',
      registerHackathon: 'Хакатонго катталуу',
      questions: 'Суроолоруңуз барбы? Бизге кат жазыңыз',
      copyright: '© 2025 Жаңырган Акыл Хакатон. Бардык укуктар корголгон.',
    },
    register: {
      title: 'Жаңырган Акыл 2025 хакатонуна катталуу',
      subtitle: 'Ордуңузду камсыздоо үчүн төмөнкү форманы толтуруңуз',
      terms: 'Катталуу менен, сиз биздин Тейлөө шарттарына жана Купуялуулук саясатына макул болосуз.',
      alreadyRegistered: 'Мурунтан катталдыңызбы?',
      checkStatus: 'Каттоо статусуңузду',
      checkStatusLink: 'текшериңиз',
    },
    form: {
      fullName: 'Аты-жөнү',
      email: 'Электрондук почта',
      phone: 'Телефон номери',
      university: 'Университет/Колледж',
      teamName: 'Команданын аталышы',
      teamSize: 'Команда мүчөлөрүнүн саны',
      teamMembers: 'Команда мүчөлөрүнүн аты-жөнү',
    },
    success: {
      title: 'Каттоо ийгиликтүү болду!',
      subtitle: 'Жаңырган Акыл хакатонуна катталганыңыз үчүн рахмат. Сиз менен иштешүүнү чыдамсыздык менен күтөбүз!',
      nextSteps: 'Андан кийин эмне болот?',
      checkEmail: 'Кошумча маалыматтар менен тастыктоо билдирүүсүн электрондук почтаңыздан текшериңиз.',
      markDate: 'Датаны белгилеңиз:',
      location: 'Жайгашкан жери: Жусуп Баласагын атындагы КУУнун Инновация борбору',
      joinDiscord: 'Discord коомуна кошулуу',
    },
    admin: {
      title: 'Администратор кирүүсү',
      subtitle: 'Администратор панелине кирүү үчүн сырсөздү киргизиңиз',
      password: 'Администратор сырсөздү киргизиңиз',
      login: 'Панелге кирүү',
      wrongPassword: 'Туура эмес сырсөз. Кайра аракет кылыңыз.',
      dashboard: 'Хакатон катышуучуларынын панели',
      search: 'Катышуучуларды издөө...',
      downloadExcel: 'Excel жүктөп алуу',
      loading: 'Катышуучуларды жүктөө...',
      noParticipants: 'Катышуучулар жок',
      noParticipantsSub: 'Катышуучулар хакатонго катталганда бул жерде көрүнөт.',
      participantsFound: 'катышуучу(лар) табылды',
      tableHeaders: {
        name: 'Аты-жөнү',
        email: 'Эл. почта',
        university: 'Университет',
        major: 'Адистик',
        teamStatus: 'Команда статусу',
        registrationDate: 'Каттоо күнү',
      },
      teamStatuses: {
        looking: 'Команда издөөдө',
        haveTeam: 'Командасы бар',
        solo: 'Жалгыз катышам',
      },
    },
    footer: {
      university: 'Жусуп Баласагын атындагы Кыргыз Улуттук университети & UlutSoft',
    },
  },
  ru: {
    common: {
      register: 'Регистрация',
      admin: 'Админ',
      backToHome: 'Вернуться на главную',
      submit: 'Завершить регистрацию',
      loading: 'Регистрация...',
    },
    hero: {
      title: 'Жаңырган Акыл 2025',
      subtitle: 'Хакатон по технологиям чат-ботов Кыргызского Национального Университета имени Жусупа Баласагына',
      description: 'Примите участие в самом увлекательном хакатоне года. Создавайте инновационные проекты, общайтесь с единомышленниками и выигрывайте призы!',
      register: 'Зарегистрироваться сейчас',
      learnMore: 'Узнать больше',
      date: '20-22 мая, 2025',
      dateSub: 'Дни хакатона: старт 20 мая, обзор проектов 21 мая, подведение итогов 22 мая.',
      participants: '300+ участников',
      participantsSub: 'Присоединяйтесь к сотням программистов, дизайнеров и предпринимателей со всего мира.',
      prize: 'Призовой фонд $10,000',
      prizeSub: 'Денежные призы, возможности наставничества и многое другое!',
    },
    index: {
      about: 'О хакатоне',
      aboutSub: 'Неделя инноваций, сотрудничества и решения проблем.',
      build: 'Создавайте что-то удивительное',
      buildSub: 'Используйте любой технологический стек для решения проблем реального мира.',
      connect: 'Устанавливайте связи',
      connectSub: 'Общайтесь с участниками, наставниками и экспертами.',
      learn: 'Приобретайте новые навыки',
      learnSub: 'Посещайте мастер-классы, получайте наставничество и улучшайте свои навыки.',
      registerHackathon: 'Зарегистрироваться на хакатон',
      questions: 'Есть вопросы? Напишите нам',
      copyright: '© 2025 Хакатон Жаңырган Акыл. Все права защищены.',
    },
    register: {
      title: 'Регистрация на хакатон Жаңырган Акыл 2025',
      subtitle: 'Заполните форму ниже, чтобы обеспечить себе место',
      terms: 'Регистрируясь, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности.',
      alreadyRegistered: 'Уже зарегистрировались?',
      checkStatus: 'Проверьте статус вашей регистрации',
      checkStatusLink: 'здесь',
    },
    form: {
      fullName: 'ФИО',
      email: 'Электронная почта',
      phone: 'Номер телефона',
      university: 'Университет/Колледж',
      teamName: 'Наименование команды',
      teamSize: 'Количество участников в команде',
      teamMembers: 'ФИО участников команды',
    },
    success: {
      title: 'Регистрация прошла успешно!',
      subtitle: 'Спасибо за регистрацию на хакатон Жаңырган Акыл. Мы с нетерпением ждем встречи с вами!',
      nextSteps: 'Что дальше?',
      checkEmail: 'Проверьте свою электронную почту для подтверждения регистрации с дополнительной информацией.',
      markDate: 'Отметьте дату:',
      location: 'Место проведения: Инновационный центр КНУ им. Жусупа Баласагына',
      joinDiscord: 'Присоединиться к сообществу Discord',
    },
    admin: {
      title: 'Вход администратора',
      subtitle: 'Введите пароль для доступа к панели администратора',
      password: 'Введите пароль администратора',
      login: 'Войти в панель',
      wrongPassword: 'Неверный пароль. Попробуйте еще раз.',
      dashboard: 'Панель участников хакатона',
      search: 'Поиск участников...',
      downloadExcel: 'Скачать Excel',
      loading: 'Загрузка участников...',
      noParticipants: 'Нет участников',
      noParticipantsSub: 'Участники появятся здесь, когда они зарегистрируются на хакатон.',
      participantsFound: 'участников найдено',
      tableHeaders: {
        name: 'ФИО',
        email: 'Эл. почта',
        university: 'Университет',
        major: 'Специальность',
        teamStatus: 'Статус команды',
        registrationDate: 'Дата регистрации',
      },
      teamStatuses: {
        looking: 'Ищет команду',
        haveTeam: 'Есть команда',
        solo: 'Один',
      },
    },
    footer: {
      university: 'Кыргызский Национальный Университет имени Жусупа Баласагына & UlutSoft',
    },
  },
  en: {
    common: {
      register: 'Register',
      admin: 'Admin',
      backToHome: 'Back to Home',
      submit: 'Complete Registration',
      loading: 'Registering...',
    },
    hero: {
      title: 'Jañyrgan Akyl 2025',
      subtitle: 'Chatbot Technologies Hackathon by Jusup Balasagyn Kyrgyz National University',
      description: 'Join the most exciting hackathon in the Kyrgyz Republic. Create innovative projects, work with teams, and win prizes!',
      register: 'Register Now',
      learnMore: 'Learn More',
      date: 'May 20-22, 2025',
      dateSub: 'Hackathon days: Start on May 20, project review on May 21, results announcement on May 22.',
      participants: '300+ participants',
      participantsSub: 'Join hundreds of programmers, designers, and entrepreneurs from around the world.',
      prize: '$10,000 prize pool',
      prizeSub: 'Cash prizes, mentorship opportunities, and much more!',
    },
    index: {
      about: 'About the Hackathon',
      aboutSub: 'A week of innovation, collaboration, and problem-solving.',
      build: 'Build Something Amazing',
      buildSub: 'Use any technology stack to solve real-world problems.',
      connect: 'Connect with Others',
      connectSub: 'Network with participants, mentors, and industry professionals.',
      learn: 'Learn New Skills',
      learnSub: 'Attend workshops, get mentorship, and improve your skills.',
      registerHackathon: 'Register for Hackathon',
      questions: 'Got questions? Write to us',
      copyright: '© 2025 Jañyrgan Akyl Hackathon. All rights reserved.',
    },
    register: {
      title: 'Register for Jañyrgan Akyl 2025 Hackathon',
      subtitle: 'Fill out the form below to register',
      terms: 'By registering, you agree to our Terms of Service and Privacy Policy.',
      alreadyRegistered: 'Already registered?',
      checkStatus: 'Check your registration status',
      checkStatusLink: 'here',
    },
    form: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      university: 'University/College',
      teamName: 'Team Name',
      teamSize: 'Number of Team Members',
      teamMembers: 'Team Members Full Names',
    },
    success: {
      title: 'Registration Successful!',
      subtitle: 'Thank you for registering for the Jañyrgan Akyl Hackathon. We look forward to working with you!',
      nextSteps: 'What\'s Next?',
      checkEmail: 'Check your email for a confirmation message with additional information.',
      markDate: 'Mark the date:',
      location: 'Location: Innovation Center of KNU named after Jusup Balasagyn',
      joinDiscord: 'Join Discord Community',
    },
    admin: {
      title: 'Administrator Login',
      subtitle: 'Enter password to access the admin panel',
      password: 'Enter admin password',
      login: 'Login to Panel',
      wrongPassword: 'Incorrect password. Please try again.',
      dashboard: 'Hackathon Participants Panel',
      search: 'Search participants...',
      downloadExcel: 'Download Excel',
      loading: 'Loading participants...',
      noParticipants: 'No participants',
      noParticipantsSub: 'Participants will appear here once they register for the hackathon.',
      participantsFound: 'participants found',
      tableHeaders: {
        name: 'Name',
        email: 'Email',
        university: 'University',
        major: 'Major',
        teamStatus: 'Team Status',
        registrationDate: 'Registration Date',
      },
      teamStatuses: {
        looking: 'Looking for team',
        haveTeam: 'Has team',
        solo: 'Solo',
      },
    },
    footer: {
      university: 'Kyrgyz National University named after Zhusup Balasagyn & UlutSoft',
    },
  },
};
