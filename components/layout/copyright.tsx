'use client';

export function Copyright() {
	return (
		<p className="text-center text-xs text-muted-foreground">
			© {new Date().getFullYear()} WhatToCook. Все права защищены.
		</p>
	);
}
