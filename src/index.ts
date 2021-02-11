import { initComponents } from './register';
const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = 'dd437f9880e142f39687bba819b5479f';//{YOUR SDK KEY}

// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}

showcase.addEventListener('load', async function() {
  let sdk;
  try {
    sdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.8');
    initComponents(sdk);
  }
  catch(e) {
    console.error(e);
    return;
  }

  console.log('%c  SDK is Up and running ', 'background: #333333; color: #00dd00');
  console.log(sdk);

  //Sophia
  const sophiaModelNode = await sdk.Scene.createNode();
  const sophiaComponent = sophiaModelNode.addComponent('mp.fbxLoader', {
    url: '/src/assets/models/sophia/rp_sophia_animated_003_idling.fbx'
  });
  const sophiaAnimatorComponent = sophiaModelNode.addComponent('mp.animator', {
    object: sophiaComponent.outputs.objectRoot,
    clip: 'Take 001',
    animationSpeed: .02
  });
  sophiaAnimatorComponent.bind('object', sophiaComponent, 'objectRoot');
  sophiaComponent.inputs.localScale = { x: .01, y: .01, z: .01 };  
  sophiaComponent.inputs.localPosition = { x: 1.5, y: 0, z: 1.5 };
  sophiaModelNode.obj3D.rotation.y = -0.99;
  sophiaModelNode.obj3D.position.set(0, 0, .09); // drop ~3 feet  
  sophiaModelNode.start();

 


 
  //Directional Light
  var directionalRightLight = await sdk.Scene.createNode();
  var directionalRightLightInitial = {
    enabled: true,
    color: { r: 155, g: 255, b: 255 },
    intensity: .015,
    position: { x: -115, y: 0, z: -252 },
    target: { x: 0, y: 0, z: 0 },
    debug: false,
  };  
  directionalRightLight.addComponent('mp.directionalLight', directionalRightLightInitial);
  directionalRightLight.start();

  //Directional Light
  var directionalRightLight = await sdk.Scene.createNode();
  var directionalRightLightInitial = {
    enabled: true,
    color: { r: 155, g: 255, b: 255 },
    intensity: .019,
    position: { x: 115, y: 0, z: 252 },
    target: { x: 0, y: 0, z: 0 },
    debug: false,
  };  
  directionalRightLight.addComponent('mp.directionalLight', directionalRightLightInitial);
  directionalRightLight.start();



});


