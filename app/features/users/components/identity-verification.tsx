import { useState } from "react";
import { Form, useNavigation } from "react-router";

import { Button } from "~/core/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/core/components/ui/card";

export function IdentityVerification() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isVerified, setIsVerified] = useState(false);

  // Mock verification handler handled by the route action
  
  if (isVerified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Identity Verified</CardTitle>
          <CardDescription>Your identity has been successfully verified.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>
          We need to verify your identity to access your health records.
          (Mock: Click verify to simulate PASS authentication)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" action="/verify-identity">
          <input type="hidden" name="intent" value="verify" />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify with PASS"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
