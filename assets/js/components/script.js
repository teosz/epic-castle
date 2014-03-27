$(document).ready(function()
      {
      var angularSpeed = 0.2;
      var lastTime = 0;
 
      // aici rotesc in functie de timp ca sa nu fac un while ( frumusetea js )
      function animate(){
        // calculez timpul
        var time = (new Date()).getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
        plane.rotation.z += angleChange;
        lastTime = time;
 
        // rendare
        renderer.render(scene, camera);
 
        // pe un frame nu randez asta #recursivitate
        requestAnimationFrame(function(){
            animate();
        });
      }
      
      // randare
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
 
      // camera
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.y = -450;
      camera.position.z = 400;
      camera.rotation.x = 45 * (Math.PI / 180);
 
      // scena
      var scene = new THREE.Scene();
 
      // planul
      var map  = new THREE.Object3D();
      var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshNormalMaterial());
      map.add( plane );
      var cube;
      for(var i=1;i<=15;j++)
          for(var j=1;j<=15;j++)
          {
            	cube = new THREE.Mesh( new THREE.CubeGeometry( 10, 10, 10 ), new THREE.MeshNormalMaterial() );
                cube.position.x = i * 10;
                cube.position.z = j * 10;

                map.add(cube);
          }
      plane.overdraw = true;
      scene.add(plane);
 
      // apelez animiatia
          
      animate();
       });
