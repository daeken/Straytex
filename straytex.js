function niceCanvas(canvas) {
	this.ctx = canvas.getContext('2d');
	width = this.width = parseInt(canvas.getAttribute('width'));
	height = this.height = parseInt(canvas.getAttribute('height'));
	this.hwidth = this.width / 2;
	this.hheight = this.height / 2;
	this.data = this.ctx.createImageData(this.width, this.height);
	
	this.swap = function(data) {
		for(var y = 0, doff = 0, ioff = 0; y < this.width; ++y)
			for(var x = 0; x < this.width; ++x, doff += 4, ioff += 3) {
				this.data.data[doff+0] = data[ioff+0];
				this.data.data[doff+1] = data[ioff+1];
				this.data.data[doff+2] = data[ioff+2];
				this.data.data[doff+3] = 255;
			}
		this.ctx.putImageData(this.data, 0, 0);
		this.clear();
	}
	
	this.clear = function() {
		for(var i = 0; i < this.width * this.height * 4; i += 4) {
			this.data.data[i] = 0;
			this.data.data[i+1] = 0;
			this.data.data[i+2] = 0;
			this.data.data[i+3] = 255;
		}
	}
	
	this.clear();
}

var canvas = null;
var width = 256;
var height = 256;
function sizeChanged() {
	var canvasElem = document.getElementById('tex');
	var size = parseInt(document.getElementById('size').value);
	canvasElem.width = size;
	canvasElem.height = size;
	canvas = new niceCanvas(canvasElem);
	draw();
}

function newSeed() {
	document.getElementById('seed').value = Math.floor(Math.random() * Math.pow(2, 32));
}

function keyhandler(e) {
	if(e.keyCode == 9) {
		var start = this.selectionStart;
		var end = this.selectionEnd;
		this.value = this.value.substring(0, start) + "\t" + this.value.substring(end, this.value.length);
		this.selectionStart = start+1;
		this.selectionEnd = end+1;
		if(e.preventDefault)
			e.preventDefault();
		return false;
	}
}

function ready() {
	var area = document.getElementById('source');
	area.addEventListener('keydown', keyhandler, false);
	document.getElementById('source').value = tags['brushed aluminum'];
}

var worker = new Worker('texworker.js');
function draw() {
	var status = document.getElementById('status');
	status.innerHTML = 'Redrawing';
	if(canvas == null)
		canvas = new niceCanvas(document.getElementById('tex'));
	var source = document.getElementById('source').value;
	var seed = parseInt(document.getElementById('seed').value);
	worker.postMessage([source, width, height, seed].toJSONString());
	worker.onmessage = function(e) {
		canvas.swap(eval('['+e.data+']'));
		status.innerHTML = '<br />';
	}
}

var tags = {};
tags['brushed aluminum'] = 
'// Simple brushed aluminum texture\n\
var length = width >> 3;\n\
var lengthbase = log2(length);\n\
var noise = noisebw(width, height, length);\n\
for(var y = 0, noff = 0, off = 0; y < height; ++y)\n\
	for(var x = 0; x < width; ++x, ++noff, off += 3) {\n\
		var val = 0;\n\
		for(var i = 0; i < length; ++i)\n\
				val += noise[noff + i];\n\
		val >>= lengthbase;\n\
		texture[off] = val;\n\
		texture[off+1] = val;\n\
		texture[off+2] = (val + (val >> 4)) & 0xFF;\n\
	}\n\
';
var curTag = -1;
function tag() {
	var name = prompt('Tag name?', '');
	if(name == null)
		return;
	
	tags[name] = document.getElementById('source').value;
	var tagsSelect = document.getElementById('tags');
	var elem = document.createElement('option');
	elem.text = name;
	elem.value = name;
	tagsSelect.add(elem, null);
	tagsSelect.selectedIndex = tagsSelect.options.length-1;
	curTag = tagsSelect.options.length-1;
}

function tagChanged() {
	var name = document.getElementById('tags').value;
	document.getElementById('source').value = tags[name];
}

function revert() {
	tagChanged();
}