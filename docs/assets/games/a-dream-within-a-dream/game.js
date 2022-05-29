/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __sp_collision() { 
__sprite_init__(this, sp_collision, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_collision_0.png']);
}; var sp_collision = new __sp_collision();

function __sp_collision1() { 
__sprite_init__(this, sp_collision1, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_collision1_0.png']);
}; var sp_collision1 = new __sp_collision1();

function __sp_leveleindt() { 
__sprite_init__(this, sp_leveleindt, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_leveleindt_0.png']);
}; var sp_leveleindt = new __sp_leveleindt();

function __sp_armpie() { 
__sprite_init__(this, sp_armpie, 12, 5, 0, 5, 'Box', 6, 0, 12, 0, 5, ['img/sp_armpie_0.png']);
}; var sp_armpie = new __sp_armpie();

function __sp_jacob_linx() { 
__sprite_init__(this, sp_jacob_linx, 20, 24, 10, 12, 'Box', 10, 0, 20, 0, 24, ['img/sp_jacob_linx_0.png','img/sp_jacob_linx_1.png','img/sp_jacob_linx_2.png','img/sp_jacob_linx_3.png','img/sp_jacob_linx_4.png','img/sp_jacob_linx_5.png','img/sp_jacob_linx_6.png','img/sp_jacob_linx_7.png']);
}; var sp_jacob_linx = new __sp_jacob_linx();

function __sp_berend_linx() { 
__sprite_init__(this, sp_berend_linx, 28, 44, 0, 0, 'Box', 14, 0, 28, 0, 44, ['img/sp_berend_linx_0.png','img/sp_berend_linx_1.png','img/sp_berend_linx_2.png','img/sp_berend_linx_3.png','img/sp_berend_linx_4.png','img/sp_berend_linx_5.png','img/sp_berend_linx_6.png','img/sp_berend_linx_7.png','img/sp_berend_linx_8.png','img/sp_berend_linx_9.png']);
}; var sp_berend_linx = new __sp_berend_linx();

function __sp_berend_rekt() { 
__sprite_init__(this, sp_berend_rekt, 28, 44, 0, 0, 'Box', 14, 0, 28, 0, 44, ['img/sp_berend_rekt_0.png','img/sp_berend_rekt_1.png','img/sp_berend_rekt_2.png','img/sp_berend_rekt_3.png','img/sp_berend_rekt_4.png','img/sp_berend_rekt_5.png','img/sp_berend_rekt_6.png','img/sp_berend_rekt_7.png','img/sp_berend_rekt_8.png','img/sp_berend_rekt_9.png']);
}; var sp_berend_rekt = new __sp_berend_rekt();

function __sp_kogelbief() { 
__sprite_init__(this, sp_kogelbief, 10, 4, 0, 0, 'Box', 5, 0, 10, 0, 4, ['img/sp_kogelbief_0.png']);
}; var sp_kogelbief = new __sp_kogelbief();

function __sp_3hartjes() { 
__sprite_init__(this, sp_3hartjes, 64, 21, 0, 0, 'Box', 32, 0, 64, 0, 21, ['img/sp_3hartjes_0.png']);
}; var sp_3hartjes = new __sp_3hartjes();

function __sp_2hartjes() { 
__sprite_init__(this, sp_2hartjes, 64, 21, 0, 0, 'Box', 32, 0, 64, 0, 21, ['img/sp_2hartjes_0.png']);
}; var sp_2hartjes = new __sp_2hartjes();

function __sp_1hartjes() { 
__sprite_init__(this, sp_1hartjes, 64, 21, 0, 0, 'Box', 32, 0, 64, 0, 21, ['img/sp_1hartjes_0.png']);
}; var sp_1hartjes = new __sp_1hartjes();

function __sp_dood() { 
__sprite_init__(this, sp_dood, 64, 21, 0, 0, 'Box', 32, 0, 64, 0, 21, ['img/sp_dood_0.png']);
}; var sp_dood = new __sp_dood();

function __sp_ricardo_linx() { 
__sprite_init__(this, sp_ricardo_linx, 24, 42, 0, 0, 'Box', 12, 0, 24, 0, 42, ['img/sp_ricardo_linx_0.png','img/sp_ricardo_linx_1.png','img/sp_ricardo_linx_2.png','img/sp_ricardo_linx_3.png','img/sp_ricardo_linx_4.png','img/sp_ricardo_linx_5.png','img/sp_ricardo_linx_6.png','img/sp_ricardo_linx_7.png','img/sp_ricardo_linx_8.png','img/sp_ricardo_linx_9.png']);
}; var sp_ricardo_linx = new __sp_ricardo_linx();

function __sp_ricardo_linx_buk() { 
__sprite_init__(this, sp_ricardo_linx_buk, 24, 42, 0, 0, 'Box', 12, 0, 24, 0, 42, ['img/sp_ricardo_linx_buk_0.png','img/sp_ricardo_linx_buk_1.png','img/sp_ricardo_linx_buk_2.png','img/sp_ricardo_linx_buk_3.png','img/sp_ricardo_linx_buk_4.png','img/sp_ricardo_linx_buk_5.png','img/sp_ricardo_linx_buk_6.png','img/sp_ricardo_linx_buk_7.png']);
}; var sp_ricardo_linx_buk = new __sp_ricardo_linx_buk();

function __sp_ricardo_rekt() { 
__sprite_init__(this, sp_ricardo_rekt, 24, 42, 0, 0, 'Box', 12, 0, 24, 0, 42, ['img/sp_ricardo_rekt_0.png','img/sp_ricardo_rekt_1.png','img/sp_ricardo_rekt_2.png','img/sp_ricardo_rekt_3.png','img/sp_ricardo_rekt_4.png','img/sp_ricardo_rekt_5.png','img/sp_ricardo_rekt_6.png','img/sp_ricardo_rekt_7.png','img/sp_ricardo_rekt_8.png','img/sp_ricardo_rekt_9.png']);
}; var sp_ricardo_rekt = new __sp_ricardo_rekt();

function __sp_ricardo_rekt_buk() { 
__sprite_init__(this, sp_ricardo_rekt_buk, 24, 42, 0, 0, 'Box', 12, 0, 24, 0, 42, ['img/sp_ricardo_rekt_buk_0.png','img/sp_ricardo_rekt_buk_1.png','img/sp_ricardo_rekt_buk_2.png','img/sp_ricardo_rekt_buk_3.png','img/sp_ricardo_rekt_buk_4.png','img/sp_ricardo_rekt_buk_5.png','img/sp_ricardo_rekt_buk_6.png','img/sp_ricardo_rekt_buk_7.png']);
}; var sp_ricardo_rekt_buk = new __sp_ricardo_rekt_buk();

function __sp_collision2() { 
__sprite_init__(this, sp_collision2, 33, 20, 0, 0, 'Box', 16, 0, 33, 0, 20, ['img/sp_collision2_0.png']);
}; var sp_collision2 = new __sp_collision2();

function __sp_collision3() { 
__sprite_init__(this, sp_collision3, 33, 20, 0, 0, 'Box', 16, 0, 33, 0, 20, ['img/sp_collision3_0.png']);
}; var sp_collision3 = new __sp_collision3();

function __sp_kanoon_linx() { 
__sprite_init__(this, sp_kanoon_linx, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_kanoon_linx_0.png','img/sp_kanoon_linx_1.png','img/sp_kanoon_linx_2.png','img/sp_kanoon_linx_3.png','img/sp_kanoon_linx_4.png','img/sp_kanoon_linx_5.png','img/sp_kanoon_linx_6.png']);
}; var sp_kanoon_linx = new __sp_kanoon_linx();

function __sp_kanoonstraal_linx() { 
__sprite_init__(this, sp_kanoonstraal_linx, 32, 10, 0, 0, 'Box', 16, 0, 32, 0, 10, ['img/sp_kanoonstraal_linx_0.png']);
}; var sp_kanoonstraal_linx = new __sp_kanoonstraal_linx();

function __sp_kanoon_rekt() { 
__sprite_init__(this, sp_kanoon_rekt, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_kanoon_rekt_0.png','img/sp_kanoon_rekt_1.png','img/sp_kanoon_rekt_2.png','img/sp_kanoon_rekt_3.png','img/sp_kanoon_rekt_4.png','img/sp_kanoon_rekt_5.png','img/sp_kanoon_rekt_6.png']);
}; var sp_kanoon_rekt = new __sp_kanoon_rekt();

function __sp_kanoonstraal_rekt() { 
__sprite_init__(this, sp_kanoonstraal_rekt, 32, 10, 0, 0, 'Box', 16, 0, 32, 0, 10, ['img/sp_kanoonstraal_rekt_0.png']);
}; var sp_kanoonstraal_rekt = new __sp_kanoonstraal_rekt();

function __sp_hart() { 
__sprite_init__(this, sp_hart, 21, 21, 10, 10, 'Box', 10, 0, 21, 0, 21, ['img/sp_hart_0.png']);
}; var sp_hart = new __sp_hart();

function __sp_collision4() { 
__sprite_init__(this, sp_collision4, 33, 33, 0, 0, 'Box', 16, 0, 33, 0, 33, ['img/sp_collision4_0.png']);
}; var sp_collision4 = new __sp_collision4();

function __sp_mund() { 
__sprite_init__(this, sp_mund, 99, 114, 52, 90, 'Circle', 56, 0, 99, 0, 114, ['img/sp_mund_0.png']);
}; var sp_mund = new __sp_mund();

function __sp_pijl() { 
__sprite_init__(this, sp_pijl, 22, 10, 0, 0, 'Box', 11, 0, 6, 0, 10, ['img/sp_pijl_0.png']);
}; var sp_pijl = new __sp_pijl();

function __sp_edwin() { 
__sprite_init__(this, sp_edwin, 36, 40, 0, 0, 'Box', 18, 0, 36, 0, 40, ['img/sp_edwin_0.png','img/sp_edwin_1.png']);
}; var sp_edwin = new __sp_edwin();

function __sp_edwin_rekt() { 
__sprite_init__(this, sp_edwin_rekt, 36, 40, 0, 0, 'Box', 18, 0, 36, 0, 40, ['img/sp_edwin_rekt_0.png','img/sp_edwin_rekt_1.png']);
}; var sp_edwin_rekt = new __sp_edwin_rekt();

function __sp_pijl_rekt() { 
__sprite_init__(this, sp_pijl_rekt, 22, 10, 0, 0, 'Box', 11, 16, 22, 0, 10, ['img/sp_pijl_rekt_0.png']);
}; var sp_pijl_rekt = new __sp_pijl_rekt();

function __sp_jacob_rekt() { 
__sprite_init__(this, sp_jacob_rekt, 20, 24, 10, 12, 'Box', 10, 0, 20, 0, 24, ['img/sp_jacob_rekt_0.png','img/sp_jacob_rekt_1.png','img/sp_jacob_rekt_2.png','img/sp_jacob_rekt_3.png','img/sp_jacob_rekt_4.png','img/sp_jacob_rekt_5.png','img/sp_jacob_rekt_6.png','img/sp_jacob_rekt_7.png']);
}; var sp_jacob_rekt = new __sp_jacob_rekt();

function __sp_jacob_linx_spring() { 
__sprite_init__(this, sp_jacob_linx_spring, 20, 24, 10, 12, 'Box', 10, 0, 20, 0, 24, ['img/sp_jacob_linx_spring_0.png']);
}; var sp_jacob_linx_spring = new __sp_jacob_linx_spring();

function __sp_jacob_rekt_spring() { 
__sprite_init__(this, sp_jacob_rekt_spring, 20, 24, 10, 12, 'Box', 10, 0, 20, 0, 24, ['img/sp_jacob_rekt_spring_0.png']);
}; var sp_jacob_rekt_spring = new __sp_jacob_rekt_spring();

function __sp_armpie_linx() { 
__sprite_init__(this, sp_armpie_linx, 12, 5, 12, 5, 'Box', 6, 0, 12, 0, 5, ['img/sp_armpie_linx_0.png']);
}; var sp_armpie_linx = new __sp_armpie_linx();

function __sp_yogbert_linx() { 
__sprite_init__(this, sp_yogbert_linx, 32, 44, 0, 0, 'Box', 16, 0, 32, 0, 44, ['img/sp_yogbert_linx_0.png','img/sp_yogbert_linx_1.png','img/sp_yogbert_linx_2.png','img/sp_yogbert_linx_3.png','img/sp_yogbert_linx_4.png','img/sp_yogbert_linx_5.png','img/sp_yogbert_linx_6.png','img/sp_yogbert_linx_7.png','img/sp_yogbert_linx_8.png','img/sp_yogbert_linx_9.png']);
}; var sp_yogbert_linx = new __sp_yogbert_linx();

function __sp_yogbert_rekt() { 
__sprite_init__(this, sp_yogbert_rekt, 32, 44, 0, 0, 'Box', 0, 0, 32, 0, 44, ['img/sp_yogbert_rekt_0.png','img/sp_yogbert_rekt_1.png','img/sp_yogbert_rekt_2.png','img/sp_yogbert_rekt_3.png','img/sp_yogbert_rekt_4.png','img/sp_yogbert_rekt_5.png','img/sp_yogbert_rekt_6.png','img/sp_yogbert_rekt_7.png','img/sp_yogbert_rekt_8.png','img/sp_yogbert_rekt_9.png']);
}; var sp_yogbert_rekt = new __sp_yogbert_rekt();

function __sp_bermhart_linx() { 
__sprite_init__(this, sp_bermhart_linx, 24, 40, 0, 0, 'Box', 12, 0, 24, 0, 40, ['img/sp_bermhart_linx_0.png','img/sp_bermhart_linx_1.png','img/sp_bermhart_linx_2.png','img/sp_bermhart_linx_3.png','img/sp_bermhart_linx_4.png','img/sp_bermhart_linx_5.png','img/sp_bermhart_linx_6.png','img/sp_bermhart_linx_7.png','img/sp_bermhart_linx_8.png','img/sp_bermhart_linx_9.png']);
}; var sp_bermhart_linx = new __sp_bermhart_linx();

function __sp_bermhart_rekt() { 
__sprite_init__(this, sp_bermhart_rekt, 24, 40, 0, 0, 'Box', 12, 0, 24, 0, 40, ['img/sp_bermhart_rekt_0.png','img/sp_bermhart_rekt_1.png','img/sp_bermhart_rekt_2.png','img/sp_bermhart_rekt_3.png','img/sp_bermhart_rekt_4.png','img/sp_bermhart_rekt_5.png','img/sp_bermhart_rekt_6.png','img/sp_bermhart_rekt_7.png','img/sp_bermhart_rekt_8.png','img/sp_bermhart_rekt_9.png']);
}; var sp_bermhart_rekt = new __sp_bermhart_rekt();

function __sp_bermhart_linx_buk() { 
__sprite_init__(this, sp_bermhart_linx_buk, 24, 40, 0, 0, 'Box', 12, 0, 24, 0, 40, ['img/sp_bermhart_linx_buk_0.png','img/sp_bermhart_linx_buk_1.png','img/sp_bermhart_linx_buk_2.png','img/sp_bermhart_linx_buk_3.png','img/sp_bermhart_linx_buk_4.png','img/sp_bermhart_linx_buk_5.png','img/sp_bermhart_linx_buk_6.png','img/sp_bermhart_linx_buk_7.png']);
}; var sp_bermhart_linx_buk = new __sp_bermhart_linx_buk();

function __sp_bermhart_rekt_buk() { 
__sprite_init__(this, sp_bermhart_rekt_buk, 24, 40, 0, 0, 'Box', 12, 0, 24, 0, 40, ['img/sp_bermhart_rekt_buk_0.png','img/sp_bermhart_rekt_buk_1.png','img/sp_bermhart_rekt_buk_2.png','img/sp_bermhart_rekt_buk_3.png','img/sp_bermhart_rekt_buk_4.png','img/sp_bermhart_rekt_buk_5.png','img/sp_bermhart_rekt_buk_6.png','img/sp_bermhart_rekt_buk_7.png']);
}; var sp_bermhart_rekt_buk = new __sp_bermhart_rekt_buk();

function __sp_mund_spuug() { 
__sprite_init__(this, sp_mund_spuug, 99, 114, 52, 90, 'Circle', 56, 0, 99, 0, 114, ['img/sp_mund_spuug_0.png']);
}; var sp_mund_spuug = new __sp_mund_spuug();

function __sp_ijs() { 
__sprite_init__(this, sp_ijs, 30, 30, 15, 15, 'Circle', 15, 0, 30, 0, 30, ['img/sp_ijs_0.png']);
}; var sp_ijs = new __sp_ijs();

function __sp_mund_linx() { 
__sprite_init__(this, sp_mund_linx, 99, 114, 52, 90, 'Circle', 56, 0, 99, 0, 114, ['img/sp_mund_linx_0.png']);
}; var sp_mund_linx = new __sp_mund_linx();

function __sp_mund_spuug_linx() { 
__sprite_init__(this, sp_mund_spuug_linx, 99, 114, 52, 90, 'Circle', 56, 0, 99, 0, 114, ['img/sp_mund_spuug_linx_0.png']);
}; var sp_mund_spuug_linx = new __sp_mund_spuug_linx();

function __sp_sploos() { 
__sprite_init__(this, sp_sploos, 64, 64, 0, 0, 'Circle', 24, 0, 64, 0, 64, ['img/sp_sploos_0.png','img/sp_sploos_1.png','img/sp_sploos_2.png','img/sp_sploos_3.png','img/sp_sploos_4.png','img/sp_sploos_5.png','img/sp_sploos_6.png','img/sp_sploos_7.png','img/sp_sploos_8.png','img/sp_sploos_9.png']);
}; var sp_sploos = new __sp_sploos();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __sd_sploos() { 
__audio_init__(this, sd_sploos, 'aud/explosion.wav', '', '');
}; var sd_sploos = new __sd_sploos();

function __sd_kogelbief() { 
__audio_init__(this, sd_kogelbief, 'aud/gunshot1.wav', '', '');
}; var sd_kogelbief = new __sd_kogelbief();

function __sd_pijl() { 
__audio_init__(this, sd_pijl, 'aud/boink2.wav', '', '');
}; var sd_pijl = new __sd_pijl();

function __sd_straal() { 
__audio_init__(this, sd_straal, 'aud/zap.wav', '', '');
}; var sd_straal = new __sd_straal();



/***********************************************************************
 * MUSICS
 ***********************************************************************/
function __mus_amomenttomyself() { 
// __audio_init__(this, mus_amomenttomyself, '', 'aud/AMomenttoMyself.mp3', '');
}; var mus_amomenttomyself = new __mus_amomenttomyself();

function __mus_solstice() { 
// __audio_init__(this, mus_solstice, '', 'aud/Solstice.mp3', '');
}; var mus_solstice = new __mus_solstice();

function __mus_valhalla() { 
// __audio_init__(this, mus_valhalla, '', 'aud/Valhalla.mp3', '');
}; var mus_valhalla = new __mus_valhalla();

function __mus_terriblefate() { 
// __audio_init__(this, mus_terriblefate, '', 'aud/TerribleFate.mp3', '');
}; var mus_terriblefate = new __mus_terriblefate();

function __mus_inthehouseinaheartbeat() { 
// __audio_init__(this, mus_inthehouseinaheartbeat, '', 'aud/InTheHouseInAHeartbeat.mp3', '');
}; var mus_inthehouseinaheartbeat = new __mus_inthehouseinaheartbeat();



/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __bg_blokkie() { 
__background_init__(this, bg_blokkie, 'img/sp_bloque_0.png')}; var bg_blokkie = new __bg_blokkie();

function __bg_world1() { 
__background_init__(this, bg_world1, 'img/bgworld1.png')}; var bg_world1 = new __bg_world1();

function __bg_world2() { 
__background_init__(this, bg_world2, 'img/bgworld2.png')}; var bg_world2 = new __bg_world2();

function __bg_word3() { 
__background_init__(this, bg_word3, 'img/bgworld3.png')}; var bg_word3 = new __bg_word3();

function __tlset_platform() { 
__background_init__(this, tlset_platform, 'img/tlset_platform.png')}; var tlset_platform = new __tlset_platform();

function __tlset_plateau() { 
__background_init__(this, tlset_plateau, 'img/tlset_plateau.png')}; var tlset_plateau = new __tlset_plateau();

function __tlset_grass() { 
__background_init__(this, tlset_grass, 'img/tlset_grass2.png')}; var tlset_grass = new __tlset_grass();

function __bg_world1_1() { 
__background_init__(this, bg_world1_1, 'img/bgworld1-1.png')}; var bg_world1_1 = new __bg_world1_1();

function __bg_world2_1() { 
__background_init__(this, bg_world2_1, 'img/bgworld2-1.png')}; var bg_world2_1 = new __bg_world2_1();

function __tlset_grass_2() { 
__background_init__(this, tlset_grass_2, 'img/tlset_grass3.png')}; var tlset_grass_2 = new __tlset_grass_2();

function __tlset_plateau_2() { 
__background_init__(this, tlset_plateau_2, 'img/tlset_plateau2.png')}; var tlset_plateau_2 = new __tlset_plateau_2();

function __tlset_platform_2() { 
__background_init__(this, tlset_platform_2, 'img/tlset_platform2.png')}; var tlset_platform_2 = new __tlset_platform_2();

function __bg_world2_2() { 
__background_init__(this, bg_world2_2, 'img/bgworld2-2.png')}; var bg_world2_2 = new __bg_world2_2();

function __bg_menuutje() { 
__background_init__(this, bg_menuutje, 'img/achtergrondmenu.png')}; var bg_menuutje = new __bg_menuutje();

function __tlset_metal() { 
__background_init__(this, tlset_metal, 'img/tlset_grass4.png')}; var tlset_metal = new __tlset_metal();

function __bg_menuutje1() { 
__background_init__(this, bg_menuutje1, 'img/achtergrondmenu1.png')}; var bg_menuutje1 = new __bg_menuutje1();

function __bg_world3_1() { 
__background_init__(this, bg_world3_1, 'img/bgworld3-1.png')}; var bg_world3_1 = new __bg_world3_1();

function __bg_menuutje2() { 
__background_init__(this, bg_menuutje2, 'img/achtergrondmenu2.png')}; var bg_menuutje2 = new __bg_menuutje2();



/***********************************************************************
 * FONTS
 ***********************************************************************/
function __fn_arial() { 
__font_init__(this, fn_arial, 'Arial', 12, 0, 0)}; var fn_arial = new __fn_arial();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __ob_hansch() {
__instance_init__(this, ob_hansch, null, 1, 0, sp_jacob_rekt, 1, 0);
this.on_creation = function() {
with(this) {
/** 
"I hope you didn't bring all of your dignity with you, 'cuz there'll be nothing left when I'm done with you."
-Jacob Freud, 1896
**/

//beginvariabelen
this.jump = 0;
this.v_y = 0;
this.richting = "rechts";


}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
//hp-systeem
if (hp < 0) {hp = 0;}
if (hp > 3) {hp = 3;}
if (hp == 0) {
  x = xstart;
  y = ystart;
  hp = 2;
  }

//horizontale besturing
if ( keyboard_check( vk_a )) {
  richting = "links";
  sprite_index = sp_jacob_linx;
  image_speed = 0.6;
  x = x - 5;
  if (place_meeting(x,y,ob_collision) != null) {x = xprevious;}
} else if ( keyboard_check( vk_d )) {
  richting = "rechts";
  sprite_index = sp_jacob_rekt; 
  image_speed = 0.6;
  x = x + 5;
  if (place_meeting(x,y,ob_collision) != null) {x = xprevious;}
} else {
  image_speed = 0;
  }

//springen
if(keyboard_check_pressed(vk_w) && jump < 2) {
  if(jump == 0) {
    if(v_y == 0) {
      jump = jump + 1;
      v_y = 15;
      }
	} else {
	jump = jump + 1;
	v_y = 15;
	}
  }

//vallen
if (v_y > -15 ) {  v_y = v_y - 1.5; }
y = y - v_y;
if (v_y > 0) {
  if (richting == "links") { 
    sprite_index = sp_jacob_linx_spring; 
  } else { 
	sprite_index = sp_jacob_rekt_spring; 
	}
} else if (richting == "links") { 
  sprite_index = sp_jacob_linx; 
  } else { 
    sprite_index = sp_jacob_rekt; 
  }


//afgrond
if ( x < 0 ) { x = 0; } 
if ( x > room_width ) { x = room_width; }
if ( y > room_height ) { 
  hp = 0;
  }
  
//gerekt worden
if (place_meeting(x,y,ob_berend) != null || place_meeting(x,y,ob_vijandkogel) != null || place_meeting(x,y,ob_ricardo) != null || place_meeting(x,y,ob_straal_linx) != null || place_meeting(x,y,ob_straal_rekt) != null || place_meeting(x,y,ob_pijl) != null || place_meeting(x,y,ob_pijl_rekt) != null) {
  hp = hp - 1;
  }
  
//level skip NA TESTEN ONSCHADELIJK MAKEN!
/*if (keyboard_check_pressed(vk_t)) {
  room_goto_next();
  }*/
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_collision);
if(this.other != null) {
v_y = 0;
if ( other.y > this.y ) { jump = 0; }
y = yprevious;
}
this.other = this.place_meeting(this.x, this.y, ob_leveleindt);
if(this.other != null) {
room_goto_next();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_hansch = new __ob_hansch();

function __ob_collision() {
__instance_init__(this, ob_collision, null, 1, 0, sp_collision1, 1, 1);
this.on_creation = function() {
with(this) {
//De sprite van het collision-object is aanvankelijk een paars vierkant zodat je kunt zien waar ze staan bij het editen van rooms; Deze code zorgt ervoor dat het onzichtbaar wordt zodra het spel start;
sprite_index = sp_collision;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_collision = new __ob_collision();

function __ob_leveleindt() {
__instance_init__(this, ob_leveleindt, null, 1, 0, sp_leveleindt, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_leveleindt = new __ob_leveleindt();

function __ob_armpie() {
__instance_init__(this, ob_armpie, null, 1, 0, sp_armpie, 1, 3);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
aimr = point_direction(x,y,room_viewport_x + mouse_x, room_viewport_y + mouse_y);
aiml = point_direction(room_viewport_x + mouse_x, room_viewport_y + mouse_y,x,y);
richting = instance_first(ob_hansch).richting;

if ( richting == "rechts" ) { 
  sprite_index = sp_armpie;
  if ( aimr < 75 && aimr > -75) {
    image_angle = aimr;
    }
  if (mouse_pressed) {
    sjoet = instance_create(this.x,this.y - 5,ob_kogelbief);
    sjoet.direction = image_angle;
	sjoet.image_angle = image_angle;
    sjoet.speed = 15;
    }	
} else {
  sprite_index = sp_armpie_linx;
  if ( aiml < 75 && aiml > -105) {
    image_angle = aiml;
    }
  if (mouse_pressed) {
    sjoet = instance_create(this.x,this.y - 5,ob_kogelbief);
    sjoet.direction = image_angle - 180;
	sjoet.image_angle = image_angle - 180;
    sjoet.speed = 15;
    }
  }

this.x = instance_first(ob_hansch).x;
this.y = instance_first(ob_hansch).y;

if ( keyboard_check( vk_a ) ) {
  x = x - 5;
  if (place_meeting(x,y,ob_collision) != null) {x = xprevious;}
  }
if ( keyboard_check( vk_d ) ) {
  x = x + 5;
   if (place_meeting(x,y,ob_collision) != null) {x = xprevious;}
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_armpie = new __ob_armpie();

function __ob_kogelbief() {
__instance_init__(this, ob_kogelbief, null, 1, 0, sp_kogelbief, 1, 4);
this.on_creation = function() {
with(this) {
sound_play(sd_kogelbief);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < -5 || x > room_width + 5 || y < -5 || y > room_height + 5 || place_meeting(x,y,ob_collision) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_kogelbief = new __ob_kogelbief();

function __ob_berend() {
__instance_init__(this, ob_berend, null, 1, 0, sp_berend_linx, 1, 5);
this.on_creation = function() {
with(this) {
/** 
"You might wanna get tissues, because sheet is about to get reel!"
-Blonde Berend, 2014
**/

//beginvariabelen
this.richting = "links";
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.richting == "links") {
  this.x = this.x - 4;
} else {
  this.x = this.x + 4;
  }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_collision2) != null) {
  if (this.richting == "links") {
    sprite_index = sp_berend_rekt;
	this.x = this.xprevious;
    this.richting = "rechts";
  } else {
	sprite_index = sp_berend_linx;
	this.x = this.xprevious;
	this.richting = "links";
	}
  }

}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_kogelbief);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_berend = new __ob_berend();

function __ob_leven() {
__instance_init__(this, ob_leven, null, 1, 0, sp_3hartjes, 1, 6);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
x = xstart + room_viewport_x;
y = ystart + room_viewport_y;

if (hp == 3) {
  sprite_index = sp_3hartjes;
  }
  
  if (hp == 2) {
  sprite_index = sp_2hartjes;
  }
  
  if (hp == 1) {
  sprite_index = sp_1hartjes;
  }
  
  if (hp == 0) {
  sprite_index = sp_dood;
  }
  
  
  

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_leven = new __ob_leven();

function __ob_ricardo() {
__instance_init__(this, ob_ricardo, null, 1, 0, sp_ricardo_linx, 1, 7);
this.on_creation = function() {
with(this) {
/**
"Say hello to my little friend!"
-Rake Ricardo, 2014
**/

//beginvariabelen
animatie = 0;
image_speed = 0.6;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.richting == "links") {
  sprite_index = sp_ricardo_linx;
  this.x = this.x - 4;
} else {
  sprite_index = sp_ricardo_rekt;
  this.x = this.x + 4;
  }

if (place_meeting(this.x,this.y,ob_collision) != null) {
  if (this.richting == "links") {
    sprite_index = sp_ricardo_rekt;
	this.x = this.xprevious;
    this.richting = "rechts";
  } else {
	sprite_index = sp_ricardo_linx;
	this.x = this.xprevious;
	this.richting = "links";
	}
  }
  
if (animatie > 3 ) {
  if (richting == "links") { 
    buk = instance_create(this.x,this.y,ob_ricardo_buk_linx);
  } else {
    buk = instance_create(this.x,this.y,ob_ricardo_buk_rekt);
	}
  instance_destroy(); 
  //Joe
  }
  
if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
animatie = animatie + 1;
}
}
};
this.on_draw = on_draw_i;
}; var ob_ricardo = new __ob_ricardo();

function __ob_vijandkogel() {
__instance_init__(this, ob_vijandkogel, null, 1, 0, sp_kogelbief, 1, 8);
this.on_creation = function() {
with(this) {
sound_play(sd_kogelbief);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < -5 || x > room_width + 5 || y < -5 || y > room_height + 5 || place_meeting(x,y,ob_collision) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_vijandkogel = new __ob_vijandkogel();

function __ob_collision1() {
__instance_init__(this, ob_collision1, ob_collision, 1, 0, sp_collision2, 1, 20);
this.on_creation = function() {
with(this) {
sprite_index = sp_collision3;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_collision1 = new __ob_collision1();

function __ob_spacebar() {
__instance_init__(this, ob_spacebar, null, 1, 0, sp_collision, 1, 1146);
this.on_creation = function() {
with(this) {


}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (keyboard_check_pressed(vk_space)) {
  room_goto_next();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_spacebar = new __ob_spacebar();

function __ob_ricardo_buk_linx() {
__instance_init__(this, ob_ricardo_buk_linx, null, 1, 0, sp_ricardo_linx_buk, 1, 1149);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( image_index == 5 ) {
  kill = instance_create(this.x,this.y + 16,ob_vijandkogel);
  kill.direction = 180;
  kill.image_angle = 180;
  kill.speed = 15;
  }
  
if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
loop = instance_create(this.x,this.y,ob_ricardo);
loop.richting = "links";
instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var ob_ricardo_buk_linx = new __ob_ricardo_buk_linx();

function __ob_ricardo_buk_rekt() {
__instance_init__(this, ob_ricardo_buk_rekt, null, 1, 0, sp_ricardo_rekt_buk, 1, 1150);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( image_index == 5 ) {
  kill = instance_create(this.x,this.y + 16,ob_vijandkogel);
  kill.direction = 0;
  kill.image_angle = 0;
  kill.speed = 15;
  }

if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
loop = instance_create(this.x,this.y,ob_ricardo);
loop.richting = "rechts";
instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var ob_ricardo_buk_rekt = new __ob_ricardo_buk_rekt();

function __ob_kanoon_linx() {
__instance_init__(this, ob_kanoon_linx, null, 1, 0, sp_kanoon_linx, 1, 1151);
this.on_creation = function() {
with(this) {
image_speed = 0.10;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
kill = instance_create(this.x - 33,this.y + 4,ob_straal_linx);
kill.speed = -15;
image_index = 0;
}
}
};
this.on_draw = on_draw_i;
}; var ob_kanoon_linx = new __ob_kanoon_linx();

function __ob_kanoon_rekt() {
__instance_init__(this, ob_kanoon_rekt, null, 1, 0, sp_kanoon_rekt, 1, 1152);
this.on_creation = function() {
with(this) {
image_speed = 0.10;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
kill = instance_create(this.x + 33,this.y + 4,ob_straal_rekt);
kill.speed = 15;
image_index = 0;
}
}
};
this.on_draw = on_draw_i;
}; var ob_kanoon_rekt = new __ob_kanoon_rekt();

function __ob_straal_linx() {
__instance_init__(this, ob_straal_linx, null, 1, 0, sp_kanoonstraal_linx, 1, 1153);
this.on_creation = function() {
with(this) {
sound_play(sd_straal);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_hansch) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_straal_linx = new __ob_straal_linx();

function __ob_straal_rekt() {
__instance_init__(this, ob_straal_rekt, null, 1, 0, sp_kanoonstraal_rekt, 1, 1154);
this.on_creation = function() {
with(this) {
sound_play(sd_straal);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_hansch) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_straal_rekt = new __ob_straal_rekt();

function __ob_hart() {
__instance_init__(this, ob_hart, null, 1, 0, sp_hart, 1, 1156);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_hansch);
if(this.other != null) {
hp = hp + 1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_hart = new __ob_hart();

function __ob_collision2() {
__instance_init__(this, ob_collision2, null, 1, 0, sp_collision4, 1, 1238);
this.on_creation = function() {
with(this) {
sprite_index = sp_collision;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_collision2 = new __ob_collision2();

function __ob_edwin() {
__instance_init__(this, ob_edwin, null, 1, 0, sp_edwin, 1, 1245);
this.on_creation = function() {
with(this) {
/**
"Hey.... ben jij klaar om je skills te pijlen?"
-Eric Edwin van de Sar-
**/
image_speed = 0.0125;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (place_meeting(this.x,this.y,ob_kogelbief) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
kill = instance_create(this.x - 16,this.y + 12,ob_pijl);
kill.speed = -15;
image_index = 0;
}
}
};
this.on_draw = on_draw_i;
}; var ob_edwin = new __ob_edwin();

function __ob_pijl() {
__instance_init__(this, ob_pijl, null, 1, 0, sp_pijl, 1, 1246);
this.on_creation = function() {
with(this) {
sound_play(sd_pijl);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( direction < 85 ) { direction = direction + 1; }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_hansch) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_pijl = new __ob_pijl();

function __ob_edwin_rekt() {
__instance_init__(this, ob_edwin_rekt, null, 1, 0, sp_edwin_rekt, 1, 1249);
this.on_creation = function() {
with(this) {
image_speed = 0.0125;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (place_meeting(this.x,this.y,ob_kogelbief) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
kill = instance_create(this.x + 16,this.y + 12,ob_pijl_rekt);
kill.speed = 15;
image_index = 0;
}
}
};
this.on_draw = on_draw_i;
}; var ob_edwin_rekt = new __ob_edwin_rekt();

function __ob_pijl_rekt() {
__instance_init__(this, ob_pijl_rekt, null, 1, 0, sp_pijl_rekt, 1, 1250);
this.on_creation = function() {
with(this) {
sound_play(sd_pijl);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( direction > 95 ) { direction = direction - 1; }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_hansch) != null) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_pijl_rekt = new __ob_pijl_rekt();

function __ob_yogbert() {
__instance_init__(this, ob_yogbert, null, 1, 0, sp_yogbert_linx, 1, 1345);
this.on_creation = function() {
with(this) {
/** 
"Danoooooooooooooontje Poweerrrrrrrrrr"
-Yogi Yogbert, 2525
**/

//beginvariabelen
this.richting = "links";
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.richting == "links") {
  this.x = this.x - 4;
} else {
  this.x = this.x + 4;
  }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_collision2) != null) {
  if (this.richting == "links") {
    sprite_index = sp_yogbert_rekt;
	this.x = this.xprevious;
    this.richting = "rechts";
  } else {
	sprite_index = sp_yogbert_linx;
	this.x = this.xprevious;
	this.richting = "links";
	}
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_kogelbief);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
if (richting == "links") {
  kill = instance_create(this.x,this.y + 16,ob_vijandkogel);
  kill.direction = 180;
  kill.image_angle = 180;
  kill.speed = 15;
} else {
  kill = instance_create(this.x,this.y + 16,ob_vijandkogel);
  kill.direction = 0;
  kill.image_angle = 0;
  kill.speed = 15;
  }
}
}
};
this.on_draw = on_draw_i;
}; var ob_yogbert = new __ob_yogbert();

function __ob_bermhart() {
__instance_init__(this, ob_bermhart, null, 1, 0, sp_bermhart_linx, 1, 1346);
this.on_creation = function() {
with(this) {
/**
"Say hello to my little fiend!"
-Buddy Bermhart, 2014
**/

//beginvariabelen
animatie = 0;
image_speed = 0.6;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.richting == "links") {
  sprite_index = sp_bermhart_linx;
  this.x = this.x - 4;
} else {
  sprite_index = sp_bermhart_rekt;
  this.x = this.x + 4;
  }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_collision2) != null) {
  if (this.richting == "links") {
    sprite_index = sp_bermhart_rekt;
	this.x = this.xprevious;
    this.richting = "rechts";
  } else {
	sprite_index = sp_bermhart_linx;
	this.x = this.xprevious;
	this.richting = "links";
	}
  }
  
if (animatie > 3 ) {
  if (richting == "links") { 
    buk = instance_create(this.x,this.y,ob_bermhart_buk_linx);
  } else {
    buk = instance_create(this.x,this.y,ob_bermhart_buk_rekt);
	}
  instance_destroy(); 
  //Joe
  }

if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
animatie = animatie + 1;
}
}
};
this.on_draw = on_draw_i;
}; var ob_bermhart = new __ob_bermhart();

function __ob_bermhart_buk_linx() {
__instance_init__(this, ob_bermhart_buk_linx, null, 1, 0, sp_bermhart_linx_buk, 1, 1347);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( image_index == 5 ) {
  kill = instance_create(this.x,this.y + 20,ob_straal_linx);
  kill.speed = -15;
  }
  
if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
loop = instance_create(this.x,this.y,ob_bermhart);
loop.richting = "links";
instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var ob_bermhart_buk_linx = new __ob_bermhart_buk_linx();

function __ob_bermhart_buk_rekt() {
__instance_init__(this, ob_bermhart_buk_rekt, null, 1, 0, sp_bermhart_rekt_buk, 1, 1348);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( image_index == 5 ) {
  kill = instance_create(this.x,this.y + 20,ob_straal_rekt);
  kill.speed = 15;
  }

if ( place_meeting(this.x,this.y,ob_kogelbief) != null ) {
  instance_destroy();
  }
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
loop = instance_create(this.x,this.y,ob_bermhart);
loop.richting = "rechts";
instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var ob_bermhart_buk_rekt = new __ob_bermhart_buk_rekt();

function __ob_mund() {
__instance_init__(this, ob_mund, null, 1, 0, sp_mund, 1, 1591);
this.on_creation = function() {
with(this) {
mundhealth = 75;
richting = "rechts";
image_speed = 0.6;
animatie = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (hp < 1) {
  mundhealth = 75;
  }

if (mundhealth < 1) {
  instance_create(this.x,this.y,ob_sploos);
  instance_destroy();
  }

if (this.richting == "links") {
  this.x = this.x - 4;
} else {
  this.x = this.x + 4;
  }

if (place_meeting(this.x,this.y,ob_collision) != null || place_meeting(this.x,this.y,ob_collision2) != null) {
  if (this.richting == "links") {
    sprite_index = sp_mund;
	this.x = this.xprevious;
    this.richting = "rechts";
  } else {
	sprite_index = sp_mund_linx;
	this.x = this.xprevious;
	this.richting = "links";
	}
  }

if (animatie > 39) {
  if (this.richting == "links") { sprite_index = sp_mund_spuug_linx; }
  else { sprite_index = sp_mund_spuug; }
  kill = instance_create(this.x,this.y + 20,ob_ijs);
  kill.speed = 15;
  kill.direction = point_direction(this.x,this.y,instance_first(ob_armpie).x,instance_first(ob_armpie).y);
  animatie = 0;
  }

if (animatie > 4 && sprite_index == sp_mund_spuug_linx | sp_mund_spuug ) {
  if (this.richting == "links") { sprite_index = sp_mund_linx; }
  else { sprite_index = sp_mund; }
  }
  



}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_kogelbief);
if(this.other != null) {
mundhealth = mundhealth - 1;
other.instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
animatie = animatie + 1;
}
}
};
this.on_draw = on_draw_i;
}; var ob_mund = new __ob_mund();

function __ob_ijs() {
__instance_init__(this, ob_ijs, null, 1, 0, sp_ijs, 1, 1592);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, ob_hansch);
if(this.other != null) {
hp = hp - 1
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, ob_collision);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_ijs = new __ob_ijs();

function __ob_sploos() {
__instance_init__(this, ob_sploos, null, 1, 0, sp_sploos, 1, 1722);
this.on_creation = function() {
with(this) {
sound_play(sd_sploos);
image_speed = 0.4;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
room_goto_next();
}
}
};
this.on_draw = on_draw_i;
}; var ob_sploos = new __ob_sploos();

function __ob_music1() {
__instance_init__(this, ob_music1, null, 1, 0, sp_collision, 1, 1725);
this.on_creation = function() {
with(this) {
// sound_loop(mus_amomenttomyself);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_music1 = new __ob_music1();

function __ob_music2() {
__instance_init__(this, ob_music2, null, 1, 0, sp_collision, 1, 1726);
this.on_creation = function() {
with(this) {
// sound_stop(mus_amomenttomyself);
// sound_loop(mus_solstice);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_music2 = new __ob_music2();

function __ob_music3() {
__instance_init__(this, ob_music3, null, 1, 0, sp_collision, 1, 1728);
this.on_creation = function() {
with(this) {
// sound_stop(mus_solstice);
// sound_loop(mus_valhalla);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_music3 = new __ob_music3();

function __ob_music4() {
__instance_init__(this, ob_music4, null, 1, 0, sp_collision, 1, 1729);
this.on_creation = function() {
with(this) {
// sound_stop(mus_valhalla);
// sound_loop(mus_terriblefate);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_music4 = new __ob_music4();

function __ob_music5() {
__instance_init__(this, ob_music5, null, 1, 0, sp_collision, 1, 1730);
this.on_creation = function() {
with(this) {
// sound_stop(mus_terriblefate);
// sound_loop(mus_inthehouseinaheartbeat);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ob_music5 = new __ob_music5();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __sc_kopmenu() { 
this.tiles = [
];
this.objects = [
[{o:ob_spacebar, x:0, y:0}],
[{o:ob_music1, x:0, y:33}]];
this.start = function() {
__room_start__(this, sc_kopmenu, 660, 495, 30, 0, 0, 0, bg_menuutje.image, 0, 0, 0, 660, 495, null, 50, 50);

// sound_loop(mus_amomenttomyself);
};
}
var sc_kopmenu = new __sc_kopmenu();
tu_scenes.push(sc_kopmenu);
function __sc_helpmenu() { 
this.tiles = [
];
this.objects = [
[{o:ob_spacebar, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_helpmenu, 640, 495, 30, 0, 0, 0, bg_menuutje1.image, 0, 0, 0, 640, 495, null, 50, 50);
};
}
var sc_helpmenu = new __sc_helpmenu();
tu_scenes.push(sc_helpmenu);
function __sc_lv1world1() { 
this.tiles = [
[1000000,
[tlset_plateau,
[0,0,33,33,231,165],
[33,0,33,33,264,165],
[33,0,33,33,297,165],
[33,0,33,33,330,165],
[33,33,33,33,297,198],
[33,33,33,33,264,198],
[0,33,33,33,231,198],
[33,33,33,33,330,198],
[33,0,33,33,363,165],
[33,33,33,33,363,198],
[33,0,33,33,396,165],
[33,0,33,33,429,165],
[0,0,33,33,726,231],
[33,0,33,33,759,231],
[33,0,33,33,792,231],
[33,0,33,33,825,231],
[0,33,33,33,726,264],
[33,33,33,33,759,264],
[33,33,33,33,792,264],
[33,33,33,33,825,264],
[0,66,33,33,561,363],
[33,66,33,33,594,363],
[66,66,33,33,627,363],
[33,99,33,33,594,396],
[0,0,33,33,2145,396],
[66,0,33,33,1980,396],
[66,33,33,33,1980,429],
[33,33,33,33,1947,429],
[33,0,33,33,1947,396],
[33,99,33,33,2013,297],
[33,99,33,33,2046,330],
[33,99,33,33,2112,231]],
[tlset_platform,
[33,0,33,20,99,231],
[33,0,33,20,66,231],
[0,0,33,20,33,231],
[66,0,33,20,132,231],
[66,0,33,20,759,132],
[0,0,33,20,594,132],
[33,0,33,20,627,132],
[33,0,33,20,660,132],
[33,0,33,20,693,132],
[33,0,33,20,726,132],
[99,0,33,20,726,429],
[99,0,33,20,858,396],
[99,0,33,20,990,363],
[99,0,33,20,1122,396],
[0,0,33,20,1122,297],
[33,0,33,20,1155,297],
[33,0,33,20,1188,297],
[33,0,33,20,1221,297],
[66,0,33,20,1254,297],
[99,0,33,20,1683,330],
[33,0,33,20,2013,396],
[33,0,33,20,2046,396],
[33,0,33,20,2079,396],
[33,0,33,20,2112,396],
[33,0,33,20,2145,396],
[33,0,33,20,1980,396]],
[tlset_grass,
[33,0,33,33,0,462],
[33,0,33,33,33,462],
[33,0,33,33,66,462],
[33,0,33,33,99,462],
[33,0,33,33,132,462],
[33,0,33,33,165,462],
[0,33,33,33,198,363],
[0,33,33,33,198,396],
[0,33,33,33,198,429],
[0,0,33,33,198,330],
[0,66,33,33,198,462],
[33,0,33,33,231,330],
[33,0,33,33,264,330],
[33,0,33,33,297,330],
[33,0,33,33,330,330],
[0,66,33,33,363,330],
[0,33,33,33,363,297],
[0,33,33,33,363,264],
[0,33,33,33,363,231],
[0,0,33,33,363,198],
[33,0,33,33,396,198],
[0,66,33,33,429,198],
[0,0,33,33,429,165],
[33,0,33,33,495,132],
[66,0,33,33,528,132],
[0,0,33,33,462,132],
[0,66,33,33,462,165],
[66,33,33,33,528,165],
[66,165,33,33,528,198],
[66,165,33,33,495,264],
[66,165,33,33,429,330],
[66,132,33,33,429,297],
[66,132,33,33,495,231],
[66,132,33,33,396,363],
[66,132,33,33,396,396],
[66,132,33,33,396,429],
[66,132,33,33,396,462],
[66,99,33,33,396,330],
[66,99,33,33,429,264],
[66,99,33,33,495,198],
[33,165,33,33,462,264],
[33,66,33,33,495,165],
[33,66,33,33,264,396],
[33,99,33,33,396,297],
[33,33,33,33,231,363],
[33,33,33,33,231,396],
[33,33,33,33,231,429],
[33,33,33,33,231,429],
[33,33,33,33,231,462],
[33,33,33,33,264,462],
[33,33,33,33,264,429],
[33,33,33,33,264,363],
[33,33,33,33,297,363],
[33,33,33,33,330,363],
[33,33,33,33,363,363],
[33,33,33,33,363,396],
[33,33,33,33,330,396],
[33,33,33,33,297,396],
[33,33,33,33,297,429],
[33,33,33,33,330,429],
[33,33,33,33,363,429],
[33,33,33,33,363,462],
[33,33,33,33,330,462],
[33,33,33,33,297,462],
[33,33,33,33,396,264],
[33,33,33,33,396,231],
[33,33,33,33,429,231],
[33,33,33,33,462,231],
[33,33,33,33,462,198],
[0,33,33,33,858,0],
[0,33,33,33,858,33],
[0,33,33,33,858,66],
[0,33,33,33,858,99],
[0,33,33,33,858,132],
[0,33,33,33,858,165],
[0,33,33,33,858,198],
[0,33,33,33,858,231],
[0,165,33,33,858,264],
[33,165,33,33,891,264],
[33,165,33,33,924,264],
[33,165,33,33,957,264],
[66,165,33,33,990,264],
[66,132,33,33,990,231],
[66,132,33,33,990,198],
[66,132,33,33,990,165],
[66,132,33,33,990,132],
[66,132,33,33,990,99],
[66,132,33,33,990,33],
[66,132,33,33,990,0],
[66,132,33,33,990,66],
[33,99,33,33,891,165],
[33,66,33,33,957,66],
[33,33,33,33,891,0],
[33,33,33,33,924,0],
[33,33,33,33,957,0],
[33,33,33,33,957,33],
[33,33,33,33,924,33],
[33,33,33,33,891,33],
[33,33,33,33,891,66],
[33,33,33,33,924,66],
[33,33,33,33,891,99],
[33,33,33,33,924,99],
[33,33,33,33,957,99],
[33,33,33,33,957,132],
[33,33,33,33,924,132],
[33,33,33,33,891,132],
[33,33,33,33,924,165],
[33,33,33,33,957,165],
[33,33,33,33,957,198],
[33,33,33,33,924,198],
[33,33,33,33,891,198],
[33,33,33,33,891,231],
[33,33,33,33,924,231],
[33,33,33,33,957,231],
[0,33,33,33,1386,462],
[0,33,33,33,1386,429],
[0,33,33,33,1386,396],
[0,0,33,33,1386,363],
[33,0,33,33,1419,363],
[66,0,33,33,1452,363],
[66,66,33,33,1452,396],
[66,66,33,33,1485,429],
[66,0,33,33,1485,396],
[33,0,33,33,1518,429],
[33,0,33,33,1551,429],
[33,0,33,33,1584,429],
[33,0,33,33,1617,429],
[33,0,33,33,1650,429],
[33,0,33,33,1683,429],
[33,0,33,33,1716,429],
[0,66,33,33,1749,429],
[0,33,33,33,1749,396],
[0,33,33,33,1749,363],
[0,33,33,33,1749,330],
[0,33,33,33,1749,297],
[0,33,33,33,1749,264],
[0,0,33,33,1749,231],
[33,0,33,33,1848,231],
[33,0,33,33,1881,231],
[33,33,33,33,1419,396],
[33,33,33,33,1419,429],
[33,33,33,33,1452,429],
[33,33,33,33,1419,462],
[33,33,33,33,1485,462],
[33,33,33,33,1518,462],
[33,66,33,33,1452,462],
[33,66,33,33,1683,462],
[33,99,33,33,1782,297],
[33,99,33,33,1848,330],
[33,33,33,33,1551,462],
[33,33,33,33,1584,462],
[33,33,33,33,1617,462],
[33,33,33,33,1650,462],
[33,33,33,33,1716,462],
[33,33,33,33,1749,462],
[33,33,33,33,1782,462],
[33,33,33,33,1782,429],
[33,33,33,33,1782,363],
[33,33,33,33,1782,330],
[33,33,33,33,1782,264],
[33,33,33,33,1815,264],
[33,33,33,33,1848,264],
[33,33,33,33,1881,264],
[33,33,33,33,1881,297],
[33,33,33,33,1848,297],
[33,33,33,33,1815,297],
[33,33,33,33,1815,330],
[33,33,33,33,1815,363],
[33,33,33,33,1815,396],
[33,33,33,33,1782,396],
[33,33,33,33,1815,429],
[33,33,33,33,1815,462],
[33,33,33,33,1848,462],
[33,33,33,33,1848,429],
[33,33,33,33,1848,396],
[33,33,33,33,1848,363],
[33,33,33,33,1881,330],
[33,33,33,33,1881,363],
[33,33,33,33,1881,396],
[33,33,33,33,1881,429],
[33,33,33,33,1881,462],
[0,66,33,33,1782,231],
[66,66,33,33,1815,231],
[66,0,33,33,1815,132],
[0,0,33,33,1782,132],
[0,33,33,33,1782,165],
[0,33,33,33,1782,198],
[66,33,33,33,1815,165],
[66,33,33,33,1815,198],
[66,0,33,33,1914,231],
[66,0,33,33,1947,330],
[66,33,33,33,1914,264],
[66,33,33,33,1914,297],
[66,33,33,33,1947,363],
[66,33,33,33,1914,429],
[66,33,33,33,1914,462],
[66,99,33,33,1914,396],
[66,66,33,33,1914,330],
[33,132,33,33,1914,363],
[66,165,33,33,1947,396],
[0,33,33,33,2178,396],
[0,33,33,33,2178,429],
[0,33,33,33,2178,462],
[0,33,33,33,2178,363],
[0,33,33,33,2178,330],
[0,33,33,33,2178,297],
[0,0,33,33,2178,264],
[66,0,33,33,2277,297],
[66,0,33,33,2244,264],
[66,0,33,33,2475,330],
[33,0,33,33,2211,264],
[33,0,33,33,2310,330],
[33,0,33,33,2343,330],
[33,0,33,33,2376,330],
[33,0,33,33,2409,330],
[33,0,33,33,2442,330],
[33,0,33,33,2475,462],
[33,0,33,33,2442,462],
[33,0,33,33,2409,462],
[33,0,33,33,2376,462],
[33,0,33,33,2343,462],
[66,0,33,33,2508,462],
[66,165,33,33,2475,363],
[66,165,33,33,2376,396],
[66,165,33,33,2310,429],
[33,165,33,33,2343,396],
[33,165,33,33,2442,363],
[33,165,33,33,2409,363],
[66,99,33,33,2277,429],
[66,66,33,33,2277,462],
[33,0,33,33,2310,462],
[66,99,33,33,2310,396],
[66,99,33,33,2376,363],
[66,66,33,33,2244,297],
[66,66,33,33,2277,330],
[33,66,33,33,2211,363],
[33,66,33,33,2277,396],
[33,33,33,33,2211,297],
[33,33,33,33,2211,330],
[33,33,33,33,2244,330],
[33,33,33,33,2244,363],
[33,33,33,33,2244,396],
[33,33,33,33,2211,396],
[33,33,33,33,2211,429],
[33,33,33,33,2211,462],
[33,33,33,33,2244,462],
[33,33,33,33,2244,429],
[33,33,33,33,2277,363],
[33,33,33,33,2310,363],
[33,33,33,33,2343,363],
[0,0,33,33,2013,33],
[66,0,33,33,2112,66],
[66,165,33,33,2112,198],
[66,165,33,33,2079,297],
[0,165,33,33,2046,297],
[0,165,33,33,2013,264],
[0,99,33,33,2046,264],
[66,99,33,33,2079,198],
[66,0,33,33,2079,33],
[66,132,33,33,2079,231],
[66,132,33,33,2079,264],
[66,132,33,33,2112,99],
[66,132,33,33,2112,132],
[66,132,33,33,2112,165],
[0,33,33,33,2013,66],
[0,33,33,33,2013,99],
[0,33,33,33,2013,132],
[0,33,33,33,2013,165],
[0,33,33,33,2013,198],
[0,33,33,33,2013,231],
[33,0,33,33,2046,33],
[66,66,33,33,2079,66],
[33,33,33,33,2046,66],
[33,33,33,33,2046,99],
[33,33,33,33,2046,99],
[33,33,33,33,2079,132],
[33,33,33,33,2079,99],
[33,33,33,33,2046,132],
[33,33,33,33,2079,165],
[33,33,33,33,2046,165],
[33,33,33,33,2046,198],
[33,33,33,33,2046,231]]]];
this.objects = [
[{o:ob_collision, x:0, y:462}],
[{o:ob_collision, x:33, y:462}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:99, y:462}],
[{o:ob_collision, x:132, y:462}],
[{o:ob_collision, x:165, y:462}],
[{o:ob_collision, x:198, y:462}],
[{o:ob_collision, x:198, y:429}],
[{o:ob_collision, x:198, y:396}],
[{o:ob_collision, x:198, y:363}],
[{o:ob_collision, x:198, y:330}],
[{o:ob_collision1, x:33, y:231}],
[{o:ob_collision1, x:66, y:231}],
[{o:ob_collision1, x:99, y:231}],
[{o:ob_collision1, x:132, y:231}],
[{o:ob_collision1, x:594, y:132}],
[{o:ob_collision1, x:627, y:132}],
[{o:ob_collision1, x:660, y:132}],
[{o:ob_collision1, x:693, y:132}],
[{o:ob_collision1, x:726, y:132}],
[{o:ob_collision1, x:759, y:132}],
[{o:ob_collision1, x:726, y:429}],
[{o:ob_collision1, x:858, y:396}],
[{o:ob_collision1, x:990, y:363}],
[{o:ob_collision1, x:1122, y:396}],
[{o:ob_collision1, x:1122, y:297}],
[{o:ob_collision1, x:1155, y:297}],
[{o:ob_collision1, x:1188, y:297}],
[{o:ob_collision1, x:1221, y:297}],
[{o:ob_collision1, x:1254, y:297}],
[{o:ob_collision1, x:1683, y:330}],
[{o:ob_collision1, x:1980, y:396}],
[{o:ob_collision1, x:2013, y:396}],
[{o:ob_collision1, x:2046, y:396}],
[{o:ob_collision1, x:2079, y:396}],
[{o:ob_collision1, x:2112, y:396}],
[{o:ob_collision1, x:2145, y:396}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:264, y:165}],
[{o:ob_collision, x:297, y:165}],
[{o:ob_collision, x:330, y:165}],
[{o:ob_collision, x:363, y:165}],
[{o:ob_collision, x:396, y:165}],
[{o:ob_collision, x:231, y:330}],
[{o:ob_collision, x:264, y:330}],
[{o:ob_collision, x:297, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:363, y:330}],
[{o:ob_collision, x:363, y:297}],
[{o:ob_collision, x:363, y:264}],
[{o:ob_collision, x:363, y:231}],
[{o:ob_collision, x:363, y:198}],
[{o:ob_collision, x:429, y:165}],
[{o:ob_collision, x:462, y:165}],
[{o:ob_collision, x:462, y:132}],
[{o:ob_collision, x:495, y:132}],
[{o:ob_collision, x:528, y:132}],
[{o:ob_collision, x:528, y:165}],
[{o:ob_collision, x:528, y:198}],
[{o:ob_collision, x:495, y:198}],
[{o:ob_collision, x:495, y:231}],
[{o:ob_collision, x:495, y:264}],
[{o:ob_collision, x:462, y:264}],
[{o:ob_collision, x:429, y:264}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:396, y:330}],
[{o:ob_collision, x:396, y:363}],
[{o:ob_collision, x:396, y:396}],
[{o:ob_collision, x:396, y:429}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:726, y:231}],
[{o:ob_collision, x:759, y:231}],
[{o:ob_collision, x:792, y:231}],
[{o:ob_collision, x:825, y:231}],
[{o:ob_collision, x:627, y:363}],
[{o:ob_collision, x:594, y:363}],
[{o:ob_collision, x:561, y:363}],
[{o:ob_collision, x:858, y:0}],
[{o:ob_collision, x:858, y:33}],
[{o:ob_collision, x:858, y:66}],
[{o:ob_collision, x:858, y:99}],
[{o:ob_collision, x:858, y:132}],
[{o:ob_collision, x:858, y:165}],
[{o:ob_collision, x:858, y:198}],
[{o:ob_collision, x:858, y:231}],
[{o:ob_collision, x:858, y:264}],
[{o:ob_collision, x:891, y:264}],
[{o:ob_collision, x:924, y:264}],
[{o:ob_collision, x:957, y:264}],
[{o:ob_collision, x:990, y:264}],
[{o:ob_collision, x:990, y:231}],
[{o:ob_collision, x:990, y:198}],
[{o:ob_collision, x:990, y:165}],
[{o:ob_collision, x:990, y:132}],
[{o:ob_collision, x:990, y:99}],
[{o:ob_collision, x:990, y:66}],
[{o:ob_collision, x:990, y:33}],
[{o:ob_collision, x:990, y:0}],
[{o:ob_collision, x:1386, y:363}],
[{o:ob_collision, x:1386, y:396}],
[{o:ob_collision, x:1386, y:429}],
[{o:ob_collision, x:1386, y:462}],
[{o:ob_collision, x:1419, y:363}],
[{o:ob_collision, x:1452, y:363}],
[{o:ob_collision, x:1452, y:396}],
[{o:ob_collision, x:1485, y:396}],
[{o:ob_collision, x:1485, y:429}],
[{o:ob_collision, x:1518, y:429}],
[{o:ob_collision, x:1551, y:429}],
[{o:ob_collision, x:1584, y:429}],
[{o:ob_collision, x:1617, y:429}],
[{o:ob_collision, x:1650, y:429}],
[{o:ob_collision, x:1683, y:429}],
[{o:ob_collision, x:1716, y:429}],
[{o:ob_collision, x:1749, y:429}],
[{o:ob_collision, x:1749, y:396}],
[{o:ob_collision, x:1749, y:363}],
[{o:ob_collision, x:1749, y:330}],
[{o:ob_collision, x:1749, y:297}],
[{o:ob_collision, x:1749, y:264}],
[{o:ob_collision, x:1749, y:231}],
[{o:ob_collision, x:1782, y:231}],
[{o:ob_collision, x:1782, y:198}],
[{o:ob_collision, x:1782, y:165}],
[{o:ob_collision, x:1782, y:132}],
[{o:ob_collision, x:1815, y:132}],
[{o:ob_collision, x:1815, y:165}],
[{o:ob_collision, x:1815, y:198}],
[{o:ob_collision, x:1815, y:198}],
[{o:ob_collision, x:1815, y:231}],
[{o:ob_collision, x:1848, y:231}],
[{o:ob_collision, x:1881, y:231}],
[{o:ob_collision, x:1914, y:231}],
[{o:ob_collision, x:1914, y:264}],
[{o:ob_collision, x:1914, y:297}],
[{o:ob_collision, x:1914, y:330}],
[{o:ob_collision, x:1947, y:330}],
[{o:ob_collision, x:1947, y:363}],
[{o:ob_collision, x:1947, y:396}],
[{o:ob_collision, x:2013, y:33}],
[{o:ob_collision, x:2013, y:66}],
[{o:ob_collision, x:2013, y:99}],
[{o:ob_collision, x:2013, y:132}],
[{o:ob_collision, x:2013, y:165}],
[{o:ob_collision, x:2013, y:198}],
[{o:ob_collision, x:2013, y:231}],
[{o:ob_collision, x:2013, y:264}],
[{o:ob_collision, x:2046, y:264}],
[{o:ob_collision, x:2046, y:297}],
[{o:ob_collision, x:2079, y:297}],
[{o:ob_collision, x:2079, y:264}],
[{o:ob_collision, x:2079, y:231}],
[{o:ob_collision, x:2079, y:198}],
[{o:ob_collision, x:2112, y:198}],
[{o:ob_collision, x:2112, y:165}],
[{o:ob_collision, x:2112, y:132}],
[{o:ob_collision, x:2112, y:99}],
[{o:ob_collision, x:2112, y:66}],
[{o:ob_collision, x:2079, y:66}],
[{o:ob_collision, x:2079, y:33}],
[{o:ob_collision, x:2046, y:33}],
[{o:ob_collision, x:2178, y:396}],
[{o:ob_collision, x:2178, y:429}],
[{o:ob_collision, x:2178, y:462}],
[{o:ob_collision, x:2178, y:363}],
[{o:ob_collision, x:2178, y:330}],
[{o:ob_collision, x:2178, y:297}],
[{o:ob_collision, x:2178, y:264}],
[{o:ob_collision, x:2211, y:264}],
[{o:ob_collision, x:2244, y:264}],
[{o:ob_collision, x:2244, y:297}],
[{o:ob_collision, x:2277, y:297}],
[{o:ob_collision, x:2277, y:330}],
[{o:ob_collision, x:2310, y:330}],
[{o:ob_collision, x:2343, y:330}],
[{o:ob_collision, x:2376, y:330}],
[{o:ob_collision, x:2409, y:330}],
[{o:ob_collision, x:2442, y:330}],
[{o:ob_collision, x:2475, y:330}],
[{o:ob_collision, x:2475, y:363}],
[{o:ob_collision, x:2442, y:363}],
[{o:ob_collision, x:2409, y:363}],
[{o:ob_collision, x:2376, y:363}],
[{o:ob_collision, x:2376, y:396}],
[{o:ob_collision, x:2343, y:396}],
[{o:ob_collision, x:2310, y:396}],
[{o:ob_collision, x:2310, y:429}],
[{o:ob_collision, x:2310, y:462}],
[{o:ob_collision, x:2343, y:462}],
[{o:ob_collision, x:2376, y:462}],
[{o:ob_collision, x:2409, y:462}],
[{o:ob_collision, x:2442, y:462}],
[{o:ob_collision, x:2475, y:462}],
[{o:ob_collision, x:2508, y:462}],
[{o:ob_berend, x:2133, y:352}],
[{o:ob_leven, x:0, y:0}],
[{o:ob_leveleindt, x:2343, y:429}],
[{o:ob_armpie, x:60, y:420}],
[{o:ob_hansch, x:60, y:420}],
[{o:ob_berend, x:321, y:285}],
[{o:ob_berend, x:377, y:120}],
[{o:ob_berend, x:807, y:187}],
[{o:ob_berend, x:1207, y:253}],
[{o:ob_collision2, x:165, y:297}],
[{o:ob_collision2, x:198, y:132}],
[{o:ob_collision2, x:693, y:198}],
[{o:ob_collision2, x:1287, y:264}],
[{o:ob_collision2, x:1089, y:264}],
[{o:ob_edwin, x:1673, y:290}],
[{o:ob_edwin, x:1790, y:92}],
[{o:ob_berend, x:2452, y:418}],
[{o:ob_berend, x:2403, y:286}],
[{o:ob_collision2, x:2376, y:429}],
[{o:ob_collision2, x:2508, y:429}],
[{o:ob_collision2, x:2508, y:297}],
[{o:ob_music2, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_lv1world1, 2640, 495, 30, 72, 196, 217, bg_world1_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv1world1 = new __sc_lv1world1();
tu_scenes.push(sc_lv1world1);
function __sc_lv2world1() { 
this.tiles = [
[1000000,
[tlset_grass,
[33,0,33,33,0,462],
[33,0,33,33,33,462],
[33,0,33,33,66,462],
[33,0,33,33,99,462],
[33,0,33,33,132,462],
[33,0,33,33,165,462],
[33,0,33,33,198,462],
[33,0,33,33,264,462],
[33,0,33,33,231,462],
[33,0,33,33,297,462],
[33,0,33,33,330,462],
[33,0,33,33,396,462],
[33,0,33,33,363,462],
[33,0,33,33,429,462],
[33,0,33,33,495,462],
[33,0,33,33,462,462],
[33,0,33,33,528,462],
[33,0,33,33,561,462],
[33,0,33,33,594,462],
[33,0,33,33,627,462],
[33,0,33,33,660,462],
[33,0,33,33,693,462],
[33,0,33,33,726,462],
[33,0,33,33,759,462],
[0,66,33,33,792,462],
[0,33,33,33,792,297],
[0,33,33,33,792,330],
[0,33,33,33,792,363],
[0,33,33,33,792,396],
[0,33,33,33,792,429],
[0,0,33,33,792,264],
[66,0,33,33,825,264],
[66,0,33,33,858,363],
[66,66,33,33,825,363],
[33,99,33,33,825,462],
[33,33,33,33,825,396],
[33,33,33,33,825,429],
[66,33,33,33,825,297],
[66,33,33,33,825,330],
[66,33,33,33,858,429],
[66,33,33,33,858,396],
[66,66,33,33,858,462],
[33,0,33,33,891,462],
[33,0,33,33,924,462],
[33,0,33,33,957,462],
[33,0,33,33,990,462],
[66,0,33,33,1023,462],
[0,33,33,33,1188,462],
[0,0,33,33,1188,429],
[66,0,33,33,1221,429],
[66,66,33,33,1221,462],
[33,0,33,33,1254,462],
[33,0,33,33,1287,462],
[33,0,33,33,1320,462],
[33,0,33,33,1353,462],
[0,66,33,33,1386,462],
[0,33,33,33,1386,429],
[0,0,33,33,1386,396],
[33,0,33,33,1419,396],
[66,0,33,33,1452,396],
[66,66,33,33,1452,429],
[33,0,33,33,1485,429],
[33,0,33,33,1518,429],
[33,0,33,33,1551,429],
[33,0,33,33,1584,429],
[0,66,33,33,1617,429],
[33,0,33,33,1617,429],
[0,66,33,33,1650,429],
[0,33,33,33,1650,396],
[0,33,33,33,1650,363],
[0,33,33,33,1650,330],
[0,33,33,33,1650,297],
[0,0,33,33,1650,264],
[33,0,33,33,1683,264],
[66,0,33,33,1716,264],
[66,33,33,33,1716,297],
[66,33,33,33,1716,330],
[66,33,33,33,1716,363],
[66,33,33,33,1716,396],
[66,33,33,33,1716,429],
[66,33,33,33,1716,462],
[33,66,33,33,1683,330],
[33,99,33,33,1485,462],
[33,33,33,33,1419,429],
[33,33,33,33,1452,462],
[33,33,33,33,1419,462],
[33,33,33,33,1518,462],
[33,33,33,33,1551,462],
[33,33,33,33,1584,462],
[33,33,33,33,1617,462],
[33,33,33,33,1650,462],
[33,33,33,33,1650,462],
[33,33,33,33,1683,462],
[33,33,33,33,1683,429],
[33,33,33,33,1683,396],
[33,33,33,33,1683,363],
[33,33,33,33,1683,363],
[33,33,33,33,1683,363],
[33,33,33,33,1683,297],
[0,33,33,33,2409,462],
[0,0,33,33,2409,429],
[0,66,33,33,2442,429],
[0,33,33,33,2442,396],
[0,0,33,33,2442,363],
[66,0,33,33,2475,363],
[66,33,33,33,2475,396],
[66,66,33,33,2475,429],
[33,0,33,33,2508,429],
[33,0,33,33,2541,429],
[33,0,33,33,2574,429],
[0,66,33,33,2607,429],
[0,33,33,33,2607,396],
[0,33,33,33,2607,363],
[0,33,33,33,2607,330],
[0,165,33,33,2607,165],
[0,0,33,33,2607,297],
[0,33,33,33,2607,132],
[0,33,33,33,2607,99],
[0,33,33,33,2607,66],
[0,99,33,33,2607,33],
[33,165,33,33,2574,33],
[33,165,33,33,2541,33],
[0,165,33,33,2508,33],
[0,132,33,33,2508,0],
[33,33,33,33,2541,0],
[33,33,33,33,2607,0],
[33,99,33,33,2574,0],
[33,99,33,33,2508,462],
[33,33,33,33,2475,462],
[33,33,33,33,2442,462],
[33,33,33,33,2541,462],
[33,33,33,33,2574,462],
[33,33,33,33,2607,462]],
[tlset_platform,
[33,0,33,20,561,330],
[33,0,33,20,528,330],
[33,0,33,20,594,330],
[0,0,33,20,495,330],
[66,0,33,20,627,330],
[0,0,33,20,957,231],
[33,0,33,20,990,231],
[33,0,33,20,1023,231],
[33,0,33,20,1056,231],
[66,0,33,20,1089,231],
[99,0,33,20,1188,330],
[99,0,33,20,1089,396],
[99,0,33,20,1980,429],
[99,0,33,20,2112,330],
[99,0,33,20,2244,462],
[99,0,33,20,2475,231],
[99,0,33,20,2277,165],
[66,0,33,20,1485,330],
[0,0,33,20,1452,330]]]];
this.objects = [
[{o:ob_leven, x:0, y:0}],
[{o:ob_collision, x:726, y:462}],
[{o:ob_collision, x:693, y:462}],
[{o:ob_collision, x:660, y:462}],
[{o:ob_collision, x:627, y:462}],
[{o:ob_collision, x:594, y:462}],
[{o:ob_collision, x:561, y:462}],
[{o:ob_collision, x:495, y:462}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:462, y:462}],
[{o:ob_collision, x:429, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:363, y:462}],
[{o:ob_collision, x:330, y:462}],
[{o:ob_collision, x:297, y:462}],
[{o:ob_collision, x:0, y:462}],
[{o:ob_collision, x:33, y:462}],
[{o:ob_collision, x:99, y:462}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:132, y:462}],
[{o:ob_collision, x:165, y:462}],
[{o:ob_collision, x:231, y:462}],
[{o:ob_collision, x:264, y:462}],
[{o:ob_collision, x:198, y:462}],
[{o:ob_collision, x:759, y:462}],
[{o:ob_collision, x:792, y:462}],
[{o:ob_collision, x:792, y:429}],
[{o:ob_collision, x:792, y:396}],
[{o:ob_collision, x:792, y:363}],
[{o:ob_collision, x:792, y:330}],
[{o:ob_collision, x:792, y:297}],
[{o:ob_collision, x:792, y:264}],
[{o:ob_collision, x:825, y:264}],
[{o:ob_collision, x:825, y:264}],
[{o:ob_collision, x:825, y:297}],
[{o:ob_collision, x:825, y:330}],
[{o:ob_collision, x:825, y:363}],
[{o:ob_collision, x:858, y:363}],
[{o:ob_collision, x:858, y:396}],
[{o:ob_collision, x:858, y:429}],
[{o:ob_collision, x:858, y:462}],
[{o:ob_collision1, x:495, y:330}],
[{o:ob_collision1, x:528, y:330}],
[{o:ob_collision1, x:561, y:330}],
[{o:ob_collision1, x:594, y:330}],
[{o:ob_collision1, x:627, y:330}],
[{o:ob_berend, x:1614, y:385}],
[{o:ob_berend, x:1347, y:418}],
[{o:ob_collision, x:891, y:462}],
[{o:ob_collision, x:924, y:462}],
[{o:ob_collision, x:957, y:462}],
[{o:ob_collision, x:990, y:462}],
[{o:ob_collision, x:1023, y:462}],
[{o:ob_collision, x:1188, y:429}],
[{o:ob_collision, x:1221, y:429}],
[{o:ob_collision, x:1221, y:462}],
[{o:ob_collision, x:1188, y:462}],
[{o:ob_collision, x:1254, y:462}],
[{o:ob_collision, x:1287, y:462}],
[{o:ob_collision, x:1320, y:462}],
[{o:ob_collision, x:1353, y:462}],
[{o:ob_collision, x:1386, y:462}],
[{o:ob_collision, x:1386, y:429}],
[{o:ob_collision, x:1386, y:396}],
[{o:ob_collision, x:1419, y:396}],
[{o:ob_collision, x:1452, y:396}],
[{o:ob_collision, x:1485, y:429}],
[{o:ob_collision, x:1452, y:429}],
[{o:ob_collision, x:1419, y:429}],
[{o:ob_collision, x:1419, y:462}],
[{o:ob_collision, x:1452, y:462}],
[{o:ob_collision, x:1485, y:462}],
[{o:ob_collision, x:1518, y:462}],
[{o:ob_collision, x:1518, y:429}],
[{o:ob_collision, x:1551, y:429}],
[{o:ob_collision, x:1551, y:429}],
[{o:ob_collision, x:1584, y:429}],
[{o:ob_collision, x:1617, y:429}],
[{o:ob_collision, x:1617, y:429}],
[{o:ob_collision, x:1650, y:429}],
[{o:ob_collision, x:1650, y:396}],
[{o:ob_collision, x:1650, y:363}],
[{o:ob_collision, x:1650, y:330}],
[{o:ob_collision, x:1650, y:297}],
[{o:ob_collision, x:1650, y:264}],
[{o:ob_collision, x:1683, y:264}],
[{o:ob_collision, x:1716, y:264}],
[{o:ob_collision, x:1716, y:297}],
[{o:ob_collision, x:1716, y:330}],
[{o:ob_collision, x:1716, y:363}],
[{o:ob_collision, x:1716, y:396}],
[{o:ob_collision, x:1716, y:429}],
[{o:ob_collision, x:1716, y:462}],
[{o:ob_collision, x:1551, y:462}],
[{o:ob_collision, x:1584, y:462}],
[{o:ob_collision, x:1617, y:462}],
[{o:ob_collision, x:1650, y:462}],
[{o:ob_collision, x:1683, y:462}],
[{o:ob_collision, x:1683, y:429}],
[{o:ob_collision, x:1683, y:396}],
[{o:ob_collision, x:1683, y:363}],
[{o:ob_collision, x:1683, y:330}],
[{o:ob_collision, x:1683, y:297}],
[{o:ob_collision1, x:957, y:231}],
[{o:ob_collision1, x:990, y:231}],
[{o:ob_collision1, x:1023, y:231}],
[{o:ob_collision1, x:1023, y:231}],
[{o:ob_collision1, x:1056, y:231}],
[{o:ob_collision1, x:1089, y:231}],
[{o:ob_collision1, x:1089, y:396}],
[{o:ob_collision1, x:1188, y:330}],
[{o:ob_collision, x:2409, y:462}],
[{o:ob_collision, x:2409, y:429}],
[{o:ob_collision, x:2442, y:429}],
[{o:ob_collision, x:2442, y:396}],
[{o:ob_collision, x:2442, y:363}],
[{o:ob_collision, x:2475, y:363}],
[{o:ob_collision, x:2475, y:396}],
[{o:ob_collision, x:2475, y:429}],
[{o:ob_collision, x:2541, y:429}],
[{o:ob_collision, x:2508, y:429}],
[{o:ob_collision, x:2541, y:429}],
[{o:ob_collision, x:2574, y:429}],
[{o:ob_collision, x:2607, y:429}],
[{o:ob_collision, x:2607, y:396}],
[{o:ob_collision, x:2607, y:363}],
[{o:ob_collision, x:2607, y:330}],
[{o:ob_collision, x:2607, y:330}],
[{o:ob_collision, x:2607, y:297}],
[{o:ob_collision, x:2607, y:462}],
[{o:ob_collision, x:2574, y:462}],
[{o:ob_collision, x:2541, y:462}],
[{o:ob_collision, x:2475, y:462}],
[{o:ob_collision, x:2475, y:462}],
[{o:ob_collision, x:2475, y:462}],
[{o:ob_collision, x:2508, y:462}],
[{o:ob_collision, x:2508, y:462}],
[{o:ob_collision, x:2442, y:462}],
[{o:ob_collision, x:2607, y:165}],
[{o:ob_collision, x:2607, y:132}],
[{o:ob_collision, x:2607, y:99}],
[{o:ob_collision, x:2607, y:66}],
[{o:ob_collision, x:2607, y:33}],
[{o:ob_collision, x:2607, y:0}],
[{o:ob_collision, x:2574, y:0}],
[{o:ob_collision, x:2508, y:0}],
[{o:ob_collision, x:2541, y:0}],
[{o:ob_collision, x:2508, y:33}],
[{o:ob_collision, x:2541, y:33}],
[{o:ob_collision, x:2574, y:33}],
[{o:ob_collision1, x:1980, y:429}],
[{o:ob_collision1, x:2112, y:330}],
[{o:ob_collision1, x:2244, y:462}],
[{o:ob_collision1, x:2475, y:231}],
[{o:ob_collision1, x:2277, y:165}],
[{o:ob_leveleindt, x:2277, y:132}],
[{o:ob_berend, x:2568, y:384}],
[{o:ob_collision1, x:1452, y:330}],
[{o:ob_collision1, x:1485, y:330}],
[{o:ob_berend, x:568, y:286}],
[{o:ob_collision2, x:462, y:297}],
[{o:ob_collision2, x:660, y:297}],
[{o:ob_edwin, x:795, y:224}],
[{o:ob_collision2, x:2079, y:297}],
[{o:ob_collision2, x:2145, y:297}],
[{o:ob_armpie, x:33, y:429}],
[{o:ob_hansch, x:33, y:429}]];
this.start = function() {
__room_start__(this, sc_lv2world1, 2640, 495, 30, 255, 128, 128, bg_world1_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv2world1 = new __sc_lv2world1();
tu_scenes.push(sc_lv2world1);
function __sc_lv3world1() { 
this.tiles = [
[1000000,
[tlset_grass,
[33,0,33,33,0,462],
[33,0,33,33,33,462],
[66,0,33,33,0,429],
[66,66,33,33,0,462],
[33,0,33,33,66,462],
[33,0,33,33,99,462],
[33,0,33,33,132,462],
[33,0,33,33,165,462],
[33,0,33,33,198,462],
[33,0,33,33,231,462],
[33,0,33,33,264,462],
[0,66,33,33,297,462],
[0,0,33,33,297,429],
[33,0,33,33,330,429],
[33,0,33,33,363,429],
[0,165,33,33,297,330],
[33,165,33,33,330,330],
[33,165,33,33,363,330],
[33,165,33,33,396,330],
[66,165,33,33,429,330],
[66,33,33,33,429,297],
[66,0,33,33,429,264],
[33,0,33,33,396,264],
[33,0,33,33,363,264],
[33,0,33,33,330,264],
[0,0,33,33,297,264],
[0,33,33,33,297,297],
[66,0,33,33,396,429],
[66,33,33,33,396,462],
[33,33,33,33,330,462],
[33,33,33,33,363,462],
[33,99,33,33,396,297],
[33,33,33,33,363,297],
[33,33,33,33,330,297],
[0,0,33,33,495,462],
[33,0,33,33,528,462],
[33,0,33,33,561,462],
[33,0,33,33,594,462],
[0,66,33,33,627,462],
[0,33,33,33,627,429],
[0,33,33,33,627,396],
[0,0,33,33,627,363],
[66,0,33,33,660,363],
[66,33,33,33,660,396],
[66,33,33,33,660,429],
[66,33,33,33,660,462],
[66,66,33,33,528,462],
[66,0,33,33,528,429],
[0,0,33,33,495,429],
[0,33,33,33,495,462],
[33,33,33,33,330,264],
[0,132,33,33,297,264],
[0,132,33,33,297,231],
[0,132,33,33,297,198],
[0,0,33,33,297,165],
[66,0,33,33,330,165],
[66,33,33,33,330,198],
[66,33,33,33,330,231],
[66,66,33,33,330,264],
[0,0,33,33,1287,264],
[0,165,33,33,1287,297],
[0,132,33,33,1287,297],
[0,132,33,33,1287,330],
[0,165,33,33,1287,363],
[33,165,33,33,1320,363],
[33,165,33,33,1353,363],
[33,165,33,33,1386,363],
[33,165,33,33,1419,363],
[33,165,33,33,1452,363],
[33,165,33,33,1485,363],
[33,165,33,33,1518,363],
[66,165,33,33,1551,363],
[66,132,33,33,1551,330],
[66,132,33,33,1551,297],
[66,132,33,33,1551,264],
[66,132,33,33,1551,231],
[66,33,33,33,1551,198],
[66,0,33,33,1551,165],
[33,0,33,33,1518,165],
[0,0,33,33,1485,165],
[0,165,33,33,1485,198],
[0,99,33,33,1518,198],
[0,132,33,33,1518,231],
[0,132,33,33,1518,264],
[0,66,33,33,1518,297],
[33,0,33,33,1485,297],
[33,0,33,33,1452,297],
[33,0,33,33,1419,297],
[33,0,33,33,1386,297],
[33,0,33,33,1353,297],
[66,66,33,33,1320,297],
[66,0,33,33,1320,264],
[33,66,33,33,1452,330],
[33,132,33,33,1320,330],
[33,132,33,33,1353,330],
[33,132,33,33,1386,330],
[33,132,33,33,1419,330],
[33,132,33,33,1485,330],
[33,132,33,33,1518,330],
[33,132,33,33,1551,264],
[33,132,33,33,1551,297],
[66,66,33,33,1551,264],
[66,99,33,33,1551,297],
[33,0,33,33,1584,264],
[33,0,33,33,1617,264],
[33,0,33,33,1650,264],
[33,0,33,33,1683,264],
[33,0,33,33,1716,264],
[33,165,33,33,1584,297],
[33,165,33,33,1617,297],
[33,165,33,33,1650,297],
[33,165,33,33,1683,297],
[33,165,33,33,1716,297],
[0,66,33,33,1749,264],
[0,0,33,33,1749,231],
[66,0,33,33,1782,231],
[66,165,33,33,1782,297],
[66,132,33,33,1782,264],
[33,165,33,33,1749,297]],
[tlset_plateau,
[0,66,33,33,528,297],
[66,66,33,33,561,297],
[0,0,33,33,1947,198],
[33,33,33,33,1980,231],
[0,33,33,33,1947,231],
[66,33,33,33,2013,231],
[33,0,33,33,1980,198],
[66,0,33,33,2013,198]],
[tlset_platform,
[99,0,33,20,462,132],
[99,0,33,20,627,132],
[99,0,33,20,825,198],
[0,0,33,20,990,330],
[33,0,33,20,1023,330],
[33,0,33,20,1056,330],
[33,0,33,20,1089,330],
[33,0,33,20,1122,330],
[66,0,33,20,1155,330],
[99,0,33,20,2178,264],
[33,0,33,20,2541,462],
[66,0,33,20,2574,462],
[0,0,33,20,2508,462],
[33,0,33,20,2508,462],
[0,0,33,20,2475,462]]]];
this.objects = [
[{o:ob_leven, x:0, y:0}],
[{o:ob_leveleindt, x:2574, y:429}],
[{o:ob_collision, x:0, y:429}],
[{o:ob_collision, x:0, y:462}],
[{o:ob_collision, x:33, y:462}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:99, y:462}],
[{o:ob_collision, x:132, y:462}],
[{o:ob_collision, x:132, y:462}],
[{o:ob_collision, x:165, y:462}],
[{o:ob_collision, x:198, y:462}],
[{o:ob_collision, x:231, y:462}],
[{o:ob_collision, x:264, y:462}],
[{o:ob_collision, x:297, y:462}],
[{o:ob_collision, x:297, y:429}],
[{o:ob_collision, x:330, y:429}],
[{o:ob_collision, x:363, y:429}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:363, y:462}],
[{o:ob_collision, x:330, y:462}],
[{o:ob_collision, x:297, y:330}],
[{o:ob_collision, x:297, y:264}],
[{o:ob_collision, x:297, y:264}],
[{o:ob_collision, x:297, y:231}],
[{o:ob_collision, x:297, y:198}],
[{o:ob_collision, x:297, y:165}],
[{o:ob_collision, x:297, y:165}],
[{o:ob_collision, x:330, y:165}],
[{o:ob_collision, x:330, y:198}],
[{o:ob_collision, x:330, y:231}],
[{o:ob_collision, x:330, y:231}],
[{o:ob_collision, x:330, y:264}],
[{o:ob_collision, x:330, y:264}],
[{o:ob_collision, x:330, y:297}],
[{o:ob_collision, x:297, y:297}],
[{o:ob_collision, x:363, y:264}],
[{o:ob_collision, x:396, y:264}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:363, y:297}],
[{o:ob_collision, x:363, y:297}],
[{o:ob_collision, x:396, y:297}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:429, y:264}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:363, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:495, y:429}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:594, y:462}],
[{o:ob_collision, x:627, y:462}],
[{o:ob_collision, x:627, y:462}],
[{o:ob_collision, x:627, y:396}],
[{o:ob_collision, x:627, y:363}],
[{o:ob_collision, x:660, y:363}],
[{o:ob_collision, x:660, y:429}],
[{o:ob_collision, x:660, y:462}],
[{o:ob_collision, x:660, y:462}],
[{o:ob_collision, x:627, y:429}],
[{o:ob_collision, x:561, y:462}],
[{o:ob_collision, x:495, y:462}],
[{o:ob_collision, x:1287, y:264}],
[{o:ob_collision, x:1320, y:264}],
[{o:ob_collision, x:1320, y:297}],
[{o:ob_collision, x:1287, y:297}],
[{o:ob_collision, x:1287, y:330}],
[{o:ob_collision, x:1320, y:363}],
[{o:ob_collision, x:1320, y:330}],
[{o:ob_collision, x:1320, y:330}],
[{o:ob_collision, x:1287, y:363}],
[{o:ob_collision, x:1353, y:363}],
[{o:ob_collision, x:1419, y:363}],
[{o:ob_collision, x:1419, y:363}],
[{o:ob_collision, x:1353, y:297}],
[{o:ob_collision, x:1386, y:297}],
[{o:ob_collision, x:1386, y:363}],
[{o:ob_collision, x:1419, y:297}],
[{o:ob_collision, x:1452, y:297}],
[{o:ob_collision, x:1485, y:297}],
[{o:ob_collision, x:1518, y:297}],
[{o:ob_collision, x:1518, y:297}],
[{o:ob_collision, x:1518, y:264}],
[{o:ob_collision, x:1518, y:231}],
[{o:ob_collision, x:1518, y:198}],
[{o:ob_collision, x:1485, y:198}],
[{o:ob_collision, x:1485, y:165}],
[{o:ob_collision, x:1518, y:165}],
[{o:ob_collision, x:1551, y:165}],
[{o:ob_collision, x:1551, y:198}],
[{o:ob_collision, x:1551, y:231}],
[{o:ob_collision, x:1551, y:231}],
[{o:ob_collision, x:1584, y:264}],
[{o:ob_collision, x:1617, y:264}],
[{o:ob_collision, x:1617, y:264}],
[{o:ob_collision, x:1650, y:264}],
[{o:ob_collision, x:1650, y:264}],
[{o:ob_collision, x:1683, y:264}],
[{o:ob_collision, x:1716, y:264}],
[{o:ob_collision, x:1749, y:264}],
[{o:ob_collision, x:1749, y:231}],
[{o:ob_collision, x:1749, y:231}],
[{o:ob_collision, x:1782, y:231}],
[{o:ob_collision, x:1782, y:264}],
[{o:ob_collision, x:1782, y:297}],
[{o:ob_collision, x:1749, y:297}],
[{o:ob_collision, x:1716, y:297}],
[{o:ob_collision, x:1683, y:297}],
[{o:ob_collision, x:1650, y:297}],
[{o:ob_collision, x:1617, y:297}],
[{o:ob_collision, x:1584, y:297}],
[{o:ob_collision, x:1551, y:297}],
[{o:ob_collision, x:1551, y:264}],
[{o:ob_collision, x:1551, y:297}],
[{o:ob_collision, x:1551, y:330}],
[{o:ob_collision, x:1551, y:363}],
[{o:ob_collision, x:1551, y:363}],
[{o:ob_collision, x:1518, y:363}],
[{o:ob_collision, x:1485, y:363}],
[{o:ob_collision, x:1452, y:363}],
[{o:ob_collision, x:1452, y:363}],
[{o:ob_collision, x:1353, y:297}],
[{o:ob_collision, x:1353, y:330}],
[{o:ob_collision, x:1419, y:330}],
[{o:ob_collision, x:1452, y:330}],
[{o:ob_collision, x:1485, y:330}],
[{o:ob_collision, x:1518, y:330}],
[{o:ob_collision, x:1518, y:330}],
[{o:ob_collision1, x:528, y:297}],
[{o:ob_collision1, x:561, y:297}],
[{o:ob_collision1, x:561, y:297}],
[{o:ob_collision1, x:561, y:297}],
[{o:ob_collision1, x:627, y:132}],
[{o:ob_collision1, x:825, y:198}],
[{o:ob_collision1, x:990, y:330}],
[{o:ob_collision1, x:1023, y:330}],
[{o:ob_collision1, x:1056, y:330}],
[{o:ob_collision1, x:1089, y:330}],
[{o:ob_collision1, x:1122, y:330}],
[{o:ob_collision1, x:1155, y:330}],
[{o:ob_collision1, x:1947, y:198}],
[{o:ob_collision1, x:2013, y:198}],
[{o:ob_collision1, x:2013, y:198}],
[{o:ob_collision1, x:1947, y:198}],
[{o:ob_collision1, x:2178, y:264}],
[{o:ob_collision1, x:2508, y:462}],
[{o:ob_collision1, x:2541, y:462}],
[{o:ob_collision1, x:2574, y:462}],
[{o:ob_collision, x:1980, y:198}],
[{o:ob_berend, x:1710, y:220}],
[{o:ob_berend, x:592, y:418}],
[{o:ob_berend, x:256, y:418}],
[{o:ob_collision1, x:462, y:132}],
[{o:ob_collision, x:396, y:429}],
[{o:ob_collision1, x:2475, y:462}],
[{o:ob_berend, x:1485, y:253}],
[{o:ob_collision, x:396, y:330}],
[{o:ob_edwin_rekt, x:340, y:125}],
[{o:ob_berend, x:1101, y:286}],
[{o:ob_collision2, x:957, y:297}],
[{o:ob_collision2, x:1188, y:297}],
[{o:ob_collision2, x:2442, y:429}],
[{o:ob_collision2, x:2574, y:429}],
[{o:ob_berend, x:2483, y:418}],
[{o:ob_berend, x:2534, y:418}],
[{o:ob_armpie, x:66, y:429}],
[{o:ob_hansch, x:66, y:429}]];
this.start = function() {
__room_start__(this, sc_lv3world1, 2640, 495, 30, 0, 0, 0, bg_world1_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv3world1 = new __sc_lv3world1();
tu_scenes.push(sc_lv3world1);
function __sc_lv1world2() { 
this.tiles = [
[1000000,
[tlset_grass_2,
[33,0,33,33,231,132],
[0,0,33,33,198,132],
[0,165,33,33,198,165],
[0,165,33,33,231,198],
[66,0,33,33,264,132],
[66,165,33,33,297,231],
[0,165,33,33,264,231],
[66,66,33,33,264,165],
[66,0,33,33,297,165],
[0,99,33,33,231,165],
[0,99,33,33,264,198],
[66,33,33,33,297,198],
[33,0,33,33,561,462],
[33,0,33,33,594,462],
[33,0,33,33,627,462],
[33,0,33,33,660,462],
[33,0,33,33,693,462],
[66,0,33,33,528,429],
[0,0,33,33,495,429],
[0,33,33,33,495,462],
[66,66,33,33,528,462],
[0,66,33,33,726,462],
[0,66,33,33,759,429],
[0,66,33,33,825,396],
[0,0,33,33,726,429],
[0,0,33,33,759,396],
[0,0,33,33,825,363],
[33,0,33,33,792,396],
[33,99,33,33,792,429],
[33,33,33,33,759,462],
[33,33,33,33,792,462],
[33,33,33,33,825,462],
[33,33,33,33,825,429],
[33,33,33,33,858,396],
[33,33,33,33,858,429],
[33,33,33,33,858,462],
[66,165,33,33,660,330],
[0,165,33,33,627,330],
[0,165,33,33,561,231],
[0,99,33,33,627,231],
[33,165,33,33,594,231],
[0,33,33,33,627,264],
[0,33,33,33,627,297],
[66,33,33,33,660,297],
[66,33,33,33,660,264],
[66,33,33,33,660,231],
[0,33,33,33,561,132],
[0,33,33,33,561,165],
[0,33,33,33,561,198],
[0,0,33,33,561,99],
[33,99,33,33,594,132],
[33,99,33,33,627,198],
[33,33,33,33,594,165],
[33,33,33,33,594,198],
[33,33,33,33,627,165],
[33,33,33,33,627,132],
[66,33,33,33,660,132],
[66,33,33,33,660,165],
[66,33,33,33,660,198],
[33,0,33,33,594,99],
[33,0,33,33,627,99],
[66,0,33,33,660,99],
[0,165,33,33,792,165],
[0,0,33,33,792,33],
[33,0,33,33,825,33],
[33,0,33,33,858,33],
[33,0,33,33,891,33],
[33,0,33,33,924,33],
[0,33,33,33,792,66],
[0,33,33,33,792,99],
[0,33,33,33,792,132],
[66,165,33,33,891,165],
[66,165,33,33,990,132],
[66,0,33,33,990,66],
[66,0,33,33,957,33],
[66,66,33,33,957,66],
[66,99,33,33,891,132],
[33,165,33,33,825,165],
[33,165,33,33,858,165],
[33,165,33,33,924,132],
[33,165,33,33,957,132],
[66,33,33,33,990,99],
[33,33,33,33,825,66],
[33,33,33,33,825,99],
[33,33,33,33,825,132],
[33,33,33,33,858,132],
[33,33,33,33,858,99],
[33,33,33,33,858,66],
[33,33,33,33,891,66],
[33,33,33,33,891,99],
[33,33,33,33,924,99],
[33,33,33,33,924,66],
[33,33,33,33,957,99],
[33,0,33,33,858,363],
[33,0,33,33,891,363],
[0,165,33,33,957,264],
[0,0,33,33,957,231],
[33,0,33,33,990,231],
[33,0,33,33,1023,231],
[33,165,33,33,990,264],
[33,165,33,33,1023,264],
[66,165,33,33,1056,264],
[66,0,33,33,924,363],
[66,33,33,33,924,396],
[66,33,33,33,924,429],
[66,33,33,33,924,462],
[33,33,33,33,891,396],
[33,33,33,33,891,429],
[33,33,33,33,891,462],
[66,0,33,33,1056,231],
[33,0,33,33,1056,231],
[0,165,33,33,1155,132],
[0,0,33,33,1155,99],
[33,0,33,33,1188,99],
[33,0,33,33,1221,99],
[33,0,33,33,1254,99],
[66,0,33,33,1287,99],
[0,33,33,33,1254,165],
[0,33,33,33,1254,198],
[0,33,33,33,1254,231],
[0,33,33,33,1254,264],
[0,33,33,33,1254,297],
[0,33,33,33,1254,330],
[0,165,33,33,1254,363],
[66,33,33,33,1287,132],
[66,33,33,33,1287,165],
[66,33,33,33,1287,198],
[66,33,33,33,1287,231],
[66,33,33,33,1287,264],
[66,165,33,33,1287,363],
[0,99,33,33,1254,132],
[33,165,33,33,1188,132],
[33,165,33,33,1221,132],
[66,66,33,33,1287,297],
[66,99,33,33,1287,330],
[33,165,33,33,1320,330],
[33,165,33,33,1353,330],
[33,165,33,33,1386,330],
[0,99,33,33,1419,330],
[0,33,33,33,1419,363],
[0,33,33,33,1419,396],
[0,33,33,33,1419,429],
[0,33,33,33,1419,462],
[33,0,33,33,1320,297],
[33,0,33,33,1353,297],
[33,0,33,33,1386,297],
[33,0,33,33,1419,297],
[33,0,33,33,1452,297],
[66,0,33,33,1485,297],
[66,33,33,33,1485,330],
[66,33,33,33,1485,363],
[66,33,33,33,1485,429],
[66,33,33,33,1485,429],
[66,33,33,33,1485,396],
[66,33,33,33,1485,462],
[33,99,33,33,1452,396],
[33,33,33,33,1452,330],
[33,33,33,33,1452,363],
[33,33,33,33,1452,429],
[33,33,33,33,1452,462],
[0,0,33,33,2145,264],
[0,165,33,33,2145,297],
[33,165,33,33,2178,297],
[33,0,33,33,2178,264],
[0,99,33,33,2211,297],
[0,132,33,33,2211,330],
[0,132,33,33,2211,363],
[0,33,33,33,2211,396],
[0,165,33,33,2211,429],
[33,165,33,33,2244,429],
[33,165,33,33,2277,429],
[33,165,33,33,2310,429],
[0,99,33,33,2343,429],
[0,132,33,33,2343,462],
[66,132,33,33,2376,462],
[66,132,33,33,2376,429],
[66,132,33,33,2376,396],
[66,0,33,33,2376,363],
[66,0,33,33,2343,330],
[66,0,33,33,2310,297],
[66,0,33,33,2277,264],
[33,0,33,33,2178,264],
[33,0,33,33,2244,264],
[33,0,33,33,2211,264],
[33,132,33,33,2244,297],
[33,132,33,33,2277,330],
[33,132,33,33,2310,363],
[33,132,33,33,2343,396],
[33,66,33,33,2310,396],
[33,99,33,33,2244,363],
[66,66,33,33,2277,297],
[66,66,33,33,2310,330],
[66,66,33,33,2343,363],
[33,33,33,33,2211,330],
[0,33,33,33,2211,330],
[33,33,33,33,2244,330],
[33,33,33,33,2277,363],
[33,33,33,33,2277,396],
[33,33,33,33,2244,396],
[33,99,33,33,891,99],
[0,33,33,33,2376,0],
[0,33,33,33,2376,33],
[0,33,33,33,2376,66],
[0,33,33,33,2376,99],
[0,165,33,33,2376,132],
[33,165,33,33,2409,132],
[33,165,33,33,2442,132],
[33,165,33,33,2475,132],
[0,99,33,33,2508,132],
[0,132,33,33,2508,165],
[0,132,33,33,2508,198],
[0,132,33,33,2508,231],
[0,165,33,33,2508,264],
[33,165,33,33,2541,264],
[33,165,33,33,2574,264],
[33,165,33,33,2607,264],
[33,132,33,33,2475,0],
[33,132,33,33,2409,0],
[33,132,33,33,2442,0],
[33,132,33,33,2508,0],
[33,132,33,33,2541,0],
[33,132,33,33,2574,0],
[33,132,33,33,2574,0],
[33,132,33,33,2607,0],
[33,132,33,33,2607,33],
[33,132,33,33,2607,66],
[33,132,33,33,2607,99],
[33,132,33,33,2607,132],
[33,132,33,33,2607,165],
[33,132,33,33,2607,198],
[33,132,33,33,2607,198],
[33,132,33,33,2607,231],
[33,132,33,33,2574,231],
[33,132,33,33,2574,231],
[33,132,33,33,2574,231],
[33,132,33,33,2541,231],
[33,132,33,33,2541,198],
[33,132,33,33,2574,198],
[33,132,33,33,2574,165],
[33,132,33,33,2541,165],
[33,132,33,33,2541,132],
[33,132,33,33,2574,132],
[33,132,33,33,2574,99],
[33,132,33,33,2541,99],
[33,132,33,33,2475,99],
[33,132,33,33,2442,99],
[33,132,33,33,2442,99],
[33,132,33,33,2508,99],
[33,132,33,33,2409,99],
[33,132,33,33,2409,66],
[33,132,33,33,2409,33],
[33,132,33,33,2442,33],
[33,132,33,33,2442,66],
[33,132,33,33,2475,33],
[33,132,33,33,2475,33],
[33,132,33,33,2541,33],
[33,132,33,33,2475,66],
[33,132,33,33,2508,33],
[33,132,33,33,2508,66],
[33,132,33,33,2574,66],
[33,132,33,33,2574,33],
[33,132,33,33,2541,66],
[33,66,33,33,2574,33],
[33,66,33,33,2442,66],
[33,66,33,33,2574,198]],
[tlset_plateau_2,
[33,33,33,33,396,330],
[0,0,33,33,363,297],
[66,0,33,33,429,297],
[33,0,33,33,396,297],
[0,33,33,33,363,330],
[66,33,33,33,429,330],
[66,66,33,33,1089,231]],
[tlset_platform_2,
[33,0,33,20,1056,396],
[0,0,33,20,1023,396],
[66,0,33,20,1089,396],
[99,0,33,20,1155,330],
[33,0,33,20,1056,231],
[33,0,33,20,1287,462],
[33,0,33,20,1320,462],
[33,0,33,20,1353,462],
[0,0,33,20,1254,462],
[66,0,33,20,1386,462],
[99,0,33,20,1452,198],
[99,0,33,20,1617,264],
[99,0,33,20,1815,396],
[99,0,33,20,1980,330],
[99,0,33,20,2508,363],
[99,0,33,20,2574,462],
[99,0,33,20,2475,396]]]];
this.objects = [
[{o:ob_leveleindt, x:2574, y:429}],
[{o:ob_collision, x:198, y:132}],
[{o:ob_collision, x:198, y:165}],
[{o:ob_collision, x:231, y:132}],
[{o:ob_collision, x:264, y:132}],
[{o:ob_collision, x:264, y:165}],
[{o:ob_collision, x:297, y:165}],
[{o:ob_collision, x:297, y:198}],
[{o:ob_collision, x:297, y:231}],
[{o:ob_collision, x:264, y:231}],
[{o:ob_collision, x:264, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:396, y:297}],
[{o:ob_collision, x:561, y:99}],
[{o:ob_collision, x:594, y:99}],
[{o:ob_collision, x:627, y:99}],
[{o:ob_collision, x:660, y:99}],
[{o:ob_collision, x:660, y:132}],
[{o:ob_collision, x:660, y:165}],
[{o:ob_collision, x:660, y:198}],
[{o:ob_collision, x:660, y:231}],
[{o:ob_collision, x:660, y:264}],
[{o:ob_collision, x:660, y:297}],
[{o:ob_collision, x:660, y:330}],
[{o:ob_collision, x:627, y:330}],
[{o:ob_collision, x:627, y:297}],
[{o:ob_collision, x:627, y:264}],
[{o:ob_collision, x:627, y:231}],
[{o:ob_collision, x:594, y:231}],
[{o:ob_collision, x:561, y:231}],
[{o:ob_collision, x:561, y:198}],
[{o:ob_collision, x:561, y:165}],
[{o:ob_collision, x:561, y:132}],
[{o:ob_collision, x:495, y:429}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:495, y:462}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:561, y:462}],
[{o:ob_collision, x:594, y:462}],
[{o:ob_collision, x:627, y:462}],
[{o:ob_collision, x:660, y:462}],
[{o:ob_collision, x:693, y:462}],
[{o:ob_collision, x:726, y:462}],
[{o:ob_collision, x:726, y:429}],
[{o:ob_collision, x:759, y:429}],
[{o:ob_collision, x:759, y:396}],
[{o:ob_collision, x:792, y:396}],
[{o:ob_collision, x:825, y:396}],
[{o:ob_collision, x:825, y:363}],
[{o:ob_collision, x:858, y:363}],
[{o:ob_collision, x:891, y:363}],
[{o:ob_collision, x:924, y:363}],
[{o:ob_collision, x:924, y:396}],
[{o:ob_collision, x:924, y:429}],
[{o:ob_collision, x:924, y:462}],
[{o:ob_collision, x:792, y:33}],
[{o:ob_collision, x:792, y:66}],
[{o:ob_collision, x:792, y:99}],
[{o:ob_collision, x:792, y:132}],
[{o:ob_collision, x:792, y:165}],
[{o:ob_collision, x:825, y:165}],
[{o:ob_collision, x:858, y:165}],
[{o:ob_collision, x:891, y:165}],
[{o:ob_collision, x:891, y:132}],
[{o:ob_collision, x:924, y:132}],
[{o:ob_collision, x:957, y:132}],
[{o:ob_collision, x:990, y:132}],
[{o:ob_collision, x:990, y:99}],
[{o:ob_collision, x:990, y:66}],
[{o:ob_collision, x:957, y:66}],
[{o:ob_collision, x:957, y:33}],
[{o:ob_collision, x:891, y:33}],
[{o:ob_collision, x:924, y:33}],
[{o:ob_collision, x:858, y:33}],
[{o:ob_collision, x:825, y:33}],
[{o:ob_collision, x:957, y:231}],
[{o:ob_collision, x:957, y:264}],
[{o:ob_collision, x:990, y:264}],
[{o:ob_collision, x:990, y:231}],
[{o:ob_collision, x:1023, y:231}],
[{o:ob_collision, x:1023, y:264}],
[{o:ob_collision, x:1056, y:264}],
[{o:ob_collision, x:1056, y:231}],
[{o:ob_collision, x:1155, y:99}],
[{o:ob_collision, x:1155, y:132}],
[{o:ob_collision, x:1188, y:132}],
[{o:ob_collision, x:1188, y:99}],
[{o:ob_collision, x:1221, y:99}],
[{o:ob_collision, x:1221, y:132}],
[{o:ob_collision, x:1254, y:132}],
[{o:ob_collision, x:1254, y:99}],
[{o:ob_collision, x:1287, y:132}],
[{o:ob_collision, x:1287, y:132}],
[{o:ob_collision, x:1287, y:99}],
[{o:ob_collision, x:1287, y:165}],
[{o:ob_collision, x:1254, y:165}],
[{o:ob_collision, x:1254, y:198}],
[{o:ob_collision, x:1287, y:198}],
[{o:ob_collision, x:1287, y:231}],
[{o:ob_collision, x:1254, y:231}],
[{o:ob_collision, x:1254, y:264}],
[{o:ob_collision, x:1287, y:264}],
[{o:ob_collision, x:1287, y:297}],
[{o:ob_collision, x:1254, y:297}],
[{o:ob_collision, x:1254, y:330}],
[{o:ob_collision, x:1254, y:363}],
[{o:ob_collision, x:1287, y:363}],
[{o:ob_collision, x:1287, y:330}],
[{o:ob_collision, x:1320, y:330}],
[{o:ob_collision, x:1320, y:297}],
[{o:ob_collision, x:1353, y:297}],
[{o:ob_collision, x:1419, y:297}],
[{o:ob_collision, x:1386, y:297}],
[{o:ob_collision, x:1452, y:297}],
[{o:ob_collision, x:1485, y:297}],
[{o:ob_collision, x:1485, y:330}],
[{o:ob_collision, x:1485, y:363}],
[{o:ob_collision, x:1485, y:396}],
[{o:ob_collision, x:1419, y:396}],
[{o:ob_collision, x:1419, y:429}],
[{o:ob_collision, x:1419, y:462}],
[{o:ob_collision, x:1485, y:462}],
[{o:ob_collision, x:1485, y:429}],
[{o:ob_collision, x:1419, y:363}],
[{o:ob_collision, x:1386, y:330}],
[{o:ob_collision, x:1386, y:330}],
[{o:ob_collision, x:1353, y:330}],
[{o:ob_collision, x:1419, y:330}],
[{o:ob_collision, x:2145, y:264}],
[{o:ob_collision, x:2145, y:297}],
[{o:ob_collision, x:2178, y:297}],
[{o:ob_collision, x:2178, y:264}],
[{o:ob_collision, x:2211, y:264}],
[{o:ob_collision, x:2211, y:297}],
[{o:ob_collision, x:2211, y:330}],
[{o:ob_collision, x:2211, y:363}],
[{o:ob_collision, x:2211, y:396}],
[{o:ob_collision, x:2211, y:429}],
[{o:ob_collision, x:2244, y:429}],
[{o:ob_collision, x:2277, y:429}],
[{o:ob_collision, x:2310, y:429}],
[{o:ob_collision, x:2310, y:330}],
[{o:ob_collision, x:2310, y:297}],
[{o:ob_collision, x:2277, y:264}],
[{o:ob_collision, x:2244, y:264}],
[{o:ob_collision, x:2343, y:330}],
[{o:ob_collision, x:2343, y:363}],
[{o:ob_collision, x:2376, y:363}],
[{o:ob_collision, x:2376, y:396}],
[{o:ob_collision, x:2376, y:429}],
[{o:ob_collision, x:2376, y:462}],
[{o:ob_collision, x:2343, y:429}],
[{o:ob_collision, x:2343, y:462}],
[{o:ob_collision, x:2508, y:264}],
[{o:ob_collision, x:2508, y:231}],
[{o:ob_collision, x:2508, y:198}],
[{o:ob_collision, x:2508, y:165}],
[{o:ob_collision, x:2508, y:132}],
[{o:ob_collision, x:2475, y:132}],
[{o:ob_collision, x:2442, y:132}],
[{o:ob_collision, x:2409, y:132}],
[{o:ob_collision, x:2376, y:132}],
[{o:ob_collision, x:2376, y:99}],
[{o:ob_collision, x:2376, y:66}],
[{o:ob_collision, x:2376, y:33}],
[{o:ob_collision, x:2376, y:0}],
[{o:ob_collision, x:2409, y:0}],
[{o:ob_collision, x:2442, y:0}],
[{o:ob_collision, x:2475, y:0}],
[{o:ob_collision, x:2508, y:0}],
[{o:ob_collision, x:2541, y:0}],
[{o:ob_collision, x:2574, y:0}],
[{o:ob_collision, x:2607, y:0}],
[{o:ob_collision, x:2607, y:33}],
[{o:ob_collision, x:2607, y:66}],
[{o:ob_collision, x:2607, y:99}],
[{o:ob_collision, x:2607, y:132}],
[{o:ob_collision, x:2607, y:165}],
[{o:ob_collision, x:2607, y:198}],
[{o:ob_collision, x:2607, y:231}],
[{o:ob_collision, x:2607, y:264}],
[{o:ob_collision, x:2574, y:264}],
[{o:ob_collision, x:2541, y:264}],
[{o:ob_collision1, x:1980, y:330}],
[{o:ob_collision1, x:2475, y:396}],
[{o:ob_collision1, x:2508, y:363}],
[{o:ob_collision1, x:2574, y:462}],
[{o:ob_collision1, x:1815, y:396}],
[{o:ob_collision1, x:1617, y:264}],
[{o:ob_collision1, x:1452, y:198}],
[{o:ob_collision1, x:1386, y:462}],
[{o:ob_collision1, x:1353, y:462}],
[{o:ob_collision1, x:1320, y:462}],
[{o:ob_collision1, x:1287, y:462}],
[{o:ob_collision1, x:1254, y:462}],
[{o:ob_collision1, x:1155, y:330}],
[{o:ob_collision1, x:1089, y:231}],
[{o:ob_collision1, x:1089, y:396}],
[{o:ob_collision1, x:1056, y:396}],
[{o:ob_collision1, x:1023, y:396}],
[{o:ob_collision1, x:429, y:297}],
[{o:ob_collision1, x:363, y:297}],
[{o:ob_collision, x:2277, y:297}],
[{o:ob_leven, x:0, y:0}],
[{o:ob_ricardo, x:679, y:419}],
[{o:ob_hart, x:1369, y:413}],
[{o:ob_armpie, x:165, y:33}],
[{o:ob_hansch, x:165, y:33}],
[{o:ob_music3, x:0, y:33}]];
this.start = function() {
__room_start__(this, sc_lv1world2, 2640, 495, 30, 0, 0, 0, bg_world2_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv1world2 = new __sc_lv1world2();
tu_scenes.push(sc_lv1world2);
function __sc_lv2world2() { 
this.tiles = [
[1000000,
[tlset_grass_2,
[0,0,33,33,33,132],
[33,0,33,33,66,132],
[33,0,33,33,99,132],
[33,0,33,33,132,132],
[33,0,33,33,165,132],
[33,0,33,33,198,132],
[66,0,33,33,231,132],
[66,33,33,33,231,165],
[66,33,33,33,231,165],
[66,33,33,33,231,198],
[66,165,33,33,231,231],
[33,165,33,33,198,231],
[33,165,33,33,165,231],
[66,99,33,33,132,231],
[66,165,33,33,132,264],
[33,165,33,33,99,264],
[0,165,33,33,66,264],
[0,132,33,33,66,231],
[0,99,33,33,66,165],
[0,165,33,33,33,165],
[0,132,33,33,66,198],
[33,33,33,33,99,165],
[33,33,33,33,132,165],
[33,33,33,33,165,165],
[33,33,33,33,198,165],
[33,33,33,33,198,198],
[33,33,33,33,165,198],
[33,33,33,33,132,198],
[33,33,33,33,132,198],
[33,33,33,33,99,198],
[33,33,33,33,99,231],
[33,66,33,33,99,165],
[33,66,33,33,198,198],
[66,99,33,33,198,231],
[0,99,33,33,165,231],
[0,132,33,33,165,264],
[0,132,33,33,165,297],
[66,132,33,33,198,264],
[66,132,33,33,198,297],
[66,66,33,33,198,330],
[66,0,33,33,231,330],
[66,66,33,33,231,363],
[33,0,33,33,264,363],
[33,0,33,33,297,363],
[33,0,33,33,330,363],
[33,0,33,33,363,363],
[33,0,33,33,363,363],
[33,0,33,33,363,363],
[33,0,33,33,396,363],
[33,0,33,33,429,363],
[33,0,33,33,495,363],
[33,0,33,33,462,363],
[0,33,33,33,165,330],
[0,165,33,33,165,363],
[0,165,33,33,198,396],
[0,99,33,33,198,363],
[33,165,33,33,231,396],
[33,165,33,33,297,396],
[33,165,33,33,264,396],
[33,165,33,33,330,396],
[33,165,33,33,363,396],
[33,165,33,33,396,396],
[33,165,33,33,429,396],
[33,165,33,33,462,396],
[33,165,33,33,495,396],
[33,165,33,33,528,396],
[33,165,33,33,561,396],
[33,165,33,33,594,396],
[33,165,33,33,660,396],
[33,165,33,33,660,396],
[33,165,33,33,693,396],
[33,165,33,33,627,396],
[33,165,33,33,726,396],
[33,165,33,33,792,396],
[33,165,33,33,825,396],
[33,165,33,33,759,396],
[33,165,33,33,858,396],
[33,165,33,33,891,396],
[33,165,33,33,957,396],
[33,165,33,33,990,396],
[33,165,33,33,990,396],
[33,165,33,33,924,396],
[33,165,33,33,1023,396],
[33,165,33,33,1056,396],
[33,165,33,33,1089,396],
[33,132,33,33,297,396],
[33,132,33,33,330,396],
[33,132,33,33,363,396],
[33,132,33,33,396,396],
[33,132,33,33,429,396],
[33,132,33,33,429,396],
[33,132,33,33,495,396],
[33,132,33,33,528,396],
[33,132,33,33,528,396],
[33,132,33,33,462,396],
[33,132,33,33,495,396],
[33,132,33,33,561,396],
[33,132,33,33,627,396],
[33,132,33,33,627,396],
[33,132,33,33,660,396],
[33,132,33,33,660,396],
[33,132,33,33,594,396],
[33,132,33,33,726,396],
[33,132,33,33,759,396],
[33,132,33,33,792,396],
[33,132,33,33,693,396],
[33,132,33,33,825,396],
[33,132,33,33,858,396],
[33,132,33,33,891,396],
[33,132,33,33,924,396],
[33,132,33,33,924,396],
[33,132,33,33,957,396],
[33,132,33,33,1023,396],
[33,132,33,33,1056,396],
[33,132,33,33,1056,396],
[33,132,33,33,1089,396],
[33,132,33,33,990,396],
[33,132,33,33,462,429],
[33,132,33,33,462,462],
[33,132,33,33,495,429],
[33,132,33,33,528,462],
[33,132,33,33,528,429],
[33,132,33,33,528,462],
[33,132,33,33,495,462],
[33,132,33,33,561,429],
[33,132,33,33,561,429],
[33,132,33,33,561,462],
[33,132,33,33,594,429],
[33,132,33,33,594,429],
[33,132,33,33,594,429],
[33,132,33,33,594,429],
[33,132,33,33,594,462],
[33,132,33,33,627,429],
[33,132,33,33,627,429],
[33,132,33,33,627,429],
[33,132,33,33,627,462],
[33,132,33,33,660,429],
[33,132,33,33,660,429],
[33,132,33,33,693,462],
[33,132,33,33,693,429],
[33,132,33,33,693,462],
[33,132,33,33,660,462],
[33,132,33,33,693,462],
[33,132,33,33,726,429],
[33,132,33,33,726,462],
[33,132,33,33,759,429],
[33,132,33,33,792,429],
[33,132,33,33,792,462],
[33,132,33,33,759,462],
[33,132,33,33,825,429],
[33,132,33,33,825,462],
[33,132,33,33,858,462],
[33,132,33,33,858,429],
[33,132,33,33,858,429],
[33,132,33,33,891,429],
[33,132,33,33,891,462],
[33,132,33,33,924,429],
[33,132,33,33,924,429],
[33,132,33,33,957,429],
[33,132,33,33,957,462],
[33,132,33,33,924,462],
[33,132,33,33,990,462],
[33,132,33,33,990,429],
[33,132,33,33,1023,429],
[33,132,33,33,1056,462],
[33,132,33,33,1023,462],
[33,132,33,33,1056,429],
[33,132,33,33,1089,429],
[33,132,33,33,1089,462],
[33,132,33,33,330,429],
[33,132,33,33,363,429],
[33,132,33,33,429,429],
[33,132,33,33,462,429],
[33,132,33,33,396,396],
[33,132,33,33,429,429],
[33,132,33,33,429,462],
[33,132,33,33,396,429],
[33,132,33,33,396,429],
[33,132,33,33,396,462],
[33,132,33,33,363,462],
[33,132,33,33,330,462],
[0,99,33,33,297,396],
[0,132,33,33,297,429],
[0,132,33,33,297,462],
[33,0,33,33,528,363],
[33,0,33,33,561,363],
[33,0,33,33,594,363],
[33,0,33,33,627,363],
[33,0,33,33,693,363],
[33,0,33,33,726,363],
[33,0,33,33,660,363],
[33,0,33,33,759,363],
[33,0,33,33,825,363],
[33,0,33,33,858,363],
[33,0,33,33,825,363],
[33,0,33,33,792,363],
[33,0,33,33,891,363],
[33,0,33,33,924,363],
[33,0,33,33,957,363],
[33,0,33,33,990,363],
[33,0,33,33,1023,363],
[33,0,33,33,1056,363],
[33,0,33,33,1089,363],
[33,0,33,33,1122,363],
[33,0,33,33,1386,363],
[33,0,33,33,1452,363],
[33,0,33,33,1452,363],
[33,0,33,33,1419,363],
[33,0,33,33,1518,363],
[33,0,33,33,1551,363],
[33,0,33,33,1848,363],
[33,0,33,33,1881,363],
[33,0,33,33,2013,363],
[33,0,33,33,2046,363],
[33,0,33,33,2079,363],
[33,0,33,33,2112,363],
[33,0,33,33,2145,363],
[33,0,33,33,2145,363],
[33,0,33,33,2178,363],
[33,0,33,33,2178,363],
[33,0,33,33,2211,363],
[33,0,33,33,2376,363],
[33,0,33,33,2343,363],
[33,0,33,33,2409,363],
[33,0,33,33,2442,363],
[33,0,33,33,2508,363],
[33,0,33,33,2541,363],
[33,0,33,33,2475,363],
[33,0,33,33,2607,363],
[33,0,33,33,2607,363],
[33,0,33,33,2574,363],
[33,132,33,33,1122,396],
[33,132,33,33,1287,396],
[33,132,33,33,1320,396],
[33,132,33,33,1353,396],
[33,132,33,33,1320,396],
[33,132,33,33,1386,396],
[33,132,33,33,1386,396],
[33,132,33,33,1386,429],
[33,132,33,33,1386,462],
[33,132,33,33,1353,429],
[33,132,33,33,1353,429],
[33,132,33,33,1353,429],
[33,132,33,33,1353,462],
[33,132,33,33,1320,429],
[33,132,33,33,1320,429],
[33,132,33,33,1320,462],
[33,132,33,33,1287,429],
[33,132,33,33,1287,429],
[33,132,33,33,1287,462],
[33,132,33,33,1254,429],
[33,132,33,33,1254,429],
[33,132,33,33,1254,462],
[33,132,33,33,1221,429],
[33,132,33,33,1221,462],
[33,132,33,33,1221,462],
[33,132,33,33,1122,462],
[33,132,33,33,1122,429],
[33,132,33,33,1122,429],
[33,132,33,33,1419,396],
[33,132,33,33,1419,429],
[33,132,33,33,1452,462],
[33,132,33,33,1452,429],
[33,132,33,33,1452,396],
[33,132,33,33,1452,429],
[33,132,33,33,1419,462],
[33,132,33,33,1518,429],
[33,132,33,33,1518,396],
[33,132,33,33,1518,429],
[33,132,33,33,1551,429],
[33,132,33,33,1518,462],
[33,132,33,33,1551,462],
[33,132,33,33,1551,462],
[33,132,33,33,1551,363],
[33,132,33,33,1551,396],
[33,0,33,33,1551,363],
[33,132,33,33,1848,429],
[33,132,33,33,1848,396],
[33,132,33,33,1848,396],
[33,132,33,33,1848,429],
[33,132,33,33,1848,462],
[33,132,33,33,1848,462],
[33,132,33,33,1881,396],
[33,132,33,33,1881,429],
[33,132,33,33,1881,462],
[33,132,33,33,1914,396],
[33,132,33,33,1914,396],
[33,132,33,33,1914,462],
[33,132,33,33,1914,429],
[33,132,33,33,1980,429],
[33,132,33,33,1980,429],
[33,132,33,33,1980,462],
[33,132,33,33,1980,396],
[33,132,33,33,2013,396],
[33,132,33,33,2013,429],
[33,132,33,33,2046,429],
[33,132,33,33,2046,429],
[33,132,33,33,2046,429],
[33,132,33,33,2013,429],
[33,132,33,33,2046,462],
[33,132,33,33,2046,462],
[33,132,33,33,1980,429],
[33,132,33,33,1980,429],
[33,132,33,33,2013,462],
[33,132,33,33,2046,396],
[33,132,33,33,2079,429],
[33,132,33,33,2079,429],
[33,132,33,33,2079,462],
[33,132,33,33,2079,396],
[33,132,33,33,2112,396],
[33,132,33,33,2112,429],
[33,132,33,33,2145,462],
[33,132,33,33,2145,396],
[33,132,33,33,2145,462],
[33,132,33,33,2112,462],
[33,132,33,33,2145,429],
[33,132,33,33,2211,363],
[33,132,33,33,2178,429],
[33,132,33,33,2178,429],
[33,132,33,33,2178,462],
[33,132,33,33,2211,429],
[33,132,33,33,2178,396],
[33,132,33,33,2211,396],
[33,132,33,33,2211,462],
[33,0,33,33,2211,363],
[33,33,33,33,2343,396],
[33,33,33,33,2376,396],
[33,33,33,33,2442,396],
[33,33,33,33,2475,396],
[33,33,33,33,2475,396],
[33,33,33,33,2409,396],
[33,33,33,33,2541,396],
[33,33,33,33,2574,396],
[33,33,33,33,2607,396],
[33,33,33,33,2508,396],
[33,33,33,33,2607,429],
[33,33,33,33,2574,429],
[33,33,33,33,2541,429],
[33,33,33,33,2508,396],
[33,33,33,33,2475,396],
[33,33,33,33,2475,429],
[33,33,33,33,2508,429],
[33,33,33,33,2508,429],
[33,33,33,33,2409,429],
[33,33,33,33,2442,429],
[33,33,33,33,2376,429],
[33,33,33,33,2343,429],
[33,33,33,33,2343,462],
[33,33,33,33,2343,462],
[33,33,33,33,2376,462],
[33,33,33,33,2409,462],
[33,33,33,33,2442,462],
[33,33,33,33,2475,462],
[33,33,33,33,2508,462],
[33,33,33,33,2541,462],
[33,33,33,33,2574,462],
[33,33,33,33,2607,462],
[33,33,33,33,2607,462],
[33,33,33,33,462,363],
[33,33,33,33,495,363],
[0,66,33,33,462,363],
[66,66,33,33,495,363],
[0,33,33,33,462,330],
[0,33,33,33,462,297],
[66,33,33,33,495,330],
[66,33,33,33,495,297],
[0,0,33,33,462,264],
[66,0,33,33,495,264],
[66,0,33,33,660,297],
[0,0,33,33,627,297],
[0,33,33,33,627,330],
[66,33,33,33,660,330],
[0,66,33,33,627,363],
[66,66,33,33,660,363],
[33,66,33,33,396,396],
[33,66,33,33,660,429],
[33,66,33,33,924,396],
[33,66,33,33,1320,462],
[33,66,33,33,2112,429],
[33,66,33,33,2607,396],
[0,0,33,33,825,330],
[66,0,33,33,858,330],
[0,66,33,33,825,363],
[66,66,33,33,858,363],
[66,0,33,33,1122,363],
[66,132,33,33,1122,396],
[66,132,33,33,1122,429],
[66,132,33,33,1122,462],
[0,33,33,33,1221,462],
[0,0,33,33,1221,429],
[33,0,33,33,1254,429],
[33,0,33,33,1320,396],
[0,0,33,33,1287,396],
[0,66,33,33,1287,429],
[0,66,33,33,1353,396],
[0,0,33,33,1353,363],
[0,66,33,33,1518,363],
[66,66,33,33,1551,363],
[0,33,33,33,1518,330],
[0,33,33,33,1518,297],
[66,33,33,33,1551,330],
[66,33,33,33,1551,297],
[66,0,33,33,1551,264],
[0,0,33,33,1518,264],
[0,0,33,33,1419,330],
[66,0,33,33,1452,330],
[66,66,33,33,1452,363],
[0,66,33,33,1419,363],
[0,0,33,33,1683,198],
[66,0,33,33,1716,198],
[66,165,33,33,1716,231],
[0,165,33,33,1683,231],
[0,165,33,33,1848,132],
[33,165,33,33,1881,132],
[33,165,33,33,1914,132],
[33,165,33,33,1947,132],
[66,165,33,33,1980,132],
[66,33,33,33,1980,66],
[66,33,33,33,1980,99],
[66,0,33,33,1980,66],
[33,0,33,33,1947,66],
[0,0,33,33,1914,66],
[0,66,33,33,1914,99],
[33,0,33,33,1881,99],
[0,0,33,33,1848,99],
[33,66,33,33,1947,99],
[66,33,33,33,1452,363],
[66,33,33,33,1452,396],
[66,33,33,33,1452,429],
[66,33,33,33,1452,462],
[0,33,33,33,1518,363],
[0,33,33,33,1518,396],
[0,33,33,33,1518,429],
[0,33,33,33,1518,462],
[66,33,33,33,1551,363],
[66,33,33,33,1551,396],
[66,33,33,33,1551,429],
[66,33,33,33,1551,462],
[0,0,33,33,1815,363],
[0,33,33,33,1815,396],
[0,33,33,33,1815,429],
[0,33,33,33,1815,462],
[66,33,33,33,1914,396],
[66,33,33,33,1914,429],
[66,33,33,33,1914,462],
[0,0,33,33,2046,297],
[66,0,33,33,2211,231],
[0,0,33,33,2112,231],
[33,0,33,33,2145,231],
[33,0,33,33,2178,231],
[33,0,33,33,2079,297],
[0,66,33,33,2112,297],
[0,33,33,33,2112,264],
[66,33,33,33,2211,264],
[66,33,33,33,2211,297],
[66,33,33,33,2211,330],
[66,33,33,33,2211,363],
[66,33,33,33,2211,396],
[66,33,33,33,2211,429],
[66,33,33,33,2211,429],
[66,33,33,33,2211,462],
[0,33,33,33,2046,330],
[0,66,33,33,2046,363],
[0,33,33,33,2079,363],
[0,33,33,33,2112,363],
[33,33,33,33,2079,363],
[33,33,33,33,2112,363],
[33,33,33,33,2145,363],
[33,33,33,33,2145,363],
[33,33,33,33,2178,363],
[33,33,33,33,2178,363],
[33,33,33,33,2178,363],
[33,33,33,33,2178,330],
[33,33,33,33,2178,297],
[33,33,33,33,2178,264],
[33,33,33,33,2145,264],
[33,33,33,33,2145,297],
[33,33,33,33,2145,330],
[33,33,33,33,2112,330],
[33,33,33,33,2079,330],
[33,33,33,33,2079,330],
[0,33,33,33,1980,396],
[0,33,33,33,1980,429],
[0,33,33,33,1980,462],
[66,0,33,33,1914,363],
[0,0,33,33,1980,363],
[0,33,33,33,2343,363],
[0,33,33,33,2343,396],
[0,33,33,33,2343,429],
[0,33,33,33,2343,462],
[0,33,33,33,2343,330],
[0,33,33,33,2343,297],
[0,0,33,33,2343,264],
[66,0,33,33,2376,264],
[66,33,33,33,2376,297],
[66,33,33,33,2376,330],
[66,66,33,33,2376,363],
[0,0,33,33,2475,297],
[0,33,33,33,2475,330],
[66,33,33,33,2508,330],
[66,0,33,33,2508,297],
[0,66,33,33,2475,363],
[66,66,33,33,2508,363],
[0,0,33,33,2607,330],
[0,66,33,33,2607,363]]]];
this.objects = [
[{o:ob_leven, x:0, y:0}],
[{o:ob_leveleindt, x:2607, y:297}],
[{o:ob_collision, x:33, y:132}],
[{o:ob_collision, x:66, y:132}],
[{o:ob_collision, x:99, y:132}],
[{o:ob_collision, x:132, y:132}],
[{o:ob_collision, x:165, y:132}],
[{o:ob_collision, x:198, y:132}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:198, y:165}],
[{o:ob_collision, x:198, y:165}],
[{o:ob_collision, x:132, y:165}],
[{o:ob_collision, x:99, y:165}],
[{o:ob_collision, x:99, y:165}],
[{o:ob_collision, x:33, y:165}],
[{o:ob_collision, x:33, y:165}],
[{o:ob_collision, x:66, y:165}],
[{o:ob_collision, x:66, y:198}],
[{o:ob_collision, x:66, y:198}],
[{o:ob_collision, x:66, y:231}],
[{o:ob_collision, x:66, y:264}],
[{o:ob_collision, x:99, y:264}],
[{o:ob_collision, x:132, y:264}],
[{o:ob_collision, x:132, y:231}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:99, y:198}],
[{o:ob_collision, x:132, y:198}],
[{o:ob_collision, x:165, y:165}],
[{o:ob_collision, x:165, y:165}],
[{o:ob_collision, x:165, y:198}],
[{o:ob_collision, x:198, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:231}],
[{o:ob_collision, x:198, y:231}],
[{o:ob_collision, x:165, y:231}],
[{o:ob_collision, x:165, y:264}],
[{o:ob_collision, x:165, y:297}],
[{o:ob_collision, x:198, y:330}],
[{o:ob_collision, x:198, y:297}],
[{o:ob_collision, x:198, y:264}],
[{o:ob_collision, x:165, y:330}],
[{o:ob_collision, x:198, y:363}],
[{o:ob_collision, x:198, y:363}],
[{o:ob_collision, x:231, y:330}],
[{o:ob_collision, x:231, y:363}],
[{o:ob_collision, x:165, y:363}],
[{o:ob_collision, x:231, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:264, y:363}],
[{o:ob_collision, x:198, y:396}],
[{o:ob_collision, x:297, y:396}],
[{o:ob_collision, x:297, y:429}],
[{o:ob_collision, x:297, y:462}],
[{o:ob_collision, x:330, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:429, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:363, y:462}],
[{o:ob_collision, x:363, y:429}],
[{o:ob_collision, x:330, y:429}],
[{o:ob_collision, x:330, y:396}],
[{o:ob_collision, x:363, y:396}],
[{o:ob_collision, x:297, y:363}],
[{o:ob_collision, x:330, y:363}],
[{o:ob_collision, x:363, y:363}],
[{o:ob_collision, x:396, y:363}],
[{o:ob_collision, x:429, y:363}],
[{o:ob_collision, x:462, y:363}],
[{o:ob_collision, x:462, y:330}],
[{o:ob_collision, x:462, y:330}],
[{o:ob_collision, x:462, y:297}],
[{o:ob_collision, x:462, y:264}],
[{o:ob_collision, x:495, y:264}],
[{o:ob_collision, x:495, y:297}],
[{o:ob_collision, x:495, y:297}],
[{o:ob_collision, x:495, y:330}],
[{o:ob_collision, x:495, y:363}],
[{o:ob_collision, x:528, y:363}],
[{o:ob_collision, x:528, y:363}],
[{o:ob_collision, x:561, y:363}],
[{o:ob_collision, x:594, y:363}],
[{o:ob_collision, x:627, y:363}],
[{o:ob_collision, x:627, y:297}],
[{o:ob_collision, x:660, y:297}],
[{o:ob_collision, x:660, y:330}],
[{o:ob_collision, x:627, y:330}],
[{o:ob_collision, x:660, y:330}],
[{o:ob_collision, x:660, y:363}],
[{o:ob_collision, x:660, y:363}],
[{o:ob_collision, x:693, y:363}],
[{o:ob_collision, x:726, y:363}],
[{o:ob_collision, x:759, y:363}],
[{o:ob_collision, x:792, y:363}],
[{o:ob_collision, x:825, y:363}],
[{o:ob_collision, x:825, y:330}],
[{o:ob_collision, x:825, y:330}],
[{o:ob_collision, x:858, y:363}],
[{o:ob_collision, x:858, y:363}],
[{o:ob_collision, x:924, y:363}],
[{o:ob_collision, x:924, y:363}],
[{o:ob_collision, x:891, y:363}],
[{o:ob_collision, x:957, y:363}],
[{o:ob_collision, x:1023, y:363}],
[{o:ob_collision, x:990, y:363}],
[{o:ob_collision, x:1023, y:363}],
[{o:ob_collision, x:1056, y:363}],
[{o:ob_collision, x:1089, y:363}],
[{o:ob_collision, x:1122, y:363}],
[{o:ob_collision, x:1122, y:396}],
[{o:ob_collision, x:1122, y:429}],
[{o:ob_collision, x:1122, y:462}],
[{o:ob_collision, x:1221, y:462}],
[{o:ob_collision, x:1221, y:429}],
[{o:ob_collision, x:1254, y:429}],
[{o:ob_collision, x:1287, y:429}],
[{o:ob_collision, x:1287, y:396}],
[{o:ob_collision, x:1320, y:396}],
[{o:ob_collision, x:1353, y:396}],
[{o:ob_collision, x:1353, y:363}],
[{o:ob_collision, x:1386, y:363}],
[{o:ob_collision, x:1419, y:363}],
[{o:ob_collision, x:1419, y:330}],
[{o:ob_collision, x:1452, y:330}],
[{o:ob_collision, x:1452, y:363}],
[{o:ob_collision, x:1452, y:396}],
[{o:ob_collision, x:1452, y:429}],
[{o:ob_collision, x:1452, y:429}],
[{o:ob_collision, x:1452, y:462}],
[{o:ob_collision, x:1518, y:462}],
[{o:ob_collision, x:1518, y:429}],
[{o:ob_collision, x:1518, y:396}],
[{o:ob_collision, x:1518, y:396}],
[{o:ob_collision, x:1518, y:363}],
[{o:ob_collision, x:1518, y:330}],
[{o:ob_collision, x:1518, y:297}],
[{o:ob_collision, x:1518, y:264}],
[{o:ob_collision, x:1518, y:264}],
[{o:ob_collision, x:1551, y:264}],
[{o:ob_collision, x:1551, y:297}],
[{o:ob_collision, x:1551, y:330}],
[{o:ob_collision, x:1551, y:363}],
[{o:ob_collision, x:1551, y:396}],
[{o:ob_collision, x:1551, y:396}],
[{o:ob_collision, x:1551, y:429}],
[{o:ob_collision, x:1551, y:462}],
[{o:ob_collision, x:1683, y:231}],
[{o:ob_collision, x:1683, y:198}],
[{o:ob_collision, x:1716, y:198}],
[{o:ob_collision, x:1716, y:231}],
[{o:ob_collision, x:1848, y:132}],
[{o:ob_collision, x:1848, y:99}],
[{o:ob_collision, x:1881, y:99}],
[{o:ob_collision, x:1914, y:99}],
[{o:ob_collision, x:1914, y:66}],
[{o:ob_collision, x:1914, y:66}],
[{o:ob_collision, x:1980, y:66}],
[{o:ob_collision, x:1980, y:66}],
[{o:ob_collision, x:1980, y:99}],
[{o:ob_collision, x:1947, y:66}],
[{o:ob_collision, x:1980, y:132}],
[{o:ob_collision, x:1947, y:132}],
[{o:ob_collision, x:1914, y:132}],
[{o:ob_collision, x:1881, y:132}],
[{o:ob_collision, x:1815, y:462}],
[{o:ob_collision, x:1815, y:429}],
[{o:ob_collision, x:1815, y:396}],
[{o:ob_collision, x:1815, y:363}],
[{o:ob_collision, x:1848, y:363}],
[{o:ob_collision, x:1881, y:363}],
[{o:ob_collision, x:1914, y:363}],
[{o:ob_collision, x:1914, y:396}],
[{o:ob_collision, x:1914, y:429}],
[{o:ob_collision, x:1914, y:429}],
[{o:ob_collision, x:1914, y:429}],
[{o:ob_collision, x:1914, y:429}],
[{o:ob_collision, x:1914, y:462}],
[{o:ob_collision, x:1980, y:462}],
[{o:ob_collision, x:1980, y:396}],
[{o:ob_collision, x:1980, y:396}],
[{o:ob_collision, x:1980, y:363}],
[{o:ob_collision, x:2013, y:363}],
[{o:ob_collision, x:2046, y:363}],
[{o:ob_collision, x:2079, y:330}],
[{o:ob_collision, x:2046, y:330}],
[{o:ob_collision, x:2046, y:297}],
[{o:ob_collision, x:2079, y:297}],
[{o:ob_collision, x:2112, y:297}],
[{o:ob_collision, x:2112, y:264}],
[{o:ob_collision, x:2112, y:231}],
[{o:ob_collision, x:2145, y:231}],
[{o:ob_collision, x:2178, y:231}],
[{o:ob_collision, x:2178, y:231}],
[{o:ob_collision, x:2211, y:231}],
[{o:ob_collision, x:2211, y:264}],
[{o:ob_collision, x:2211, y:297}],
[{o:ob_collision, x:2211, y:330}],
[{o:ob_collision, x:2211, y:363}],
[{o:ob_collision, x:2211, y:396}],
[{o:ob_collision, x:2211, y:429}],
[{o:ob_collision, x:2211, y:462}],
[{o:ob_collision, x:1980, y:429}],
[{o:ob_collision, x:2343, y:462}],
[{o:ob_collision, x:2343, y:429}],
[{o:ob_collision, x:2343, y:363}],
[{o:ob_collision, x:2343, y:330}],
[{o:ob_collision, x:2343, y:330}],
[{o:ob_collision, x:2343, y:297}],
[{o:ob_collision, x:2376, y:264}],
[{o:ob_collision, x:2376, y:264}],
[{o:ob_collision, x:2376, y:297}],
[{o:ob_collision, x:2376, y:363}],
[{o:ob_collision, x:2376, y:363}],
[{o:ob_collision, x:2376, y:396}],
[{o:ob_collision, x:2343, y:396}],
[{o:ob_collision, x:2343, y:264}],
[{o:ob_collision, x:2409, y:363}],
[{o:ob_collision, x:2442, y:363}],
[{o:ob_collision, x:2475, y:363}],
[{o:ob_collision, x:2475, y:330}],
[{o:ob_collision, x:2475, y:297}],
[{o:ob_collision, x:2508, y:297}],
[{o:ob_collision, x:2508, y:330}],
[{o:ob_collision, x:2508, y:363}],
[{o:ob_collision, x:2541, y:363}],
[{o:ob_collision, x:2541, y:363}],
[{o:ob_collision, x:2574, y:363}],
[{o:ob_collision, x:2607, y:363}],
[{o:ob_collision, x:2607, y:363}],
[{o:ob_collision, x:2607, y:330}],
[{o:ob_collision, x:2376, y:330}],
[{o:ob_collision, x:231, y:132}],
[{o:ob_collision, x:858, y:330}],
[{o:ob_yogbert, x:475, y:219}],
[{o:ob_yogbert, x:648, y:252}],
[{o:ob_yogbert, x:847, y:285}],
[{o:ob_yogbert, x:1540, y:219}],
[{o:ob_yogbert, x:1695, y:153}],
[{o:ob_yogbert, x:1877, y:319}],
[{o:ob_yogbert, x:2493, y:252}],
[{o:ob_yogbert, x:2356, y:219}],
[{o:ob_collision2, x:2310, y:231}],
[{o:ob_collision2, x:2409, y:231}],
[{o:ob_collision2, x:2442, y:264}],
[{o:ob_collision2, x:2541, y:264}],
[{o:ob_collision2, x:1782, y:330}],
[{o:ob_collision2, x:1947, y:330}],
[{o:ob_collision2, x:1650, y:165}],
[{o:ob_collision2, x:1749, y:165}],
[{o:ob_collision2, x:1584, y:231}],
[{o:ob_collision2, x:1485, y:231}],
[{o:ob_collision2, x:792, y:297}],
[{o:ob_collision2, x:891, y:297}],
[{o:ob_collision2, x:693, y:264}],
[{o:ob_collision2, x:429, y:231}],
[{o:ob_collision2, x:528, y:231}],
[{o:ob_collision2, x:594, y:264}],
[{o:ob_kanoon_rekt, x:231, y:297}],
[{o:ob_kanoon_linx, x:429, y:330}],
[{o:ob_kanoon_linx, x:2178, y:198}],
[{o:ob_kanoon_linx, x:1947, y:33}],
[{o:ob_collision, x:1947, y:33}],
[{o:ob_collision, x:2178, y:198}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:231, y:297}],
[{o:ob_armpie, x:66, y:99}],
[{o:ob_hansch, x:66, y:99}]];
this.start = function() {
__room_start__(this, sc_lv2world2, 2640, 495, 30, 0, 0, 0, bg_world2_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv2world2 = new __sc_lv2world2();
tu_scenes.push(sc_lv2world2);
function __sc_lv3world2() { 
this.tiles = [
[1000000,
[tlset_grass_2,
[33,0,33,33,0,66],
[33,0,33,33,33,66],
[66,0,33,33,66,66],
[0,33,33,33,231,0],
[0,33,33,33,231,33],
[0,33,33,33,231,66],
[0,33,33,33,231,99],
[0,33,33,33,231,132],
[0,33,33,33,231,165],
[0,33,33,33,231,198],
[0,165,33,33,231,231],
[33,165,33,33,264,231],
[66,33,33,33,66,99],
[33,0,33,33,198,165],
[33,165,33,33,198,198],
[0,99,33,33,231,198],
[0,66,33,33,231,165],
[0,0,33,33,165,165],
[0,0,33,33,132,198],
[66,99,33,33,198,198],
[66,165,33,33,198,231],
[0,165,33,33,132,231],
[33,132,33,33,165,231],
[0,66,33,33,165,198],
[66,165,33,33,66,132],
[66,99,33,33,33,132],
[0,0,33,33,99,231],
[0,66,33,33,132,231],
[0,165,33,33,99,264],
[66,0,33,33,0,231],
[66,165,33,33,0,264],
[33,165,33,33,33,132],
[33,165,33,33,0,132],
[33,33,33,33,0,99],
[33,33,33,33,33,99],
[33,165,33,33,132,264],
[66,165,33,33,165,264],
[66,99,33,33,165,231],
[33,0,33,33,66,363],
[33,0,33,33,99,363],
[0,66,33,33,132,363],
[0,0,33,33,132,330],
[66,0,33,33,165,330],
[66,33,33,33,165,363],
[66,66,33,33,165,363],
[33,0,33,33,198,363],
[33,0,33,33,231,363],
[0,66,33,33,264,363],
[0,0,33,33,264,330],
[33,0,33,33,297,330],
[33,0,33,33,330,330],
[0,66,33,33,363,330],
[0,33,33,33,363,297],
[0,33,33,33,363,264],
[0,33,33,33,363,231],
[0,0,33,33,33,363],
[66,165,33,33,297,231],
[0,165,33,33,33,396],
[66,0,33,33,297,198],
[66,66,33,33,264,198],
[66,33,33,33,264,165],
[66,33,33,33,264,132],
[66,33,33,33,264,99],
[66,33,33,33,264,66],
[66,33,33,33,264,33],
[66,33,33,33,264,0],
[66,165,33,33,297,99],
[66,0,33,33,297,66],
[66,66,33,33,264,66],
[66,99,33,33,264,99],
[0,0,33,33,363,198],
[33,0,33,33,396,198],
[33,0,33,33,429,198],
[33,0,33,33,462,198],
[0,66,33,33,495,198],
[0,33,33,33,495,165],
[0,33,33,33,495,132],
[0,99,33,33,495,99],
[33,165,33,33,462,99],
[33,165,33,33,429,99],
[33,165,33,33,396,99],
[0,165,33,33,363,99],
[0,0,33,33,363,66],
[33,0,33,33,396,66],
[33,0,33,33,429,66],
[33,0,33,33,462,66],
[33,0,33,33,495,66],
[66,0,33,33,528,66],
[66,66,33,33,528,99],
[66,0,33,33,561,99],
[66,165,33,33,561,132],
[66,99,33,33,528,132],
[0,0,33,33,594,231],
[0,66,33,33,627,231],
[0,33,33,33,627,198],
[0,33,33,33,627,165],
[0,33,33,33,627,132],
[0,33,33,33,627,99],
[0,33,33,33,627,66],
[0,33,33,33,627,33],
[0,33,33,33,627,0],
[33,165,33,33,66,396],
[33,165,33,33,99,396],
[33,165,33,33,132,396],
[33,165,33,33,165,396],
[33,165,33,33,198,396],
[33,165,33,33,264,396],
[33,165,33,33,231,396],
[33,165,33,33,297,396],
[33,165,33,33,330,396],
[33,165,33,33,363,396],
[66,165,33,33,396,396],
[66,33,33,33,396,363],
[66,33,33,33,396,330],
[66,33,33,33,396,297],
[66,33,33,33,396,264],
[66,99,33,33,396,231],
[33,165,33,33,429,231],
[33,165,33,33,462,231],
[33,165,33,33,495,231],
[66,165,33,33,528,231],
[66,33,33,33,528,198],
[66,33,33,33,528,165],
[0,33,33,33,594,264],
[0,165,33,33,594,297],
[33,165,33,33,627,297],
[33,66,33,33,627,264],
[33,66,33,33,363,363],
[33,33,33,33,330,363],
[33,33,33,33,297,363],
[33,0,33,33,627,396],
[33,0,33,33,594,396],
[0,0,33,33,561,396],
[0,33,33,33,561,429],
[0,66,33,33,528,462],
[0,66,33,33,561,462],
[33,0,33,33,528,462],
[33,0,33,33,495,462],
[0,0,33,33,462,462],
[0,165,33,33,462,495],
[33,165,33,33,495,495],
[33,165,33,33,528,495],
[33,165,33,33,561,495],
[0,99,33,33,594,495],
[0,132,33,33,594,528],
[0,132,33,33,594,561],
[0,132,33,33,594,594],
[33,33,33,33,594,429],
[33,33,33,33,627,429],
[33,33,33,33,627,462],
[33,33,33,33,594,462],
[33,33,33,33,627,528],
[33,33,33,33,627,528],
[33,33,33,33,627,561],
[33,33,33,33,627,528],
[33,33,33,33,627,561],
[33,33,33,33,627,495],
[33,33,33,33,627,594]],
[tlset_platform_2,
[99,0,33,20,0,495],
[99,0,33,20,132,561],
[99,0,33,20,297,495],
[99,0,33,20,0,561],
[99,0,33,20,396,561],
[99,0,33,20,528,330]]]];
this.objects = [
[{o:ob_collision, x:0, y:264}],
[{o:ob_collision, x:0, y:231}],
[{o:ob_collision, x:0, y:132}],
[{o:ob_collision, x:33, y:132}],
[{o:ob_collision, x:66, y:132}],
[{o:ob_collision, x:66, y:66}],
[{o:ob_collision, x:33, y:66}],
[{o:ob_collision, x:33, y:66}],
[{o:ob_collision, x:0, y:66}],
[{o:ob_collision, x:66, y:99}],
[{o:ob_collision, x:33, y:99}],
[{o:ob_collision, x:0, y:99}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:132, y:198}],
[{o:ob_collision, x:132, y:231}],
[{o:ob_collision, x:165, y:198}],
[{o:ob_collision, x:165, y:165}],
[{o:ob_collision, x:198, y:165}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:231, y:132}],
[{o:ob_collision, x:231, y:99}],
[{o:ob_collision, x:231, y:33}],
[{o:ob_collision, x:231, y:33}],
[{o:ob_collision, x:231, y:0}],
[{o:ob_collision, x:231, y:0}],
[{o:ob_collision, x:264, y:0}],
[{o:ob_collision, x:264, y:33}],
[{o:ob_collision, x:231, y:66}],
[{o:ob_collision, x:264, y:66}],
[{o:ob_collision, x:297, y:66}],
[{o:ob_collision, x:297, y:99}],
[{o:ob_collision, x:264, y:99}],
[{o:ob_collision, x:264, y:132}],
[{o:ob_collision, x:264, y:165}],
[{o:ob_collision, x:264, y:198}],
[{o:ob_collision, x:264, y:198}],
[{o:ob_collision, x:297, y:198}],
[{o:ob_collision, x:297, y:231}],
[{o:ob_collision, x:231, y:231}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:264, y:231}],
[{o:ob_collision, x:198, y:198}],
[{o:ob_collision, x:198, y:231}],
[{o:ob_collision, x:165, y:231}],
[{o:ob_collision, x:165, y:264}],
[{o:ob_collision, x:132, y:264}],
[{o:ob_collision, x:99, y:264}],
[{o:ob_collision, x:33, y:363}],
[{o:ob_collision, x:66, y:363}],
[{o:ob_collision, x:99, y:363}],
[{o:ob_collision, x:132, y:363}],
[{o:ob_collision, x:132, y:330}],
[{o:ob_collision, x:165, y:330}],
[{o:ob_collision, x:165, y:363}],
[{o:ob_collision, x:198, y:363}],
[{o:ob_collision, x:231, y:363}],
[{o:ob_collision, x:264, y:363}],
[{o:ob_collision, x:264, y:330}],
[{o:ob_collision, x:264, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:363, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:297, y:330}],
[{o:ob_collision, x:33, y:396}],
[{o:ob_collision, x:66, y:396}],
[{o:ob_collision, x:99, y:396}],
[{o:ob_collision, x:132, y:396}],
[{o:ob_collision, x:165, y:396}],
[{o:ob_collision, x:165, y:396}],
[{o:ob_collision, x:231, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:297, y:396}],
[{o:ob_collision, x:330, y:396}],
[{o:ob_collision, x:363, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:165, y:396}],
[{o:ob_collision, x:198, y:396}],
[{o:ob_collision, x:396, y:396}],
[{o:ob_collision, x:396, y:363}],
[{o:ob_collision, x:330, y:363}],
[{o:ob_collision, x:297, y:363}],
[{o:ob_collision, x:396, y:330}],
[{o:ob_collision, x:396, y:264}],
[{o:ob_collision, x:396, y:264}],
[{o:ob_collision, x:396, y:231}],
[{o:ob_collision, x:429, y:231}],
[{o:ob_collision, x:462, y:231}],
[{o:ob_collision, x:495, y:231}],
[{o:ob_collision, x:528, y:231}],
[{o:ob_collision, x:528, y:198}],
[{o:ob_collision, x:528, y:198}],
[{o:ob_collision, x:528, y:165}],
[{o:ob_collision, x:528, y:165}],
[{o:ob_collision, x:561, y:132}],
[{o:ob_collision, x:561, y:132}],
[{o:ob_collision, x:561, y:132}],
[{o:ob_collision, x:561, y:99}],
[{o:ob_collision, x:528, y:99}],
[{o:ob_collision, x:528, y:99}],
[{o:ob_collision, x:528, y:66}],
[{o:ob_collision, x:495, y:66}],
[{o:ob_collision, x:429, y:66}],
[{o:ob_collision, x:396, y:66}],
[{o:ob_collision, x:363, y:66}],
[{o:ob_collision, x:363, y:66}],
[{o:ob_collision, x:462, y:66}],
[{o:ob_collision, x:363, y:99}],
[{o:ob_collision, x:396, y:99}],
[{o:ob_collision, x:462, y:99}],
[{o:ob_collision, x:495, y:99}],
[{o:ob_collision, x:462, y:99}],
[{o:ob_collision, x:429, y:99}],
[{o:ob_collision, x:495, y:132}],
[{o:ob_collision, x:495, y:132}],
[{o:ob_collision, x:495, y:165}],
[{o:ob_collision, x:495, y:198}],
[{o:ob_collision, x:495, y:198}],
[{o:ob_collision, x:462, y:198}],
[{o:ob_collision, x:462, y:198}],
[{o:ob_collision, x:429, y:198}],
[{o:ob_collision, x:396, y:198}],
[{o:ob_collision, x:396, y:198}],
[{o:ob_collision, x:396, y:198}],
[{o:ob_collision, x:363, y:231}],
[{o:ob_collision, x:363, y:198}],
[{o:ob_collision, x:363, y:264}],
[{o:ob_collision, x:363, y:297}],
[{o:ob_collision, x:396, y:297}],
[{o:ob_collision, x:594, y:264}],
[{o:ob_collision, x:594, y:231}],
[{o:ob_collision, x:594, y:264}],
[{o:ob_collision, x:594, y:297}],
[{o:ob_collision, x:627, y:297}],
[{o:ob_collision, x:627, y:231}],
[{o:ob_collision, x:627, y:165}],
[{o:ob_collision, x:627, y:99}],
[{o:ob_collision, x:627, y:99}],
[{o:ob_collision, x:627, y:66}],
[{o:ob_collision, x:627, y:66}],
[{o:ob_collision, x:627, y:0}],
[{o:ob_collision, x:627, y:0}],
[{o:ob_collision, x:627, y:33}],
[{o:ob_collision, x:627, y:99}],
[{o:ob_collision, x:627, y:132}],
[{o:ob_collision, x:627, y:198}],
[{o:ob_collision, x:627, y:396}],
[{o:ob_collision, x:594, y:396}],
[{o:ob_collision, x:561, y:396}],
[{o:ob_collision, x:561, y:429}],
[{o:ob_collision, x:561, y:429}],
[{o:ob_collision, x:561, y:462}],
[{o:ob_collision, x:495, y:462}],
[{o:ob_collision, x:495, y:462}],
[{o:ob_collision, x:462, y:462}],
[{o:ob_collision, x:462, y:462}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:462, y:495}],
[{o:ob_collision, x:495, y:495}],
[{o:ob_collision, x:528, y:495}],
[{o:ob_collision, x:561, y:495}],
[{o:ob_collision, x:561, y:495}],
[{o:ob_collision, x:594, y:528}],
[{o:ob_collision, x:594, y:561}],
[{o:ob_collision, x:594, y:594}],
[{o:ob_collision, x:165, y:297}],
[{o:ob_collision, x:132, y:297}],
[{o:ob_collision, x:0, y:198}],
[{o:ob_collision, x:495, y:429}],
[{o:ob_collision, x:0, y:528}],
[{o:ob_collision, x:297, y:33}],
[{o:ob_collision, x:429, y:165}],
[{o:ob_collision1, x:132, y:561}],
[{o:ob_collision1, x:0, y:495}],
[{o:ob_collision1, x:0, y:561}],
[{o:ob_collision1, x:297, y:495}],
[{o:ob_collision1, x:396, y:561}],
[{o:ob_collision, x:594, y:495}],
[{o:ob_leven, x:0, y:0}],
[{o:ob_collision1, x:528, y:330}],
[{o:ob_kanoon_linx, x:132, y:297}],
[{o:ob_kanoon_linx, x:495, y:429}],
[{o:ob_kanoon_linx, x:429, y:165}],
[{o:ob_kanoon_rekt, x:0, y:528}],
[{o:ob_kanoon_rekt, x:297, y:33}],
[{o:ob_kanoon_rekt, x:165, y:297}],
[{o:ob_kanoon_rekt, x:0, y:198}],
[{o:ob_leveleindt, x:198, y:330}],
[{o:ob_hart, x:75, y:10}],
[{o:ob_hart, x:478, y:181}],
[{o:ob_armpie, x:198, y:132}],
[{o:ob_hansch, x:198, y:132}]];
this.start = function() {
__room_start__(this, sc_lv3world2, 660, 660, 30, 0, 0, 0, bg_world2_2.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv3world2 = new __sc_lv3world2();
tu_scenes.push(sc_lv3world2);
function __sc_lv1world3() { 
this.tiles = [
[1000000,
[tlset_metal,
[33,0,33,33,0,165],
[33,0,33,33,33,165],
[33,0,33,33,66,165],
[66,0,33,33,99,165],
[66,33,33,33,99,198],
[66,33,33,33,99,231],
[66,33,33,33,99,264],
[66,165,33,33,99,297],
[33,165,33,33,33,297],
[33,165,33,33,66,297],
[66,99,33,33,0,297],
[66,132,33,33,0,330],
[66,132,33,33,0,363],
[66,165,33,33,0,396],
[33,99,33,33,0,264],
[33,99,33,33,0,231],
[33,99,33,33,0,198],
[33,99,33,33,33,198],
[33,99,33,33,33,198],
[33,99,33,33,66,198],
[33,99,33,33,66,231],
[33,99,33,33,66,264],
[33,99,33,33,33,264],
[33,99,33,33,33,231],
[33,165,33,33,0,66],
[33,165,33,33,33,66],
[33,165,33,33,66,66],
[33,165,33,33,99,66],
[33,165,33,33,132,66],
[33,165,33,33,165,66],
[33,165,33,33,198,66],
[0,33,33,33,231,99],
[0,33,33,33,231,132],
[0,33,33,33,231,165],
[0,33,33,33,231,198],
[0,33,33,33,231,231],
[0,0,33,33,198,264],
[0,165,33,33,198,297],
[0,33,33,33,231,330],
[33,0,33,33,198,363],
[33,0,33,33,165,363],
[33,0,33,33,132,363],
[33,0,33,33,99,363],
[0,0,33,33,66,363],
[0,165,33,33,66,396],
[33,0,33,33,0,462],
[33,0,33,33,33,462],
[33,0,33,33,66,462],
[33,0,33,33,99,462],
[33,0,33,33,132,462],
[33,0,33,33,165,462],
[33,0,33,33,198,462],
[33,0,33,33,231,462],
[33,0,33,33,264,462],
[33,165,33,33,99,396],
[33,165,33,33,132,396],
[33,165,33,33,165,396],
[33,165,33,33,198,396],
[0,66,33,33,231,363],
[33,165,33,33,231,396],
[66,165,33,33,264,396],
[0,99,33,33,231,297],
[0,66,33,33,231,264],
[0,99,33,33,231,66],
[33,0,33,33,297,462],
[33,0,33,33,330,462],
[33,0,33,33,363,462],
[0,165,33,33,330,396],
[33,165,33,33,363,396],
[33,165,33,33,396,396],
[66,0,33,33,462,462],
[33,0,33,33,396,462],
[33,0,33,33,429,462],
[66,165,33,33,429,396],
[66,132,33,33,264,363],
[66,99,33,33,264,330],
[0,99,33,33,330,330],
[0,132,33,33,330,363],
[33,165,33,33,297,330],
[33,0,33,33,561,363],
[0,0,33,33,528,363],
[0,33,33,33,528,396],
[0,33,33,33,528,429],
[0,33,33,33,528,462],
[33,0,33,33,594,363],
[33,0,33,33,627,363],
[33,66,33,33,561,396],
[33,66,33,33,561,429],
[33,66,33,33,561,462],
[33,66,33,33,594,462],
[33,66,33,33,594,429],
[33,66,33,33,594,396],
[33,66,33,33,627,396],
[33,66,33,33,627,429],
[33,66,33,33,627,462],
[66,33,33,33,429,363],
[66,33,33,33,429,330],
[33,165,33,33,462,297],
[33,165,33,33,495,297],
[33,165,33,33,528,297],
[66,165,33,33,561,297],
[66,0,33,33,561,264],
[0,165,33,33,627,297],
[0,0,33,33,627,264],
[33,0,33,33,528,264],
[33,0,33,33,495,264],
[33,0,33,33,462,264],
[33,0,33,33,396,264],
[33,0,33,33,429,264],
[33,0,33,33,363,264],
[33,0,33,33,330,264],
[66,33,33,33,264,231],
[66,33,33,33,264,198],
[0,165,33,33,330,165],
[0,165,33,33,363,198],
[33,0,33,33,297,264],
[33,165,33,33,396,198],
[33,165,33,33,429,198],
[66,165,33,33,462,198],
[0,0,33,33,528,165],
[0,165,33,33,528,198],
[33,165,33,33,561,198],
[33,165,33,33,594,198],
[33,165,33,33,627,198],
[66,33,33,33,462,165],
[66,33,33,33,462,132],
[33,165,33,33,495,99],
[33,165,33,33,528,99],
[33,165,33,33,561,99],
[33,165,33,33,594,99],
[33,165,33,33,627,99],
[33,0,33,33,561,165],
[33,0,33,33,594,165],
[33,0,33,33,627,165],
[0,0,33,33,330,132],
[0,0,33,33,363,99],
[0,0,33,33,396,66],
[66,33,33,33,264,165],
[66,33,33,33,264,132],
[66,33,33,33,264,99],
[66,33,33,33,264,66],
[33,165,33,33,330,0],
[33,165,33,33,396,0],
[33,165,33,33,363,0],
[33,165,33,33,429,0],
[33,165,33,33,462,0],
[33,165,33,33,528,0],
[33,165,33,33,495,0],
[33,165,33,33,561,0],
[33,0,33,33,429,66],
[33,0,33,33,495,66],
[33,0,33,33,462,66],
[33,0,33,33,528,66],
[33,0,33,33,561,66],
[33,0,33,33,594,66],
[0,33,33,33,627,33],
[33,165,33,33,594,0],
[0,66,33,33,363,132],
[0,66,33,33,396,99],
[0,66,33,33,627,66],
[0,99,33,33,627,0],
[66,99,33,33,462,99],
[66,99,33,33,297,0],
[66,99,33,33,429,297],
[0,99,33,33,363,165],
[66,66,33,33,264,264],
[33,66,33,33,429,99],
[33,66,33,33,429,132],
[33,66,33,33,396,132],
[33,66,33,33,396,165],
[33,66,33,33,429,165],
[33,66,33,33,264,0],
[33,66,33,33,198,0],
[33,66,33,33,165,0],
[33,66,33,33,231,0],
[33,66,33,33,0,0],
[33,66,33,33,33,0],
[33,66,33,33,66,0],
[33,66,33,33,99,0],
[33,66,33,33,132,0],
[33,66,33,33,99,33],
[33,66,33,33,66,33],
[33,66,33,33,33,33],
[33,66,33,33,33,33],
[33,66,33,33,0,33],
[33,66,33,33,264,297],
[33,66,33,33,297,297],
[33,66,33,33,363,297],
[33,66,33,33,330,297],
[33,66,33,33,396,297],
[33,66,33,33,396,363],
[33,66,33,33,363,363],
[33,66,33,33,363,330],
[33,66,33,33,396,330],
[33,165,33,33,198,99],
[33,165,33,33,165,99],
[33,165,33,33,132,99],
[33,165,33,33,99,99],
[0,165,33,33,66,99],
[33,66,33,33,66,66],
[33,66,33,33,99,66],
[33,66,33,33,132,66],
[33,66,33,33,165,66],
[33,66,33,33,165,66],
[33,66,33,33,165,66],
[33,66,33,33,198,66],
[66,0,33,33,264,66],
[33,0,33,33,231,66],
[33,0,33,33,198,66],
[33,0,33,33,165,66],
[33,0,33,33,132,66],
[66,66,33,33,99,66],
[66,132,33,33,99,33],
[66,99,33,33,99,0],
[33,165,33,33,165,0],
[33,165,33,33,132,0],
[33,165,33,33,198,0],
[33,165,33,33,231,0],
[33,165,33,33,264,0],
[33,165,33,33,297,0],
[0,99,33,33,66,66]]]];
this.objects = [
[{o:ob_kanoon_linx, x:198, y:330}],
[{o:ob_kanoon_rekt, x:0, y:429}],
[{o:ob_collision, x:0, y:165}],
[{o:ob_collision, x:33, y:165}],
[{o:ob_collision, x:66, y:165}],
[{o:ob_collision, x:99, y:165}],
[{o:ob_collision, x:99, y:198}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:99, y:264}],
[{o:ob_collision, x:99, y:297}],
[{o:ob_collision, x:66, y:297}],
[{o:ob_collision, x:33, y:297}],
[{o:ob_collision, x:0, y:297}],
[{o:ob_collision, x:0, y:330}],
[{o:ob_collision, x:0, y:363}],
[{o:ob_collision, x:0, y:396}],
[{o:ob_collision, x:0, y:429}],
[{o:ob_collision, x:0, y:462}],
[{o:ob_collision, x:33, y:462}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:99, y:462}],
[{o:ob_collision, x:132, y:462}],
[{o:ob_collision, x:165, y:462}],
[{o:ob_collision, x:198, y:462}],
[{o:ob_collision, x:231, y:462}],
[{o:ob_collision, x:264, y:462}],
[{o:ob_collision, x:297, y:462}],
[{o:ob_collision, x:330, y:462}],
[{o:ob_collision, x:363, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:429, y:462}],
[{o:ob_collision, x:462, y:462}],
[{o:ob_collision, x:429, y:396}],
[{o:ob_collision, x:396, y:396}],
[{o:ob_collision, x:363, y:396}],
[{o:ob_collision, x:330, y:396}],
[{o:ob_collision, x:330, y:363}],
[{o:ob_collision, x:264, y:363}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:231, y:396}],
[{o:ob_collision, x:165, y:396}],
[{o:ob_collision, x:198, y:396}],
[{o:ob_collision, x:132, y:396}],
[{o:ob_collision, x:99, y:396}],
[{o:ob_collision, x:66, y:396}],
[{o:ob_collision, x:66, y:363}],
[{o:ob_collision, x:99, y:363}],
[{o:ob_collision, x:99, y:363}],
[{o:ob_collision, x:132, y:363}],
[{o:ob_collision, x:198, y:363}],
[{o:ob_collision, x:165, y:363}],
[{o:ob_collision, x:231, y:363}],
[{o:ob_collision, x:231, y:330}],
[{o:ob_collision, x:231, y:297}],
[{o:ob_collision, x:198, y:330}],
[{o:ob_collision, x:198, y:297}],
[{o:ob_collision, x:198, y:264}],
[{o:ob_collision, x:231, y:264}],
[{o:ob_collision, x:231, y:231}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_collision, x:231, y:99}],
[{o:ob_collision, x:231, y:132}],
[{o:ob_collision, x:0, y:66}],
[{o:ob_collision, x:33, y:66}],
[{o:ob_collision, x:66, y:66}],
[{o:ob_collision, x:99, y:66}],
[{o:ob_collision, x:132, y:66}],
[{o:ob_collision, x:165, y:66}],
[{o:ob_collision, x:198, y:66}],
[{o:ob_collision, x:264, y:330}],
[{o:ob_collision, x:297, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_leven, x:0, y:0}],
[{o:ob_collision, x:429, y:363}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:462, y:297}],
[{o:ob_collision, x:495, y:297}],
[{o:ob_collision, x:528, y:297}],
[{o:ob_collision, x:561, y:297}],
[{o:ob_collision, x:561, y:264}],
[{o:ob_collision, x:528, y:264}],
[{o:ob_collision, x:495, y:264}],
[{o:ob_collision, x:462, y:264}],
[{o:ob_collision, x:429, y:264}],
[{o:ob_collision, x:396, y:264}],
[{o:ob_collision, x:363, y:264}],
[{o:ob_collision, x:330, y:264}],
[{o:ob_collision, x:297, y:264}],
[{o:ob_collision, x:264, y:264}],
[{o:ob_collision, x:264, y:231}],
[{o:ob_collision, x:264, y:99}],
[{o:ob_collision, x:264, y:132}],
[{o:ob_collision, x:264, y:165}],
[{o:ob_collision, x:264, y:198}],
[{o:ob_collision, x:297, y:0}],
[{o:ob_collision, x:330, y:0}],
[{o:ob_collision, x:363, y:0}],
[{o:ob_collision, x:396, y:0}],
[{o:ob_collision, x:429, y:0}],
[{o:ob_collision, x:462, y:0}],
[{o:ob_collision, x:495, y:0}],
[{o:ob_collision, x:528, y:0}],
[{o:ob_collision, x:561, y:0}],
[{o:ob_collision, x:594, y:0}],
[{o:ob_collision, x:627, y:0}],
[{o:ob_collision, x:627, y:33}],
[{o:ob_collision, x:627, y:66}],
[{o:ob_collision, x:594, y:66}],
[{o:ob_collision, x:561, y:66}],
[{o:ob_collision, x:528, y:66}],
[{o:ob_collision, x:495, y:66}],
[{o:ob_collision, x:462, y:66}],
[{o:ob_collision, x:429, y:66}],
[{o:ob_collision, x:396, y:66}],
[{o:ob_collision, x:396, y:99}],
[{o:ob_collision, x:363, y:99}],
[{o:ob_collision, x:363, y:132}],
[{o:ob_collision, x:330, y:132}],
[{o:ob_collision, x:330, y:165}],
[{o:ob_collision, x:363, y:165}],
[{o:ob_collision, x:363, y:198}],
[{o:ob_collision, x:396, y:198}],
[{o:ob_collision, x:429, y:198}],
[{o:ob_collision, x:462, y:198}],
[{o:ob_collision, x:462, y:165}],
[{o:ob_collision, x:462, y:132}],
[{o:ob_collision, x:462, y:99}],
[{o:ob_collision, x:495, y:99}],
[{o:ob_collision, x:528, y:99}],
[{o:ob_collision, x:561, y:99}],
[{o:ob_collision, x:594, y:99}],
[{o:ob_collision, x:627, y:99}],
[{o:ob_collision, x:627, y:165}],
[{o:ob_collision, x:594, y:165}],
[{o:ob_collision, x:561, y:165}],
[{o:ob_collision, x:528, y:165}],
[{o:ob_collision, x:528, y:198}],
[{o:ob_collision, x:561, y:198}],
[{o:ob_collision, x:594, y:198}],
[{o:ob_collision, x:627, y:198}],
[{o:ob_collision, x:627, y:264}],
[{o:ob_collision, x:627, y:297}],
[{o:ob_collision, x:528, y:363}],
[{o:ob_collision, x:561, y:363}],
[{o:ob_collision, x:594, y:363}],
[{o:ob_collision, x:627, y:363}],
[{o:ob_collision, x:528, y:396}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:627, y:330}],
[{o:ob_collision, x:627, y:231}],
[{o:ob_collision, x:297, y:231}],
[{o:ob_collision, x:627, y:132}],
[{o:ob_collision, x:594, y:33}],
[{o:ob_kanoon_linx, x:627, y:330}],
[{o:ob_kanoon_linx, x:627, y:231}],
[{o:ob_kanoon_linx, x:627, y:132}],
[{o:ob_kanoon_linx, x:594, y:33}],
[{o:ob_kanoon_rekt, x:297, y:231}],
[{o:ob_leveleindt, x:561, y:33}],
[{o:ob_collision, x:231, y:66}],
[{o:ob_collision, x:264, y:66}],
[{o:ob_collision, x:198, y:99}],
[{o:ob_collision, x:165, y:99}],
[{o:ob_collision, x:132, y:99}],
[{o:ob_collision, x:99, y:99}],
[{o:ob_collision, x:66, y:99}],
[{o:ob_collision, x:99, y:33}],
[{o:ob_collision, x:99, y:0}],
[{o:ob_collision, x:132, y:0}],
[{o:ob_collision, x:165, y:0}],
[{o:ob_collision, x:198, y:0}],
[{o:ob_collision, x:231, y:0}],
[{o:ob_collision, x:264, y:0}],
[{o:ob_hart, x:146, y:50}],
[{o:ob_armpie, x:33, y:132}],
[{o:ob_hansch, x:33, y:132}],
[{o:ob_music4, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_lv1world3, 660, 495, 30, 0, 128, 255, bg_world3_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv1world3 = new __sc_lv1world3();
tu_scenes.push(sc_lv1world3);
function __sc_lv2world3() { 
this.tiles = [
[1000000,
[tlset_metal,
[33,0,33,33,0,165],
[33,0,33,33,33,165],
[33,0,33,33,66,165],
[33,0,33,33,99,165],
[33,0,33,33,132,165],
[33,0,33,33,165,165],
[0,66,33,33,198,165],
[0,0,33,33,198,132],
[66,0,33,33,231,132],
[66,66,33,33,231,165],
[66,33,33,33,231,165],
[66,165,33,33,231,198],
[33,165,33,33,198,198],
[33,165,33,33,165,198],
[33,165,33,33,132,198],
[66,99,33,33,99,198],
[66,132,33,33,99,231],
[66,66,33,33,99,264],
[33,0,33,33,132,264],
[66,0,33,33,165,264],
[66,165,33,33,165,297],
[33,165,33,33,132,297],
[33,165,33,33,99,297],
[33,165,33,33,66,297],
[33,165,33,33,33,297],
[0,165,33,33,33,297],
[0,0,33,33,33,264],
[0,66,33,33,66,264],
[0,33,33,33,66,231],
[0,99,33,33,66,198],
[33,165,33,33,33,198],
[33,165,33,33,0,198],
[33,165,33,33,33,0],
[66,99,33,33,0,0],
[66,33,33,33,0,33],
[66,33,33,33,0,66],
[66,165,33,33,0,66],
[33,165,33,33,66,0],
[33,165,33,33,99,0],
[33,165,33,33,132,0],
[33,165,33,33,165,0],
[33,165,33,33,198,0],
[66,165,33,33,231,0],
[0,0,33,33,330,33],
[0,165,33,33,330,66],
[33,165,33,33,363,66],
[66,0,33,33,363,33],
[66,165,33,33,363,66],
[33,0,33,33,462,132],
[0,0,33,33,363,132],
[33,0,33,33,429,132],
[33,0,33,33,396,132],
[0,33,33,33,363,165],
[0,165,33,33,363,198],
[66,165,33,33,396,198],
[66,99,33,33,396,165],
[33,165,33,33,429,165],
[33,165,33,33,462,165],
[66,165,33,33,495,165],
[66,0,33,33,495,132],
[33,0,33,33,627,33],
[33,0,33,33,594,33],
[33,0,33,33,561,33],
[0,0,33,33,561,33],
[0,165,33,33,561,66],
[33,165,33,33,594,66],
[33,165,33,33,627,66],
[33,0,33,33,264,297],
[33,0,33,33,297,297],
[33,0,33,33,330,297],
[33,0,33,33,363,297],
[66,0,33,33,396,297],
[66,165,33,33,396,330],
[33,165,33,33,363,330],
[33,165,33,33,330,330],
[33,165,33,33,297,330],
[33,165,33,33,264,330],
[0,165,33,33,231,330],
[0,0,33,33,231,297],
[33,0,33,33,0,396],
[66,0,33,33,33,396],
[0,99,33,33,264,330],
[0,33,33,33,264,363],
[0,66,33,33,264,396],
[0,0,33,33,231,396],
[0,165,33,33,231,429],
[33,165,33,33,264,429],
[66,165,33,33,297,429],
[66,99,33,33,297,396],
[66,165,33,33,330,396],
[66,165,33,33,330,429],
[66,132,33,33,330,396],
[33,165,33,33,297,429],
[33,99,33,33,297,396],
[66,0,33,33,330,396],
[66,66,33,33,297,396],
[66,132,33,33,297,363],
[66,99,33,33,297,330],
[66,66,33,33,33,429],
[66,0,33,33,66,429],
[66,132,33,33,66,462],
[33,66,33,33,0,429],
[33,66,33,33,0,462],
[33,66,33,33,33,462],
[33,0,33,33,231,396],
[33,165,33,33,231,429],
[0,165,33,33,198,429],
[0,0,33,33,198,396],
[66,33,33,33,330,429],
[66,66,33,33,330,462],
[0,99,33,33,297,429],
[0,132,33,33,297,462],
[33,0,33,33,363,462],
[33,0,33,33,396,462],
[33,0,33,33,429,462],
[0,66,33,33,462,462],
[0,33,33,33,462,429],
[0,0,33,33,462,429],
[33,0,33,33,495,429],
[33,0,33,33,528,429],
[33,0,33,33,561,429],
[33,0,33,33,594,429],
[33,0,33,33,627,429],
[33,99,33,33,495,462],
[33,99,33,33,528,462],
[33,99,33,33,561,462],
[33,99,33,33,594,462],
[33,99,33,33,627,462],
[0,0,33,33,462,264],
[0,165,33,33,462,297],
[33,165,33,33,495,297],
[33,165,33,33,528,297],
[66,165,33,33,561,297],
[66,0,33,33,561,264],
[33,0,33,33,528,264],
[33,0,33,33,495,264],
[33,0,33,33,396,297],
[33,0,33,33,429,297],
[0,66,33,33,462,297],
[33,165,33,33,396,330],
[33,165,33,33,429,330],
[66,165,33,33,462,330],
[66,165,33,33,495,330],
[33,165,33,33,462,330],
[66,99,33,33,495,297]]]];
this.objects = [
[{o:ob_leven, x:0, y:0}],
[{o:ob_bermhart, x:159, y:124}],
[{o:ob_collision, x:0, y:165}],
[{o:ob_collision, x:33, y:165}],
[{o:ob_collision, x:66, y:165}],
[{o:ob_collision, x:66, y:165}],
[{o:ob_collision, x:99, y:165}],
[{o:ob_collision, x:132, y:165}],
[{o:ob_collision, x:165, y:165}],
[{o:ob_collision, x:198, y:165}],
[{o:ob_collision, x:198, y:132}],
[{o:ob_collision, x:231, y:132}],
[{o:ob_collision, x:231, y:165}],
[{o:ob_kanoon_linx, x:495, y:99}],
[{o:ob_kanoon_linx, x:561, y:0}],
[{o:ob_kanoon_rekt, x:132, y:231}],
[{o:ob_hart, x:49, y:247}],
[{o:ob_collision, x:0, y:198}],
[{o:ob_collision, x:33, y:198}],
[{o:ob_collision, x:66, y:198}],
[{o:ob_collision, x:99, y:198}],
[{o:ob_collision, x:132, y:198}],
[{o:ob_collision, x:165, y:198}],
[{o:ob_collision, x:198, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:99, y:231}],
[{o:ob_collision, x:99, y:264}],
[{o:ob_collision, x:66, y:231}],
[{o:ob_collision, x:66, y:264}],
[{o:ob_collision, x:33, y:264}],
[{o:ob_collision, x:33, y:297}],
[{o:ob_collision, x:66, y:297}],
[{o:ob_collision, x:99, y:297}],
[{o:ob_collision, x:132, y:297}],
[{o:ob_collision, x:165, y:297}],
[{o:ob_collision, x:165, y:264}],
[{o:ob_collision, x:132, y:264}],
[{o:ob_collision, x:330, y:66}],
[{o:ob_collision, x:330, y:33}],
[{o:ob_collision, x:363, y:33}],
[{o:ob_collision, x:363, y:66}],
[{o:ob_collision, x:231, y:0}],
[{o:ob_collision, x:165, y:0}],
[{o:ob_collision, x:198, y:0}],
[{o:ob_collision, x:132, y:0}],
[{o:ob_collision, x:99, y:0}],
[{o:ob_collision, x:66, y:0}],
[{o:ob_collision, x:33, y:0}],
[{o:ob_collision, x:0, y:33}],
[{o:ob_collision, x:0, y:66}],
[{o:ob_collision, x:363, y:132}],
[{o:ob_collision, x:396, y:132}],
[{o:ob_collision, x:429, y:132}],
[{o:ob_collision, x:462, y:132}],
[{o:ob_collision, x:495, y:132}],
[{o:ob_collision, x:495, y:99}],
[{o:ob_collision, x:495, y:165}],
[{o:ob_collision, x:462, y:165}],
[{o:ob_collision, x:429, y:165}],
[{o:ob_collision, x:396, y:165}],
[{o:ob_collision, x:396, y:198}],
[{o:ob_collision, x:363, y:198}],
[{o:ob_collision, x:363, y:165}],
[{o:ob_collision, x:561, y:0}],
[{o:ob_collision, x:132, y:231}],
[{o:ob_collision2, x:198, y:264}],
[{o:ob_collision, x:231, y:297}],
[{o:ob_collision, x:264, y:297}],
[{o:ob_collision, x:297, y:297}],
[{o:ob_collision, x:330, y:297}],
[{o:ob_collision, x:363, y:297}],
[{o:ob_collision, x:363, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:297, y:330}],
[{o:ob_collision, x:264, y:330}],
[{o:ob_collision, x:231, y:330}],
[{o:ob_kanoon_linx, x:231, y:363}],
[{o:ob_kanoon_rekt, x:330, y:363}],
[{o:ob_collision, x:0, y:396}],
[{o:ob_collision, x:33, y:396}],
[{o:ob_collision, x:33, y:429}],
[{o:ob_collision, x:0, y:429}],
[{o:ob_collision, x:66, y:429}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:66, y:462}],
[{o:ob_collision, x:33, y:462}],
[{o:ob_collision, x:0, y:462}],
[{o:ob_collision, x:198, y:429}],
[{o:ob_collision, x:198, y:396}],
[{o:ob_collision, x:231, y:396}],
[{o:ob_collision, x:231, y:363}],
[{o:ob_collision, x:264, y:363}],
[{o:ob_collision, x:297, y:363}],
[{o:ob_collision, x:330, y:363}],
[{o:ob_collision, x:330, y:396}],
[{o:ob_collision, x:297, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:330, y:429}],
[{o:ob_collision, x:297, y:429}],
[{o:ob_collision, x:231, y:429}],
[{o:ob_collision, x:231, y:429}],
[{o:ob_collision, x:264, y:429}],
[{o:ob_bermhart, x:461, y:91}],
[{o:ob_bermhart, x:372, y:256}],
[{o:ob_bermhart, x:266, y:256}],
[{o:ob_collision2, x:0, y:132}],
[{o:ob_leveleindt, x:396, y:429}],
[{o:ob_kanoon_linx, x:594, y:396}],
[{o:ob_collision, x:594, y:396}],
[{o:ob_collision, x:627, y:429}],
[{o:ob_collision, x:594, y:429}],
[{o:ob_collision, x:561, y:429}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:495, y:429}],
[{o:ob_collision, x:462, y:429}],
[{o:ob_collision, x:462, y:462}],
[{o:ob_collision, x:429, y:462}],
[{o:ob_collision, x:396, y:462}],
[{o:ob_collision, x:363, y:462}],
[{o:ob_collision, x:330, y:462}],
[{o:ob_collision, x:297, y:462}],
[{o:ob_collision, x:462, y:264}],
[{o:ob_collision, x:495, y:264}],
[{o:ob_collision, x:528, y:264}],
[{o:ob_collision, x:561, y:264}],
[{o:ob_collision, x:561, y:297}],
[{o:ob_collision, x:528, y:297}],
[{o:ob_collision, x:495, y:297}],
[{o:ob_collision, x:462, y:297}],
[{o:ob_collision, x:561, y:33}],
[{o:ob_collision, x:594, y:33}],
[{o:ob_collision, x:627, y:33}],
[{o:ob_collision, x:627, y:66}],
[{o:ob_collision, x:594, y:66}],
[{o:ob_collision, x:594, y:66}],
[{o:ob_collision, x:561, y:66}],
[{o:ob_collision, x:429, y:297}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:462, y:330}],
[{o:ob_collision, x:495, y:330}],
[{o:ob_collision2, x:396, y:297}],
[{o:ob_collision2, x:396, y:330}],
[{o:ob_collision, x:396, y:297}],
[{o:ob_collision, x:396, y:330}],
[{o:ob_kanoon_linx, x:429, y:264}],
[{o:ob_collision, x:429, y:264}],
[{o:ob_kanoon_rekt, x:462, y:231}],
[{o:ob_collision, x:462, y:231}],
[{o:ob_armpie, x:33, y:132}],
[{o:ob_hansch, x:33, y:132}],
[{o:ob_collision, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_lv2world3, 660, 495, 30, 0, 128, 255, bg_world3_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv2world3 = new __sc_lv2world3();
tu_scenes.push(sc_lv2world3);
function __sc_lv3world3() { 
this.tiles = [
[1000000,
[tlset_metal,
[33,0,33,33,132,429],
[33,0,33,33,165,429],
[33,0,33,33,198,429],
[33,0,33,33,231,429],
[0,66,33,33,264,429],
[0,0,33,33,264,396],
[0,0,33,33,297,363],
[0,0,33,33,330,330],
[0,66,33,33,297,396],
[0,66,33,33,330,363],
[66,0,33,33,429,330],
[33,0,33,33,363,330],
[33,0,33,33,396,330],
[66,33,33,33,429,363],
[66,33,33,33,429,396],
[66,33,33,33,429,429],
[66,33,33,33,429,462],
[33,33,33,33,396,363],
[33,33,33,33,363,363],
[33,33,33,33,396,396],
[33,33,33,33,363,396],
[33,33,33,33,330,396],
[33,33,33,33,396,429],
[33,33,33,33,363,429],
[33,33,33,33,330,429],
[33,33,33,33,297,429],
[33,33,33,33,297,429],
[33,33,33,33,396,462],
[33,33,33,33,363,462],
[33,33,33,33,330,462],
[33,33,33,33,297,462],
[33,33,33,33,264,462],
[33,33,33,33,231,462],
[33,33,33,33,198,462],
[33,33,33,33,198,462],
[33,33,33,33,165,462],
[33,33,33,33,165,462],
[33,33,33,33,132,462],
[33,33,33,33,330,396],
[33,33,33,33,363,396],
[0,33,33,33,528,462],
[0,33,33,33,528,429],
[0,33,33,33,528,396],
[0,33,33,33,528,363],
[0,0,33,33,528,330],
[33,0,33,33,561,330],
[33,0,33,33,594,330],
[66,0,33,33,627,330],
[66,0,33,33,660,363],
[66,0,33,33,693,396],
[66,66,33,33,627,363],
[66,66,33,33,660,396],
[66,66,33,33,693,429],
[33,33,33,33,561,363],
[33,33,33,33,594,363],
[33,33,33,33,594,396],
[33,33,33,33,561,396],
[33,33,33,33,627,396],
[33,33,33,33,627,429],
[33,33,33,33,594,429],
[33,33,33,33,561,429],
[33,33,33,33,561,429],
[33,33,33,33,561,462],
[33,33,33,33,627,462],
[33,33,33,33,627,462],
[33,33,33,33,627,462],
[33,33,33,33,594,462],
[33,33,33,33,660,462],
[33,33,33,33,660,429],
[33,33,33,33,693,462],
[33,0,33,33,726,429],
[33,0,33,33,759,429],
[33,0,33,33,792,429],
[33,66,33,33,726,462],
[33,66,33,33,759,462],
[33,66,33,33,792,462],
[66,132,33,33,33,363],
[66,132,33,33,33,330],
[66,132,33,33,33,297],
[66,132,33,33,33,264],
[66,132,33,33,33,231],
[66,132,33,33,33,198],
[66,132,33,33,33,165],
[66,132,33,33,33,132],
[66,132,33,33,33,99],
[66,132,33,33,33,66],
[66,99,33,33,33,33],
[33,165,33,33,66,33],
[33,165,33,33,99,33],
[33,165,33,33,132,33],
[33,165,33,33,198,33],
[33,165,33,33,165,33],
[33,165,33,33,231,33],
[33,165,33,33,264,33],
[33,165,33,33,297,33],
[33,165,33,33,660,33],
[33,165,33,33,693,33],
[33,165,33,33,726,33],
[33,165,33,33,759,33],
[33,165,33,33,792,33],
[33,165,33,33,825,33],
[33,165,33,33,858,33],
[33,165,33,33,891,33],
[0,99,33,33,891,33],
[33,165,33,33,891,33],
[0,99,33,33,924,33],
[0,33,33,33,924,66],
[0,33,33,33,924,99],
[0,33,33,33,924,99],
[0,33,33,33,924,132],
[0,33,33,33,924,165],
[0,33,33,33,924,198],
[0,33,33,33,924,264],
[0,33,33,33,924,231],
[0,33,33,33,924,297],
[0,33,33,33,924,330],
[0,33,33,33,924,363],
[0,33,33,33,924,396],
[0,66,33,33,924,429],
[33,0,33,33,891,429],
[33,0,33,33,858,429],
[33,0,33,33,825,429],
[33,66,33,33,825,462],
[33,66,33,33,858,462],
[33,66,33,33,891,462],
[33,66,33,33,957,462],
[33,66,33,33,957,462],
[33,66,33,33,924,462],
[33,66,33,33,957,396],
[33,66,33,33,957,396],
[33,66,33,33,957,363],
[33,66,33,33,957,363],
[33,66,33,33,957,330],
[33,66,33,33,957,330],
[33,66,33,33,957,297],
[33,66,33,33,957,264],
[33,66,33,33,957,264],
[33,66,33,33,957,231],
[33,66,33,33,957,231],
[33,66,33,33,957,198],
[33,66,33,33,957,198],
[33,66,33,33,957,165],
[33,66,33,33,957,99],
[33,66,33,33,957,99],
[33,66,33,33,957,99],
[33,66,33,33,957,132],
[33,66,33,33,957,99],
[33,66,33,33,957,66],
[33,66,33,33,957,0],
[33,66,33,33,957,33],
[33,66,33,33,924,0],
[33,66,33,33,891,0],
[33,66,33,33,825,0],
[33,66,33,33,825,0],
[33,66,33,33,825,0],
[33,66,33,33,858,0],
[33,66,33,33,792,0],
[33,66,33,33,726,0],
[33,66,33,33,759,0],
[33,66,33,33,726,0],
[33,66,33,33,693,0],
[33,66,33,33,660,0],
[33,66,33,33,627,0],
[33,66,33,33,561,0],
[33,66,33,33,561,0],
[33,66,33,33,561,0],
[33,66,33,33,528,0],
[33,66,33,33,495,0],
[33,66,33,33,462,0],
[33,66,33,33,429,0],
[33,66,33,33,396,0],
[33,66,33,33,363,0],
[33,66,33,33,363,0],
[33,66,33,33,330,0],
[33,66,33,33,297,0],
[33,66,33,33,297,0],
[33,66,33,33,264,0],
[33,66,33,33,231,0],
[33,66,33,33,198,0],
[33,66,33,33,132,0],
[33,66,33,33,132,0],
[33,66,33,33,99,0],
[33,66,33,33,165,0],
[33,66,33,33,66,0],
[33,66,33,33,33,0],
[33,66,33,33,0,0],
[33,66,33,33,0,33],
[33,66,33,33,0,66],
[33,66,33,33,0,99],
[33,66,33,33,0,132],
[33,66,33,33,0,165],
[33,66,33,33,0,198],
[33,66,33,33,0,198],
[33,66,33,33,0,231],
[33,66,33,33,0,264],
[33,66,33,33,0,297],
[33,66,33,33,0,363],
[33,66,33,33,0,363],
[33,66,33,33,0,429],
[33,66,33,33,0,462],
[33,66,33,33,0,429],
[33,66,33,33,0,396],
[33,66,33,33,0,330],
[33,66,33,33,33,396],
[33,66,33,33,33,429],
[33,66,33,33,33,462],
[33,66,33,33,66,462],
[33,66,33,33,99,462],
[33,0,33,33,99,429],
[33,0,33,33,66,429],
[66,66,33,33,33,429],
[66,33,33,33,33,396],
[66,165,33,33,297,33],
[66,99,33,33,297,0],
[33,165,33,33,330,0],
[33,165,33,33,363,0],
[33,165,33,33,396,0],
[33,165,33,33,429,0],
[33,165,33,33,462,0],
[33,165,33,33,495,0],
[33,165,33,33,528,0],
[33,165,33,33,561,0],
[33,165,33,33,594,0],
[0,99,33,33,660,0],
[0,165,33,33,660,33],
[33,165,33,33,627,0],
[66,165,33,33,99,330],
[33,165,33,33,66,330],
[66,0,33,33,99,297],
[33,0,33,33,66,297],
[33,0,33,33,66,132],
[66,0,33,33,99,132],
[66,165,33,33,99,165],
[33,165,33,33,66,165],
[33,165,33,33,891,330],
[0,165,33,33,858,330],
[0,0,33,33,858,297],
[33,0,33,33,891,297],
[33,0,33,33,891,132],
[0,0,33,33,858,132],
[0,165,33,33,858,165],
[33,165,33,33,891,165],
[0,0,33,33,231,198],
[66,0,33,33,264,198],
[66,165,33,33,264,231],
[0,165,33,33,231,231],
[0,165,33,33,693,231],
[66,0,33,33,726,198],
[0,0,33,33,693,198],
[66,165,33,33,726,231]]]];
this.objects = [
[{o:ob_leven, x:0, y:0}],
[{o:ob_kanoon_rekt, x:66, y:264}],
[{o:ob_kanoon_rekt, x:66, y:99}],
[{o:ob_kanoon_linx, x:891, y:264}],
[{o:ob_kanoon_linx, x:891, y:99}],
[{o:ob_armpie, x:99, y:396}],
[{o:ob_hansch, x:99, y:396}],
[{o:ob_collision, x:66, y:330}],
[{o:ob_collision, x:99, y:330}],
[{o:ob_collision, x:99, y:297}],
[{o:ob_collision, x:66, y:297}],
[{o:ob_collision, x:33, y:264}],
[{o:ob_collision, x:33, y:297}],
[{o:ob_collision, x:33, y:231}],
[{o:ob_collision, x:33, y:198}],
[{o:ob_collision, x:33, y:198}],
[{o:ob_collision, x:33, y:165}],
[{o:ob_collision, x:66, y:165}],
[{o:ob_collision, x:99, y:165}],
[{o:ob_collision, x:99, y:132}],
[{o:ob_collision, x:66, y:132}],
[{o:ob_collision, x:33, y:132}],
[{o:ob_collision, x:33, y:99}],
[{o:ob_collision, x:0, y:66}],
[{o:ob_collision, x:33, y:66}],
[{o:ob_collision, x:33, y:33}],
[{o:ob_collision, x:66, y:33}],
[{o:ob_collision, x:99, y:33}],
[{o:ob_collision, x:132, y:33}],
[{o:ob_collision, x:165, y:33}],
[{o:ob_collision, x:231, y:33}],
[{o:ob_collision, x:264, y:33}],
[{o:ob_collision, x:198, y:33}],
[{o:ob_collision, x:297, y:33}],
[{o:ob_collision, x:297, y:0}],
[{o:ob_collision, x:330, y:0}],
[{o:ob_collision, x:396, y:0}],
[{o:ob_collision, x:429, y:0}],
[{o:ob_collision, x:363, y:0}],
[{o:ob_collision, x:33, y:330}],
[{o:ob_collision, x:33, y:363}],
[{o:ob_collision, x:33, y:396}],
[{o:ob_collision, x:33, y:429}],
[{o:ob_collision, x:66, y:429}],
[{o:ob_collision, x:99, y:429}],
[{o:ob_collision, x:132, y:429}],
[{o:ob_collision, x:165, y:429}],
[{o:ob_collision, x:198, y:429}],
[{o:ob_collision, x:198, y:429}],
[{o:ob_collision, x:231, y:429}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:264, y:396}],
[{o:ob_collision, x:297, y:396}],
[{o:ob_collision, x:264, y:429}],
[{o:ob_collision, x:297, y:363}],
[{o:ob_collision, x:330, y:363}],
[{o:ob_collision, x:330, y:330}],
[{o:ob_collision, x:396, y:330}],
[{o:ob_collision, x:363, y:330}],
[{o:ob_collision, x:429, y:330}],
[{o:ob_collision, x:429, y:363}],
[{o:ob_collision, x:429, y:396}],
[{o:ob_collision, x:429, y:429}],
[{o:ob_collision, x:429, y:462}],
[{o:ob_collision, x:528, y:462}],
[{o:ob_collision, x:528, y:429}],
[{o:ob_collision, x:528, y:396}],
[{o:ob_collision, x:528, y:363}],
[{o:ob_collision, x:528, y:363}],
[{o:ob_collision, x:561, y:330}],
[{o:ob_collision, x:528, y:330}],
[{o:ob_collision, x:594, y:330}],
[{o:ob_collision, x:627, y:330}],
[{o:ob_collision, x:627, y:363}],
[{o:ob_collision, x:660, y:363}],
[{o:ob_collision, x:660, y:396}],
[{o:ob_collision, x:693, y:396}],
[{o:ob_collision, x:693, y:429}],
[{o:ob_collision, x:759, y:429}],
[{o:ob_collision, x:792, y:429}],
[{o:ob_collision, x:726, y:429}],
[{o:ob_collision, x:858, y:429}],
[{o:ob_collision, x:858, y:429}],
[{o:ob_collision, x:858, y:429}],
[{o:ob_collision, x:891, y:429}],
[{o:ob_collision, x:825, y:429}],
[{o:ob_collision, x:924, y:429}],
[{o:ob_collision, x:924, y:396}],
[{o:ob_collision, x:924, y:363}],
[{o:ob_collision, x:924, y:330}],
[{o:ob_collision, x:924, y:297}],
[{o:ob_collision, x:924, y:264}],
[{o:ob_collision, x:924, y:264}],
[{o:ob_collision, x:924, y:231}],
[{o:ob_collision, x:924, y:198}],
[{o:ob_collision, x:924, y:165}],
[{o:ob_collision, x:924, y:132}],
[{o:ob_collision, x:924, y:99}],
[{o:ob_collision, x:924, y:66}],
[{o:ob_collision, x:924, y:33}],
[{o:ob_collision, x:891, y:33}],
[{o:ob_collision, x:825, y:33}],
[{o:ob_collision, x:792, y:33}],
[{o:ob_collision, x:858, y:33}],
[{o:ob_collision, x:891, y:132}],
[{o:ob_collision, x:891, y:132}],
[{o:ob_collision, x:858, y:132}],
[{o:ob_collision, x:858, y:165}],
[{o:ob_collision, x:891, y:165}],
[{o:ob_collision, x:891, y:297}],
[{o:ob_collision, x:858, y:297}],
[{o:ob_collision, x:858, y:330}],
[{o:ob_collision, x:891, y:330}],
[{o:ob_collision, x:891, y:264}],
[{o:ob_collision, x:891, y:99}],
[{o:ob_collision, x:759, y:33}],
[{o:ob_collision, x:726, y:33}],
[{o:ob_collision, x:693, y:33}],
[{o:ob_collision, x:660, y:33}],
[{o:ob_collision, x:660, y:0}],
[{o:ob_collision, x:627, y:0}],
[{o:ob_collision, x:561, y:0}],
[{o:ob_collision, x:528, y:0}],
[{o:ob_collision, x:594, y:0}],
[{o:ob_collision, x:495, y:0}],
[{o:ob_collision, x:462, y:0}],
[{o:ob_collision, x:66, y:264}],
[{o:ob_collision, x:66, y:99}],
[{o:ob_collision, x:693, y:198}],
[{o:ob_collision, x:726, y:198}],
[{o:ob_collision, x:726, y:231}],
[{o:ob_collision, x:693, y:231}],
[{o:ob_collision, x:264, y:231}],
[{o:ob_collision, x:264, y:198}],
[{o:ob_collision, x:231, y:198}],
[{o:ob_collision, x:231, y:231}],
[{o:ob_mund, x:363, y:165}],
[{o:ob_music5, x:0, y:0}]];
this.start = function() {
__room_start__(this, sc_lv3world3, 990, 495, 30, 0, 128, 255, bg_world3_1.image, 0, 0, 0, 660, 495, ob_hansch, 350, 350);
};
}
var sc_lv3world3 = new __sc_lv3world3();
tu_scenes.push(sc_lv3world3);
function __scene_5363() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, scene_5363, 660, 495, 30, 0, 0, 0, bg_menuutje2.image, 0, 0, 0, 660, 495, null, 50, 50);
};
}
var scene_5363 = new __scene_5363();
tu_scenes.push(scene_5363);
tu_room_to_go = sc_kopmenu;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
hp = 3;
hansch = 0;

/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/



tu_gameloop = tu_loop;
tu_loop();
