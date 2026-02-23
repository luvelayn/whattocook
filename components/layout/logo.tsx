import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
	return (
		<Link href="/" className="flex items-center gap-1.5">
			<Image src="/images/logo.svg" alt="Логотип" width={30} height={30} />
			<span className="text-xl font-medium">whattocook</span>
		</Link>
	);
}
