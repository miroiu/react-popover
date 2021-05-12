import React, {
	createContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

export type Position = {
	x?: number;
	y?: number;
};

export type PopoverContextProps = {
	triggerRef: React.MutableRefObject<HTMLElement | null>;
	contentRef: React.MutableRefObject<HTMLDivElement | null>;
	position: Position;
	desiredWidth?: number;
	isOpen: boolean;
	close: () => void;
};

export const PopoverContext = createContext<PopoverContextProps>({
	position: {},
	isOpen: false,
	triggerRef: undefined!,
	contentRef: undefined!,
	close: () => {},
});

export const usePopover = (): PopoverContextProps => {
	const [position, setPosition] = useState<Position>({});
	const [isOpen, setIsOpen] = useState(false);
	const [desiredWidth, setDesiredWidth] = useState<number>();
	const triggerRef = useRef<HTMLElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const originalContentWidthRef = useRef<number>();

	const close = () => setIsOpen(false);

	useEffect(() => {
		const onTrigger = () => {
			setIsOpen(prev => !prev);
		};

		const target = triggerRef.current;
		if (target) {
			target.addEventListener('click', onTrigger);
		}

		return () => {
			if (target) {
				target.removeEventListener('click', onTrigger);
			}
		};
	}, []);

	useLayoutEffect(() => {
		if (isOpen) {
			const target = triggerRef.current!;
			const rect = target.getBoundingClientRect();

			let left = rect.left;
			let top = rect.bottom;

			if (contentRef.current) {
				const contentSize = contentRef.current.getBoundingClientRect();
				let contentWidth = contentSize.width;
				let contentHeight = contentSize.height;

				if (!originalContentWidthRef.current) {
					originalContentWidthRef.current = contentWidth;
				}

				if (originalContentWidthRef.current < rect.width) {
					setDesiredWidth(rect.width);
					contentWidth = rect.width;
				}

				if (window.innerWidth - left < contentWidth) {
					left -= contentWidth - rect.width;
				}

				if (window.innerHeight - top < contentHeight) {
					top -= contentHeight + rect.height;
				}
			}

			setPosition({
				x: left,
				y: top,
			});
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			const handleWheel = (ev: Event) => {
				const target = ev.target as HTMLElement;

				if (
					contentRef.current &&
					!contentRef.current.contains(target)
				) {
					close();
				}
			};

			window.addEventListener('mousewheel', handleWheel);
			window.addEventListener('resize', close);

			return () => {
				window.removeEventListener('mousewheel', handleWheel);
				window.removeEventListener('resize', close);
			};
		}
	}, [isOpen]);

	useEffect(() => {
		const target = triggerRef.current;

		if (isOpen && target) {
			const handleKey = (ev: KeyboardEvent) => {
				if (
					contentRef.current &&
					['tab', 'arrowdown', 'arrowup'].includes(
						ev.key.toLowerCase()
					)
				) {
					contentRef.current.focus();
				}
			};

			target.addEventListener('keydown', handleKey);

			return () => {
				target.removeEventListener('keydown', handleKey);
			};
		}
	}, [isOpen]);

	return { triggerRef, contentRef, position, desiredWidth, isOpen, close };
};
