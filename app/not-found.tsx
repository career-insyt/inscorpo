import { Insyt404View } from "@/components/errors/custom-error-views";

export const metadata = {
  title: "404 Not Found | CAREERINSYT",
  description: "The requested corporate route was not found in the INSYT ledger.",
};

export default function NotFound() {
  return <Insyt404View />;
}
