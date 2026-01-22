import { Button } from "~/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/core/components/ui/card";
import { GithubLogo } from "~/features/auth/components/logos/github";
import { KakaoLogo } from "~/features/auth/components/logos/kakao";
import { useTranslation } from "react-i18next";

import {
  ConnectProviderButton,
  DisconnectProviderButton,
} from "../connect-provider-buttons";

const enabledProviders = [
  {
    name: "Github",
    key: "github",
    logo: <GithubLogo />,
  },
  {
    name: "Kakao",
    key: "kakao",
    logo: <KakaoLogo />,
  },
];

export default function ConnectSocialAccountsForm({
  providers,
}: {
  providers: string[];
}) {
  const { t } = useTranslation();
  return (
    <Card className="w-full max-w-screen-md">
      <CardHeader>
        <CardTitle>{t("users.account.forms.connect_social.title")}</CardTitle>
        <CardDescription>
          {t("users.account.forms.connect_social.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {enabledProviders.map((provider) => {
          if (providers.includes(provider.key)) {
            return (
              <DisconnectProviderButton
                key={provider.key}
                provider={provider.name}
                logo={provider.logo}
                providerKey={provider.key}
              />
            );
          } else {
            return (
              <ConnectProviderButton
                key={provider.key}
                provider={provider.name}
                logo={provider.logo}
                providerKey={provider.key}
              />
            );
          }
        })}
      </CardContent>
    </Card>
  );
}
