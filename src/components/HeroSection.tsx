import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/25"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">{t("hero.title")}</span>
            <span className="block text-violet-600">{t("hero.subtitle")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            {t("hero.description")}
          </p>
          <div className="mt-10 space-y-4 sm:flex sm:justify-center sm:space-y-0 sm:space-x-6">
            <Link to="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium"
              >
                {t("hero.register")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Calendar className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">
                {t("hero.date")}
              </h3>
              <p className="text-slate-600">{t("hero.dateSub")}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">
                {t("hero.participants")}
              </h3>
              <p className="text-slate-600">{t("hero.participantsSub")}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Trophy className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-slate-900">
                {t("hero.prize")}
              </h3>
              <p className="text-slate-600">{t("hero.prizeSub")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
