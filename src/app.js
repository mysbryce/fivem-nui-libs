import { useState, addFunction } from './xnets.js';

document.addEventListener('DOMContentLoaded', () => {
    const [active, setActive] = useState(1, 'active');

    addFunction('setActive', (id) => setActive(id));
});