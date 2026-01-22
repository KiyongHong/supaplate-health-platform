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
          Verify your identity to sync health records from NHIS.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" action="/verify-identity" className="space-y-4">
          <input type="hidden" name="intent" value="verify" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="userName">Name</label>
            <input required id="userName" name="userName" placeholder="Your Name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="birthday">Birthday (YYYYMMDD)</label>
            <input required id="birthday" name="birthday" placeholder="19900101" minLength={8} maxLength={8} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phoneNo">Phone Number</label>
            <input required id="phoneNo" name="phoneNo" placeholder="01012345678" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
          </div>

          <div className="flex gap-4">
               <div className="space-y-2 flex-1">
                <label className="text-sm font-medium" htmlFor="identityFront">Registration No (Front)</label>
                <input required id="identityFront" name="identityFront" placeholder="900101" maxLength={6} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
               </div>
               <div className="space-y-2 w-1/3">
                <label className="text-sm font-medium" htmlFor="identityBack">Back (1st Digit)</label>
                <input required id="identityBack" name="identityBack" placeholder="1" maxLength={1} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
               </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="loginTypeLevel">Auth Method</label>
            <select name="loginTypeLevel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="1">Kakao Talk</option>
                <option value="2">Payco</option>
                <option value="3">Samsung Pass</option>
                <option value="4">KB Mobile</option>
                <option value="5">Toss</option>
                <option value="6">Naver</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Request Verification"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
