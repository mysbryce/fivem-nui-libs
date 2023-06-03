import { useState, addFunction } from '../src/xnets.js';

document.addEventListener('DOMContentLoaded', () => {
    const [active, setActive] = useState(1, 'active');

    addFunction('setActive', (id) => setActive(id));
});