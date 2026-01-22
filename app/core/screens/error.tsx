import type { Route } from "./+types/error";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/core/components/ui/button";
import i18next from "~/core/lib/i18next.server";

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  return {
    title: t("common.error.title"),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: `${data?.title ?? "Error"} | ${import.meta.env.VITE_APP_NAME}`,
    },
  ];
};

export default function ErrorPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-semibold text-red-700">{t("common.error.title")}</h1>
      <p className="text-muted-foreground">{t("payments.failure.error_code", { code: errorCode })}</p>
      <p className="text-muted-foreground">{errorDescription}</p>
      <Button variant={"link"} asChild>
        <Link to="/">{t("common.error.back_home")} &rarr;</Link>
      </Button>
    </div>
  );
}
