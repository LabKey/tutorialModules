/*
 * Copyright (c) 2023-2026 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
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