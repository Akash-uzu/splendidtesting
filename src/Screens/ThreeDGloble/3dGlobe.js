// // GlobeComponent.js

// import React, { useRef, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// // import { GLView } from 'react-native-webgl';
// import * as THREE from 'three';

// const GlobeComponent = () => {
//   const glRef = useRef(null);

//   useEffect(() => {
//     const setupGlobe = () => {
//       const width = glRef.current.getContext().drawingBufferWidth;
//       const height = glRef.current.getContext().drawingBufferHeight;

//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

//       const renderer = new THREE.WebGLRenderer({ context: glRef.current.getContext() });
//       renderer.setSize(width, height);

//       const geometry = new THREE.SphereGeometry(1, 50, 50);
//       const textureLoader = new THREE.TextureLoader();
//       const texture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Earthmap1000x500compac.jpg/1024px-Earthmap1000x500compac.jpg');
//       const material = new THREE.MeshBasicMaterial({ map: texture });

//       const globe = new THREE.Mesh(geometry, material);
//       scene.add(globe);

//       camera.position.z = 3;

//       const animate = () => {
//         requestAnimationFrame(animate);
//         globe.rotation.y += 0.005;
//         renderer.render(scene, camera);
//         glRef.current.endFrameEXP();
//       };

//       animate();
//     };

//     if (glRef.current) {
//       setupGlobe();
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GLView style={styles.glView} ref={glRef} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   glView: {
//     width: '80%',
//     aspectRatio: 1, // Square aspect ratio
//   },
// });

// export default GlobeComponent;
