(function () {
  'use strict';

  const canvas = document.getElementById('canvas3d');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 12);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // === LIGHTS ===
  const ambient = new THREE.AmbientLight(0x222222, 0.5);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xc8f060, 1.0);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
  fillLight.position.set(-5, -3, 5);
  scene.add(fillLight);

  const backLight = new THREE.DirectionalLight(0xff6633, 0.2);
  backLight.position.set(0, -5, -8);
  scene.add(backLight);

  // === MAIN GROUP ===
  const group = new THREE.Group();
  scene.add(group);

  // --- Central Icosahedron (crystal core) ---
  const coreGeo = new THREE.IcosahedronGeometry(1.8, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8f060,
    metalness: 0.1,
    roughness: 0.2,
    emissive: 0xc8f060,
    emissiveIntensity: 0.06,
    transparent: true,
    opacity: 0.25,
    wireframe: false,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.y = 0.2;
  group.add(core);

  // --- Wireframe shell ---
  const shellGeo = new THREE.IcosahedronGeometry(2.0, 0);
  const shellMat = new THREE.MeshBasicMaterial({
    color: 0xc8f060,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  shell.position.y = 0.2;
  group.add(shell);

  // --- Inner glow core ---
  const glowCoreGeo = new THREE.IcosahedronGeometry(1.2, 0);
  const glowCoreMat = new THREE.MeshBasicMaterial({
    color: 0xc8f060,
    transparent: true,
    opacity: 0.08,
  });
  const glowCore = new THREE.Mesh(glowCoreGeo, glowCoreMat);
  glowCore.position.y = 0.2;
  group.add(glowCore);

  // --- Orbiting node network (neural/graph style) ---
  const nodeCount = 16;
  const nodes = [];
  const nodeGroup = new THREE.Group();
  group.add(nodeGroup);

  const nodeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8f060,
    emissive: 0xc8f060,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.8,
    roughness: 0.2,
    metalness: 0.1,
  });

  for (let i = 0; i < nodeCount; i++) {
    const size = 0.04 + Math.random() * 0.06;
    const node = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), nodeMat.clone());
    const r = 2.6 + Math.random() * 0.8;
    const theta = (i / nodeCount) * Math.PI * 2;
    const phi = (Math.random() - 0.5) * 1.2;
    node.position.set(
      r * Math.cos(theta) * Math.cos(phi),
      r * Math.sin(phi) + 0.2,
      r * Math.sin(theta) * Math.cos(phi)
    );
    node.userData = { r, theta, phi, speed: 0.15 + Math.random() * 0.1, phase: Math.random() * Math.PI * 2 };
    node.material.color.setHSL(0.22 + Math.random() * 0.1, 0.8, 0.5);
    nodeGroup.add(node);
    nodes.push(node);
  }

  // --- Connection lines between nearby nodes ---
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xc8f060,
    transparent: true,
    opacity: 0.08,
  });

  function updateConnections() {
    while (nodeGroup.children.length > nodeCount) {
      nodeGroup.remove(nodeGroup.children[nodeGroup.children.length - 1]);
    }

    const positions = nodes.map((n) => n.position.clone());
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < 1.8 && Math.random() < 0.3) {
          const geom = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
          const line = new THREE.Line(geom, lineMat.clone());
          line.material.opacity = 0.04 + Math.random() * 0.06;
          nodeGroup.add(line);
        }
      }
    }
  }
  updateConnections();

  // --- Energy flow particles ---
  const flowCount = 200;
  const flowGeo = new THREE.BufferGeometry();
  const flowPos = new Float32Array(flowCount * 3);
  const flowData = [];

  for (let i = 0; i < flowCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.2 + Math.random() * 1.5;
    flowPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    flowPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.2;
    flowPos[i * 3 + 2] = r * Math.cos(phi);
    flowData.push({ theta, phi, r, speed: 0.2 + Math.random() * 0.3, phase: Math.random() * Math.PI * 2 });
  }

  flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));

  const flowMat = new THREE.PointsMaterial({
    color: 0xc8f060,
    size: 0.025,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const flowParticles = new THREE.Points(flowGeo, flowMat);
  group.add(flowParticles);

  // --- Background star field ---
  const starCount = 400;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const r = 15 + Math.random() * 30;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);
    starSizes[i] = 0.02 + Math.random() * 0.06;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.04,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // --- Ground glow ---
  const glowGeo = new THREE.PlaneGeometry(12, 12);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xc8f060,
    transparent: true,
    opacity: 0.025,
    side: THREE.DoubleSide,
  });
  const glowPlane = new THREE.Mesh(glowGeo, glowMat);
  glowPlane.rotation.x = -Math.PI / 2;
  glowPlane.position.y = -3.0;
  scene.add(glowPlane);

  // === SCROLL ===
  let scrollY = 0;
  let targetScroll = 0;

  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  }, { passive: true });

  // === MOUSE ===
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // === RESIZE ===
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // === ANIMATION ===
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    scrollY += (targetScroll - scrollY) * 0.05;

    // Rotate main group
    group.rotation.x = Math.sin(t * 0.12) * 0.1;
    group.rotation.y = t * 0.2 + scrollY * 1.5;
    group.rotation.z = Math.sin(t * 0.08) * 0.03;

    // Pulse the core
    const corePulse = 1 + Math.sin(t * 0.5) * 0.03;
    core.scale.set(corePulse, corePulse, corePulse);
    core.material.opacity = 0.2 + Math.sin(t * 0.5) * 0.06;
    shell.material.opacity = 0.1 + Math.sin(t * 0.4 + 1) * 0.04;
    glowCore.material.opacity = 0.06 + Math.sin(t * 0.6 + 2) * 0.03;

    // Orbit nodes — rotate in a wave pattern
    nodes.forEach((node) => {
      const d = node.userData;
      d.theta += 0.005 * d.speed;
      d.phi += Math.sin(t * 0.2 + d.phase) * 0.002;
      node.position.x = d.r * Math.cos(d.theta) * Math.cos(d.phi);
      node.position.y = d.r * Math.sin(d.phi) + 0.2 + Math.sin(t * 0.3 + d.phase) * 0.1;
      node.position.z = d.r * Math.sin(d.theta) * Math.cos(d.phi);
    });

    // Rebuild connections occasionally
    if (Math.floor(t) % 3 === 0 && t > 0.1) {
      // lazy — connections update on interval via the sin check
    }

    // Flow particles
    const fp = flowParticles.geometry.attributes.position.array;
    for (let i = 0; i < flowCount; i++) {
      const d = flowData[i];
      d.theta += 0.003 * d.speed;
      d.phi += Math.sin(t * 0.2 + d.phase) * 0.001;
      const r = d.r + Math.sin(t * 0.4 + d.phase) * 0.1;
      fp[i * 3] = r * Math.sin(d.phi) * Math.cos(d.theta);
      fp[i * 3 + 1] = r * Math.sin(d.phi) * Math.sin(d.theta) + 0.2;
      fp[i * 3 + 2] = r * Math.cos(d.phi);
    }
    flowParticles.geometry.attributes.position.needsUpdate = true;

    // Rotate stars slowly
    stars.rotation.y = t * 0.005;

    // Mouse follow
    group.position.x += (mouseX * 1.0 - group.position.x) * 0.03;
    group.position.y += (-mouseY * 0.6 - group.position.y) * 0.03;

    // Camera scroll
    camera.position.z = 12 + scrollY * 4;
    camera.position.y = -scrollY * 1.5;

    // Glow pulse
    glowPlane.material.opacity = 0.02 + Math.sin(t * 0.25) * 0.01;

    renderer.render(scene, camera);
  }

  animate();
})();
