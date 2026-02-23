'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOutIcon, User } from 'lucide-react';
import { logout } from '@/app/actions/auth/logout';
import Link from 'next/link';
import { TProfile } from '@/types/database';

type DropdownProfileMenuProps = {
	profile: TProfile;
	profileLink: string;
};

export function DropdownProfileMenu({
	profile,
	profileLink,
}: DropdownProfileMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-lg" className="rounded-full">
					<Avatar className="size-full">
						<AvatarImage
							src={profile.avatar_url || ''}
							alt="Аватар пользователя"
						/>
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link
						href={profileLink}
						className="cursor-pointer focus-visible:outline-none"
					>
						Мой профиль
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => logout()}
					className="cursor-pointer focus-visible:outline-none"
				>
					<LogOutIcon />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
