import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { ThemeProvider } from "../features/ThemeProvider";
import Providers from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster richColors position="top-right" />
          <ThemeProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
