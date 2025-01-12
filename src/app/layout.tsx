import '../styles/globals.css';

import { PokemonProvider } from '../context/PokemonContext';

export const metadata = {
  title: 'Pokémon Trainer Page',
  description: 'A Pokémon Trainer Page built with Next.js and React Context',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <PokemonProvider>{children}</PokemonProvider>
      </body>
    </html>
  );
}
