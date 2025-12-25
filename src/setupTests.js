import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// This connects the "expect" command to the special HTML matchers
expect.extend(matchers);