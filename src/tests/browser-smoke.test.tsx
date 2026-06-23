import { describe, it, expect } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';

describe('Browser Smoke Test', () => {
  it('should render a react component in browser', async () => {
    const div = document.createElement('div');
    div.id = 'smoke-test-div';
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(React.createElement('span', { id: 'rendered-text' }, 'Hello Browser!'));

    // Wait a brief moment for React to render
    await new Promise(resolve => setTimeout(resolve, 100));

    const element = document.getElementById('rendered-text');
    expect(element).not.toBeNull();
    expect(element?.textContent).toBe('Hello Browser!');

    // Cleanup
    root.unmount();
    document.body.removeChild(div);
  });
});
