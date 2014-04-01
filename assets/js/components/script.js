$(document).ready(function()
      {
      	var camera, scene, renderer;
var geometry, material, mesh;
var controls,time = Date.now();

var objects = [];

var ray;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

var element = document.body;

var pointerlockchange = function ( event ) {

if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

controls.enabled = true;

blocker.style.display = 'none';

} else {

controls.enabled = false;

blocker.style.display = '-webkit-box';
blocker.style.display = '-moz-box';
blocker.style.display = 'box';

instructions.style.display = '';

}

}

var pointerlockerror = function ( event ) {

instructions.style.display = '';

}

// Hook pointer lock state change events
document.addEventListener( 'pointerlockchange', pointerlockchange, false );
document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

document.addEventListener( 'pointerlockerror', pointerlockerror, false );
document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

instructions.addEventListener( 'click', function ( event ) {

instructions.style.display = 'none';

// Ask the browser to lock the pointer
element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

if ( /Firefox/i.test( navigator.userAgent ) ) {

var fullscreenchange = function ( event ) {

if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

document.removeEventListener( 'fullscreenchange', fullscreenchange );
document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

element.requestPointerLock();
}

}

document.addEventListener( 'fullscreenchange', fullscreenchange, false );
document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

element.requestFullscreen();

} else {

element.requestPointerLock();

}

}, false );

} else {

instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

init();
animate();

function init() {

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
light.position.set( -1, - 0.5, -1 );
scene.add( light );

controls = new THREE.PointerLockControls( camera );
scene.add( controls.getObject() );

ray = new THREE.Raycaster();
ray.ray.direction.set( 0, -1, 0 );

// floor
      var lemn = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('crate.jpg')
      });
geometry = new THREE.PlaneGeometry( 300, 300, 100, 100 );
geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

var lemn = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('crate.jpg')
      });
var stone = THREE.ImageUtils.loadTexture('stone-wall.jpg');
stone.wrapS = stone.wrapT = THREE.RepeatWrapping;
stone.repeat.set( 64, 64 );
stonematerial = new THREE.MeshBasicMaterial( { map: stone } );
mesh = new THREE.Mesh( geometry, stonematerial );
scene.add( mesh );
var b1 = new THREE.Mesh(new THREE.CubeGeometry(300, 20, 10), lemn);
b1.position.z = 150;
b1.position.y = 10;
scene.add(b1);
var b2 = new THREE.Mesh(new THREE.CubeGeometry(300, 20, 10), lemn);
b2.position.z = -150;
b2.position.y = 10;
scene.add(b2);

var b3 = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 300), lemn);
b3.position.x = 150;
b3.position.y = 10;
scene.add(b3);


var b4 = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 300), lemn);
b4.position.x = -150;
b4.position.y = 10;
scene.add(b4);
var cube
for(var i=1;i<=14;i++)
 {


    cube = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 10), lemn);
    cube.position.x = (i*20)-150;
    cube.position.y = 10;
    scene.add(cube);


 }


renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

//

window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

requestAnimationFrame( animate );

//

controls.isOnObject( false );

ray.ray.origin.copy( controls.getObject().position );
ray.ray.origin.y -= 10;

var intersections = ray.intersectObjects( objects );

if ( intersections.length > 0 ) {

var distance = intersections[ 0 ].distance;

if ( distance > 0 && distance < 10 ) {

controls.isOnObject( true );

}

}

controls.update( Date.now() - time );

renderer.render( scene, camera );

time = Date.now();

}
      });
