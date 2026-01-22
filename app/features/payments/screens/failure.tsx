/**
 * Payment Failure Page Component
 *
 * This file implements the payment failure page that displays error information
 * when a payment process fails. It provides users with clear feedback about what
 * went wrong during their payment attempt.
 *
 * Key features:
 * - Displays payment error codes and messages from Toss Payments
 * - Extracts error details from URL parameters
 * - Provides clear visual feedback with error styling
 * - Sets appropriate page metadata for error state
 */

import { type MetaFunction, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { useTranslation } from "react-i18next";
import i18next from "~/core/lib/i18next.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return { title: (await i18next.getFixedT(request))("payments.failure.title") };
}

/**
 * Meta function for setting page metadata
 *
 * This function sets the page title for the payment failure page,
 * indicating to the user that there was an error with their payment.
 *
 * @returns Array of metadata objects for the page
 */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.title} | ${import.meta.env.VITE_APP_NAME}` }];
};

/**
 * Failure component for displaying payment error information
 *
 * This component displays error information when a payment process fails.
 * It extracts error details from URL parameters and presents them to the user
 * in a clear, visually distinct format to indicate the error state.
 *
 * The component handles two key pieces of information:
 * 1. Error code - A specific code identifying the type of error
 * 2. Error message - A human-readable description of what went wrong
 *
 * These details come from either:
 * - The Toss Payments API (for payment processing errors)
 * - Internal validation (for validation errors in the success page)
 *
 * @returns JSX element representing the payment failure page
 */
export default function Failure() {
  const { t } = useTranslation();
  // Extract error details from URL parameters
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorDescription = searchParams.get("message");
  
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Error heading with distinct error styling */}
      <h1 className="text-center text-3xl font-semibold tracking-tight text-red-500 md:text-5xl dark:text-red-400">
        {t("payments.failure.title")}
      </h1>
      
      {/* Error code display */}
      <p className="text-muted-foreground text-center">
        {t("payments.failure.error_code", { code: errorCode })}
      </p>
      
      {/* Error description display */}
      <p className="text-muted-foreground text-center">{errorDescription}</p>
    </div>
  );
}
