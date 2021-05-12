import { useEffect, useRef } from 'react';

export const useClickOutside = (
	ref: React.MutableRefObject<HTMLDivElement | null>,
	isOpen: boolean,
	handler: () => void,
	trigger?: HTMLElement | null
) => {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		if (isOpen) {
			const handleClick = (ev: MouseEvent) => {
				const target = ev.target as HTMLElement;
				if (
					ref.current &&
					(!trigger || !trigger.contains(target)) &&
					!ref.current.contains(target)
				) {
					handlerRef.current();
				}
			};

			window.addEventListener('click', handleClick);
			return () => {
				window.removeEventListener('click', handleClick);
			};
		}
	}, [isOpen, trigger, ref]);
};
