import type { Route } from "./+types/email-verified";

import { useSearchParams } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import i18next from "~/core/lib/i18next.server";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: `${data?.title ?? "Email Verification"} | ${import.meta.env.VITE_APP_NAME}`,
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  return {
    title: t("auth.email_verified.title"),
  };
}

export default function ChangeEmail() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">{t("auth.email_verified.header")}</h1>
      <p className="text-muted-foreground">
        {decodeURIComponent(message ?? "")}.
      </p>
    </div>
  );
}
