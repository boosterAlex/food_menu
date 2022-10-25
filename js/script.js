'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const modal = require('./modules/modal');
    const calc = require('./modules/calc');
    const cards = require('./modules/cards');
    const forms = require('./modules/forms');
    const slider = require('./modules/slider');
    const timer = require('./modules/timer');

    tabs();
    modal();
    calc();
    cards();
    forms();
    slider();
    timer();
});
