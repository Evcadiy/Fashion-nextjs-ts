import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import MiniDrawer from "@/components/MiniDrawer/MiniDrawer";
import Cart from "@/components/Cart/Cart";

export const metadata = {
  title: "Fashion",
  description: "Fashion app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <MiniDrawer />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
