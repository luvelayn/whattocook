import type { Metadata } from 'next';
import { Jost, Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'whattocook — личная кулинарная книга, которая выбирает за вас',
	description:
		'Никогда не ломайте голову над вопросом "Что приготовить?". whattocook — ваша личная кулинарная книга, которая хранит рецепты и выбирает случайное блюдо, когда вы не можете определиться. Сохраняйте рецепты по удобному шаблону и доверьтесь случаю!',
};

const roboto = Roboto({
	variable: '--font-roboto',
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500'],
});

const jost = Jost({
	variable: '--font-jost',
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['500'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body
				className={`${roboto.variable} ${jost.variable} antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
