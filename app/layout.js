import "./globals.css";
import portfolio from "../portfolio.json";

export const metadata = {
  title: portfolio.meta?.siteTitle || "Portfolio",
  description: portfolio.meta?.description || "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
