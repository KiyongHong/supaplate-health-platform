import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2.5">
      <h1 className="text-5xl font-semibold">{t("common.not_found.title")}</h1>
      <h2 className="text-2xl">{t("common.not_found.message")}</h2>
      <Button variant="outline" asChild>
        <Link to="/">{t("common.not_found.back_home")} &rarr;</Link>
      </Button>
    </div>
  );
}
