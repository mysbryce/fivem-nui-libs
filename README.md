# 🔥 FIVEM-NUI-LIB (Open Source Project)

A FiveM NUI Library created to make your code look eaiser and shorter. There are a lots of way to make the things you want. And I'm sure that my library will be much better than before.

## Features

* **Real-Time Update**
  Just like state in React. When variable has changed value the component on website will be updated too.
  And the element in HTML can be showed or hidden by changing state value.
* **Input Ref**
  Based on state. When input text change the state value will be updated automatically.

## Usage

##### Initialize

Create and add `script` tag and use type `module` in that

```html
// index.html

<script src="app.js" type="module"></script>
```

```javascript
// app.js

import {} from 'path/to/xnets.js';
```

##### Use a State

```javascript
// app.js

import { useState, addFunction } from 'path/to/xnets.js';

document.addEventListener('DOMContentLoaded', () => {
    	const [counter, setCounter] = useState(0, 'counter');
	addFunction('addCount', () => setCounter(counter() + 1));
});
```

```html
// index.html

<span data-xnets="counter"></span>
<button type="button" data-xnets-click="addCount()">Add Count</button>
```

##### Use a Input Ref

```javascript
// app.js

import { useState, addFunction } from 'path/to/xnets.js';

document.addEventListener('DOMContentLoaded', () => {
    	const [title, setTitle] = useState('', 'title');
	addFunction('showTitle', () => alert(title()));
});
```

```html
// index.html

<input type="text" data-xnets-ref="title">
<button type="button" data-xnets-click="showTitle()">Show Title</button>
```

##### Use a Element Show or Hide

```javascript
// app.js

import { useState, addFunction } from 'path/to/xnets.js';

document.addEventListener('DOMContentLoaded', () => {
    const [active, setActive] = useState(1, 'active');

    addFunction('setActive', (id) => setActive(id));
});
```

```html
// index.html

<style>
    .hidden {
        display: none;
    }

    .show {
        display: block;
    }
</style>

<div show-on="active equal 1" show-class="show" hide-class="hidden">Display 1</div>
<div show-on="active equal 2" show-class="show" hide-class="hidden">Display 2</div>
<div show-on="active equal 3" show-class="show" hide-class="hidden">Display 3</div>

<button type="button" data-xnets-click="setActive(1)">Show 1</button>
<button type="button" data-xnets-click="setActive(2)">Show 2</button>
<button type="button" data-xnets-click="setActive(3)">Show 3</button>
```

---

## Thanks you all!

Special thanks to all contributors and supporters that starred this repository.

**Our amazing contributors**

* Kittichai Malain (Frame) (Nervenetts)
* Woradorn Wimonchailerk (Noon) (Nova)
* Puriphong Chonanu (Ko) (Fagile)
