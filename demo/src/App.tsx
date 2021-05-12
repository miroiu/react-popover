import React, { useState } from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverClose,
	PopoverContent,
} from '@miroiu/react-popover';
import styled from '@emotion/styled';

const FancyButton = styled.button`
	font-family: 'Source Code Pro', monospace;
	outline: none;
	padding: 5px 10px;
	background-color: white;
	border: none;
	cursor: pointer;
	min-width: 80px;
	text-align: left;

	:hover,
	:focus {
		background-color: #d1d1d1;
	}
`;

const FancyText = styled.p`
	font-family: 'Source Code Pro', monospace;
	font-size: 14px;
	padding: 0 5px;
	white-space: nowrap;
`;

const HugeText = styled.p`
	font-size: 36px;
	font-family: 'Source Code Pro', monospace;
`;

const Dropdown: React.FC<{
	values: string[];
	onChange: (value: string) => void;
}> = ({ values, onChange }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<FancyButton>{values[0]}</FancyButton>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverClose>
					{values.map((value, index) => (
						<FancyButton
							key={index}
							onClick={() => onChange(value)}
						>
							{value}
						</FancyButton>
					))}
				</PopoverClose>
				<FancyText>Won't close on click</FancyText>
			</PopoverContent>
		</Popover>
	);
};

const possibleValues = [
	'white',
	'yellow',
	'orange',
	'orangered',
	'green',
	'yellowgreen',
];

const Bottom = styled.div`
	position: absolute;
	bottom: 10px;
`;

const Right = styled.div`
	position: absolute;
	right: 10px;
`;

const Left = styled.div`
	position: absolute;
	left: 10px;
`;

const BottomRight = styled.div`
	position: absolute;
	right: 10px;
	bottom: 10px;
`;

const Center = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 98%;
	width: 98%;
`;

const Button = styled.a`
	text-decoration: none;
	cursor: pointer;
	user-select: none;
	color: #abddff;
	transition: all 0.2s;
	font-family: 'Source Code Pro', monospace;
	font-size: 1.1rem;
	font-weight: bold;
	letter-spacing: 0.01em;

	&:hover {
		color: white;
	}
`;

export const App: React.FC = () => {
	const [selected, setSelected] = useState(possibleValues[0]);

	return (
		<div>
			<Center>
				<HugeText style={{ color: selected }}>
					Selected value: {selected}
				</HugeText>
				<Button href="https://github.com/miroiu/react-popover">
					View on Github
				</Button>
			</Center>
			<Left>
				<Dropdown values={possibleValues} onChange={setSelected} />
			</Left>
			<Bottom>
				<Dropdown values={possibleValues} onChange={setSelected} />
			</Bottom>
			<Right>
				<Dropdown values={possibleValues} onChange={setSelected} />
			</Right>
			<BottomRight>
				<Dropdown values={possibleValues} onChange={setSelected} />
			</BottomRight>
		</div>
	);
};
