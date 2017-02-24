var t;
var camera, scene, Renderer, geometry, texture, mesh;

function setup() {
  createCanvas(2048, 2048)
  stroke(0, 18);
  noFill();
  t = 0;

  Renderer = new THREE.WebGLRenderer({ alpha: true });
  Renderer.setSize(windowWidth, windowHeight);
  document.body.appendChild(Renderer.domElement);
    
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);
  texture = new THREE.Texture(canvas);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  geometry = new THREE.BoxGeometry( 400, 400, 400 );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  composer = new THREE.EffectComposer( Renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );
  var effect = new THREE.ShaderPass( THREE.DotScreenShader );
  effect.uniforms[ 'scale' ].value = 4;
  composer.addPass( effect );
  var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
  effect.uniforms[ 'amount' ].value = 0.5;
  effect.renderToScreen = true;
  composer.addPass( effect );

  background(255);
}

function draw() {
  texture.needsUpdate = true;
  // mesh.rotation.y += 0.001;
  Renderer.render(scene, camera);
  var x1 = width * noise(t + 15);
  var x2 = width * noise(t + 25);
  var x3 = width * noise(t + 35);
  var x4 = width * noise(t + 45);
  var y1 = height * noise(t + 55);
  var y2 = height * noise(t + 65);
  var y3 = height * noise(t + 75);
  var y4 = height * noise(t + 85);

  var b = bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  // console.log(b)
  t += 0.001;
}