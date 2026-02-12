import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
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

const geist = Geist({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-sans',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning className={geist.variable}>
			<body className={`antialiased`}>
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
