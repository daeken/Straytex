var A = 48271;
var M = 2147483647;
var Q = M / A;
var R = M % A;
var oneOverM = 1.0 / M;
var seed = 0;

var width = 256;
var height = 256;
var texture = new Array(256*256*3);

Math.random = function(seed_) {
	if(seed_ != null)
		seed = seed_;
  var hi = seed / Q;
  var lo = seed % Q;
  var test = A * lo - R * hi;
  if(test > 0){
    seed = test;
  } else {
    seed = test + M;
  }
  return seed * oneOverM;
}

onmessage = function(evt) {
	var data = eval(evt.data);
	var source = data[0];
	var nwidth = data[1];
	var nheight = data[2];
	seed = data[3];
	if(nwidth != width || nheight != height) {
		texture = new Array(nwidth * nheight * 3);
		width = nwidth;
		height = nheight;
	}
	
	eval(source);
	
	postMessage(texture);
}

function noisebw(width, height, add) {
	add = (add == null) ? 0 : add;
	var noise = new Array(width * height + add);
	for(var i = 0; i < width*height+add; ++i)
		noise[i] = Math.floor(Math.random()*256);
	return noise;
}

function noisecolor(width, height, add) {
	add = (add == null) ? 0 : add;
	var noise = new Array(width * height * 3 + add);
	for(var i = 0; i < width*height*3+add; ++i)
		noise[i] = Math.floor(Math.random()*256);
	return noise;
}

function log2(value) {
	return Math.log(value) / Math.LN2;
}
