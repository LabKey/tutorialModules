import React from 'react';
import { render } from '@testing-library/react';
import { App } from './HelloWorld';

describe('HelloWorld', () => {

    test('HelloWorld Text', () => {
        render(<App />);

        // Verify Hello World! text
        const helloWorldSpan = document.querySelector('.world-highlight');
        expect(helloWorldSpan).toBeInTheDocument();
        expect(helloWorldSpan.innerHTML).toEqual('Hello World!');
    });
});