import type { Metadata } from "next";
import { QueryClientProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kumove",
    template: "%s | Kumove",
  },
  description:
    "Kumove connects businesses, customers, KuCouriers, KuDrivers and KuStops into a smarter city delivery network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviders>{children}</QueryClientProviders>
      </body>
    </html>
  );
}
