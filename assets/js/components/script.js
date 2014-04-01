$(document).ready(function()
      {
          // revolutions per second
      var angularSpeed = 0.2; 
      var lastTime = 0;
     function animate(){
        // update
        // render
        renderer.render(scene, camera);
 
        // request new frame
        requestAnimationFrame(function(){
            animate();
        });
      }
 
      // renderer
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
 
      // camera
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.y = -450;
      camera.position.z = 400;
      camera.rotation.x = 45 * (Math.PI / 180);
 
      // scene
      var scene = new THREE.Scene();
      
      // material
      var lemn  = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('crate.jpg')
      });
      var stone =  THREE.ImageUtils.loadTexture('stone-wall.jpg');      
      stone.wrapS = stone.wrapT = THREE.RepeatWrapping;
      stone.repeat.set( 4, 4 );
      stonematerial = new THREE.MeshBasicMaterial( { map: stone } );
      var map = new THREE.Object3D();
      
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), stonematerial);
      map.add( plane );          
      var cube;
      // cube
      for(var i=1;i<=5;i++)
          for(var j=1;j<=5;j++)
          {
              cube = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), lemn);
              cube.position.x = (i * 50) - 150;
              cube.position.y = (j * 50) - 150;
              cube.position.z = 5;
              scene.add(cube);
        }
      // add subtle ambient lighting
      plane.overdraw = true;
      scene.add(map);
      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambientLight);

      
      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
 
      // start animation
      animate();
      });
