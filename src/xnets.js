'use strict';

const states = {};
const renderers = {};
const listeners = {};

/**
 * 
 * 
 * Stored in this file
 * 
 * 
 */

function rerender(name, value) {
    renderers[name].element.forEach(element => element.innerHTML = value);
    queryStatement(name);
}

function getStateValue(name) {
    if(name in renderers) {
        return renderers[name].getState();
    }
}

function queryStatement(name) {
    renderers[name].statement.forEach(element => {
        let args = element.getAttribute('show-on').split(' ');
        let classToShow = element.getAttribute('show-class');
        let classToHide = element.getAttribute('hide-class');
        let stateValue = renderers[name].getState();

        if((typeof stateValue === 'string' && stateValue.length > 0) || stateValue > 0) {
            let operator = args[1];
            let targetValue = args[2];
            let template = `${stateValue} ${operator === 'equal' ? '==' : '!='} ${targetValue}`;
            let output = eval(template);

            if(output === true) {
                element.classList.add(classToShow);
                element.classList.remove(classToHide);
            } else {
                element.classList.add(classToHide);
                element.classList.remove(classToShow);
            }
        }
    });
}

/**
 * 
 * 
 * Exported functions
 * 
 * 
 */

export function addFunction(name, cb) {
    window[name] = cb;
}

export function addFunctions(list) {
    for(const name in list) {
        addFunction(name, list[name]);
    }
}

export function useState(defValue, name = false) {
    let stateName = Object.keys(states) + 1;

    states['_' + stateName] = defValue;
    Object.defineProperty(states, stateName, {
        set: function(value) {
            this['_' + stateName] = value;
            if(name in renderers) {
                rerender(name, value);
            }
        },

        get: function() {
            return this['_' + stateName];
        }
    });

    const getter = () => states[stateName];

    const setter = (newValue) => {
        states[stateName] = newValue;
    };

    if(name) {
        renderers[name] = {
            element: document.querySelectorAll(`[data-xnets="${name}"]`),
            state: stateName,
            setState: setter,
            getState: getter,
            statement: []
        };

        rerender(name, defValue);
    }

    return [
        getter,
        setter
    ];
}

export function addListener(type, cb) {
    if(type in listeners) {
        throw `FIVEM-NUI-LIB : Cannot add one more event of ${type} because it is already exists!`;
    }

    listeners[type] = cb;
}

/**
 * 
 * 
 * Window Events
 * 
 * 
 */

window.addEventListener('message', e => {
    let data = e.data;
    if('type' in data) {
        let type = data.type;

        if(type in listeners) {
            listeners[type](data);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        let onClickElements = document.querySelectorAll('[data-xnets-click]');
        onClickElements.forEach(element => element.addEventListener('click', (e) => {
            let cbString = e.currentTarget.getAttribute('data-xnets-click');
            eval(cbString);
        }));

        let refElements = document.querySelectorAll('input[data-xnets-ref]');
        refElements.forEach(element => element.addEventListener('keyup', (e) => {
            let newValue = e.currentTarget.value;
            let refTarget = e.currentTarget.getAttribute('data-xnets-ref');
            if(refTarget in renderers) {
                let data = renderers[refTarget];
                data.setState(newValue);
            }
        }));

        let showOnElements = document.querySelectorAll('[show-on]');
        showOnElements.forEach(element => {
            let args = element.getAttribute('show-on').split(' ');
            let stateName = args[0];
            if(stateName in renderers) {
                renderers[stateName].statement.push(element);
            }
        });

        for(const index in renderers) {
            queryStatement(index);
        }
    }, 0);
});