import styled from '@emotion/styled';
import { useClickOutside } from './useClickOutside';
import React, { Children, cloneElement, useContext } from 'react';
import { PopoverContext, usePopover } from './usePopover';
import type { Position } from './usePopover';
import { Portal } from './Portal';

export const Popover: React.FC = ({ children }) => {
	const value = usePopover();

	return (
		<PopoverContext.Provider value={value}>
			{children}
		</PopoverContext.Provider>
	);
};

export const PopoverTrigger: React.FC = ({ children }) => {
	const { triggerRef } = useContext(PopoverContext);

	const child: any = Children.only(children);
	const clone = cloneElement(child, { ref: triggerRef });

	return clone;
};

export const PopoverClose: React.FC = ({ children }) => {
	const { close } = useContext(PopoverContext);

	return (
		<>
			{Children.map(children, (child: any) => {
				const originalClick = child.props.onClick;
				return cloneElement(child, {
					onClick: () => {
						if (originalClick) {
							originalClick();
						}
						close();
					},
				});
			})}
		</>
	);
};

const PopoverContentWrapper = styled.div<
	Position & { isOpen: boolean; width?: number }
>`
	position: absolute;
	box-sizing: border-box;
	z-index: 10;
	/* transform: translate(${props => props.x}px, ${props => props.y}px); */
	left: ${props => props.x}px;
	top: ${props => props.y}px;
	${props => props.width && `max-width: ${props.width}px; width: 100%`};
	visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`;

const PopoverBody = styled.div`
	display: flex;
	flex-direction: column;

	position: relative;

	background-color: white;
	border-radius: 3px;
	box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px,
		rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
`;

export const PopoverContent: React.FC<
	{
		closeOnClick?: boolean;
	} & React.HTMLAttributes<HTMLDivElement>
> = ({ children, closeOnClick, className, ...rest }) => {
	const { triggerRef, contentRef, position, isOpen, close, desiredWidth } =
		useContext(PopoverContext);
	useClickOutside(contentRef, isOpen, close, triggerRef.current);

	const content = (
		<PopoverContentWrapper
			{...rest}
			{...position}
			width={desiredWidth}
			isOpen={isOpen}
			ref={contentRef}
			tabIndex={0}
		>
			<PopoverBody className={className}>{children}</PopoverBody>
		</PopoverContentWrapper>
	);

	return closeOnClick ? (
		<Portal>{isOpen && <PopoverClose>{content}</PopoverClose>}</Portal>
	) : (
		<Portal>{isOpen && content}</Portal>
	);
};
