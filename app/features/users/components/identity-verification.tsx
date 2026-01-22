import { useState } from "react";
import { Form, useNavigation } from "react-router";

import { useTranslation } from "react-i18next";
import { Button } from "~/core/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/core/components/ui/card";

export function IdentityVerification() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isVerified, setIsVerified] = useState(false);

  // Mock verification handler handled by the route action
  
  if (isVerified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("users.components.identity_verification.verified.title")}</CardTitle>
          <CardDescription>{t("users.components.identity_verification.verified.description")}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("users.components.identity_verification.title")}</CardTitle>
        <CardDescription>
          {t("users.components.identity_verification.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" action="/verify-identity" className="space-y-4">
          <input type="hidden" name="intent" value="verify" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="userName">{t("users.components.identity_verification.fields.name.label")}</label>
            <input required id="userName" name="userName" placeholder={t("users.components.identity_verification.fields.name.placeholder")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="birthday">{t("users.components.identity_verification.fields.birthday.label")}</label>
            <input required id="birthday" name="birthday" placeholder={t("users.components.identity_verification.fields.birthday.placeholder")} minLength={8} maxLength={8} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phoneNo">{t("users.components.identity_verification.fields.phone.label")}</label>
            <input required id="phoneNo" name="phoneNo" placeholder={t("users.components.identity_verification.fields.phone.placeholder")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="flex gap-4">
               <div className="space-y-2 flex-1">
                <label className="text-sm font-medium" htmlFor="identityFront">{t("users.components.identity_verification.fields.id_front.label")}</label>
                <input required id="identityFront" name="identityFront" placeholder={t("users.components.identity_verification.fields.id_front.placeholder")} maxLength={6} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
               </div>
               <div className="space-y-2 w-1/3">
                <label className="text-sm font-medium" htmlFor="identityBack">{t("users.components.identity_verification.fields.id_back.label")}</label>
                <input required id="identityBack" name="identityBack" placeholder={t("users.components.identity_verification.fields.id_back.placeholder")} maxLength={1} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
               </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="loginTypeLevel">{t("users.components.identity_verification.fields.auth_method.label")}</label>
            <select name="loginTypeLevel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="1">{t("users.components.identity_verification.providers.kakao")}</option>
                <option value="2">{t("users.components.identity_verification.providers.payco")}</option>
                <option value="3">{t("users.components.identity_verification.providers.samsung")}</option>
                <option value="4">{t("users.components.identity_verification.providers.kb")}</option>
                <option value="5">{t("users.components.identity_verification.providers.toss")}</option>
                <option value="6">{t("users.components.identity_verification.providers.naver")}</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("users.components.identity_verification.action.submitting") : t("users.components.identity_verification.action.submit")}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
