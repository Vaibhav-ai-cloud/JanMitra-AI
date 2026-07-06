export const metadata = {
  title: 'JanMitra AI',
  description: 'Citizen engagement and public service platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
