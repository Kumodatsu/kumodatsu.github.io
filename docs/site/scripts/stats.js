/*
    Logic
*/

const levels = {
    Novice:     1,
    Apprentice: 2,
    Adept:      3,
    Expert:     4,
    Master:     5
};

const attrib_min     = 5;
const attrib_max     = 24;
const attrib_default = 10;

function get_level_hp_bonus(level) {
    return 2 * levels[level];
}

function get_level_sp_bonus(level) {
    return 14 + 2 * levels[level];
}

function get_available_sp(level) {
    return 60 + get_level_sp_bonus(level);
}

function get_heal_mod(value) {
    let mod = Math.floor((value - 10) / 2);
    return Math.max(0, mod);
}

function get_hp(level, con) {
    return get_level_hp_bonus(level) + con;
}

function fold(xs, s, f) {
    for (const [key, value] of Object.entries(xs)) {
        s = f(key, value, s);
    }
    return s;
}

/*
    HTML manipulation
*/

function get_attribs() {
    return document.getElementsByClassName("attrib");
}

function on_attrib_changed() {
    const level = document.getElementById("level").value;
    const total_sp = fold(get_attribs(), 0, (_, attrib, s) => {
        return s + parseInt(attrib.value, 10);
    });
    const available_sp = get_available_sp(level);
    const hp = get_hp(level, parseInt(document.getElementById("con").value, 10));
    const healmod = get_heal_mod(parseInt(document.getElementById("cha").value, 10));
    document.getElementById("hp").innerHTML      = hp;
    document.getElementById("healmod").innerHTML = "+" + healmod;
    document.getElementById("sp").innerHTML      = available_sp - total_sp;
}

/*
    Initialization
*/

for (let elem of get_attribs()) {
    elem.min          = attrib_min;
    elem.max          = attrib_max;
    elem.defaultValue = attrib_default;
    elem.value        = attrib_default;
}

document.getElementById("level").value = "Adept";
