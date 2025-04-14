
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Жаңырган Акыл 2025</span>
            <span className="block text-violet-600">Жусуп Баласагын атындагы Кыргыз Улуттук университетинин чатбот технологиялары боюнча хакатону</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Жылдын эң кызыктуу хакатонуна катышыңыз. Инновациялык долбоорлорду түзүңүз, 
            өзүңүз сыяктуу иштеп чыгуучулар менен байланышыңыз жана укмуштуудай сыйлыктарды утуп алыңыз!
          </p>
          <div className="mt-10 space-y-4 sm:flex sm:justify-center sm:space-y-0 sm:space-x-6">
            <Link to="/register">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium"
              >
                Азыр катталуу <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Көбүрөөк маалымат
            </Button>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Calendar className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">25-27-апрель, 2025</h3>
              <p className="text-slate-600">
                48 саат кодтоо, кызматташуу жана чыгармачылык. Күн тартибиңизге белгилеңиз!
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">300+ катышуучу</h3>
              <p className="text-slate-600">
                Дүйнөнүн булуң-бурчунан келген жүздөгөн программисттер, дизайнерлер жана ишкерлер менен катышыңыз.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Trophy className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">10,000$ сыйлык фонду</h3>
              <p className="text-slate-600">
                Акчалай сыйлыктар, насаатчылык мүмкүнчүлүктөрү жана башка көптөгөн нерселер!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
