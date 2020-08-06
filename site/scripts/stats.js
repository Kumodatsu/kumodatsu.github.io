/*
    Logic
*/

const levels = [
    { name: "Novice",     power: 1 },
    { name: "Apprentice", power: 2 },
    { name: "Adept",      power: 3 },
    { name: "Expert",     power: 4 },
    { name: "Master",     power: 5 },
];

const attrib_min = 5;
const attrib_max = 24;

function get_level_hp_bonus(level) {
    return 2 * level.power;
}

function get_level_sp_bonus(level) {
    return 14 + 2 * level.power;
}

function get_heal_mod(value) {
    let mod = Math.floor((value - 10) / 2);
    return Math.max(0, mod);
}

function get_hp(level, con) {
    return get_level_hp_bonus(level) + con;
}

/*
    State
*/

let stats = {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
};

/*
    HTML manipulation
*/

let html_stats = document.getElementsByClassName("stat_attribute");
html_stats.forEach((value, index, array) => {

});
