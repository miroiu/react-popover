# react-popover

> React popover component

[![NPM](https://img.shields.io/npm/v/@miroiu/react-popover.svg)](https://www.npmjs.com/package/@miroiu/react-popover)

## Install

```bash
npm install @miroiu/react-popover
```

## Usage

```tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	Popover,
	PopoverTrigger,
	PopoverClose,
	PopoverContent,
} from '@miroiu/react-popover';
import styled from '@emotion/styled';

const FancyButton = styled.button`
	outline: none;
	padding: 5px 10px;
	background-color: white;
	border: none;
	cursor: pointer;
	min-width: 80px;
	text-align: left;

	:hover {
		background-color: #d1d1d1;
	}
`;

const FancyText = styled.p`
	font-size: 14px;
	padding: 0 5px;
`;

const Dropdown: React.FC<{
	values: string[];
	onChange: (value: string) => void;
}> = ({ values, onChange }) => {
	const [selected, setSelected] = useState(values[0]);
	return (
		<Popover>
			<PopoverTrigger>
				<FancyButton>{values[0]}</FancyButton>
			</PopoverTrigger>
			<PopoverContent closeOnClick={false}>
				<PopoverClose>
					{values.map((value, index) => (
						<FancyButton
							key={index}
							onClick={() => {
								onChange(value);
								setSelected(value);
							}}
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

const possibleValues = ['red', 'green', 'blue', 'white', 'black'];

const App: React.FC = () => {
	const [selected, setSelected] = useState(possibleValues[0]);

	return (
		<div>
			<Dropdown values={possibleValues} onChange={setSelected} />
			<FancyText style={{ color: 'white' }}>
				Selected value: {selected}
			</FancyText>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
```

PopoverContent props:

```js
	closeOnClick?: boolean; // makes everything under PopoverContent close on click
```

## License

MIT © [miroiu](https://github.com/miroiu)

> Note to self: Make sure you delete react and react-dom from node_modules in library otherwise you'll get an 'Invalid hook call' error
