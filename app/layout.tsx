import './global.css';
import NavBar from "./components/NavBar";

export const metadata = {
  title: 'Welcome to chat',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*<NavBar/>*/}
      <body>{children}</body>
    </html>
  );
}
