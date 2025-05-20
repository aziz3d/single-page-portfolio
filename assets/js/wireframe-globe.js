class WireframeGlobe {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    this.options = Object.assign({
      radius: 1.5,
      detail: 3,
      color: 0x6366f1,
      highlightColor: 0x4f46e5,
      rotationSpeed: 0.001,
      autoRotate: true,
      wireframe: true,
      points: true,
      pointSize: 0.03,
      interactive: true,
      backgroundColor: 0x000000,
      backgroundAlpha: 0
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.globe = null;
    this.points = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isInitialized = false;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha);
    this.container.appendChild(this.renderer.domElement);
    
    this.createGlobe();
    
    if (this.options.interactive) {
      window.addEventListener('resize', this.onWindowResize.bind(this));
      this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    
    this.animate();
    this.isInitialized = true;
  }

  createGlobe() {
    
    const geometry = new THREE.IcosahedronGeometry(this.options.radius, this.options.detail);
    
    
    const material = new THREE.MeshBasicMaterial({
      color: this.options.color,
      wireframe: this.options.wireframe,
      transparent: true,
      opacity: 0.8
    });
    
    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);
    
    if (this.options.points) {
      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute('position', geometry.getAttribute('position'));
      
      const pointsMaterial = new THREE.PointsMaterial({
        color: this.options.highlightColor,
        size: this.options.pointSize,
        transparent: true,
        opacity: 0.8
      });
      
      this.points = new THREE.Points(pointsGeometry, pointsMaterial);
      this.scene.add(this.points);
    }
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);
  }

  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    
    if (this.options.autoRotate) {
      if (this.globe) {
        this.globe.rotation.y += this.options.rotationSpeed * (this.options.yAxisWeight || 1.0);
        this.globe.rotation.x += this.options.rotationSpeed * (this.options.xAxisWeight || 0.5);
        if (this.options.zAxisWeight) {
          this.globe.rotation.z += this.options.rotationSpeed * this.options.zAxisWeight;
        }
      }
      
      if (this.points) {
        this.points.rotation.y += this.options.rotationSpeed * (this.options.yAxisWeight || 1.0);
        this.points.rotation.x += this.options.rotationSpeed * (this.options.xAxisWeight || 0.5);
        if (this.options.zAxisWeight) {
          this.points.rotation.z += this.options.rotationSpeed * this.options.zAxisWeight;
        }
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  setRotationSpeed(speed) {
    this.options.rotationSpeed = speed;
    return this;
  }
  
  setAxisWeights(xWeight, yWeight, zWeight) {
    this.options.xAxisWeight = xWeight;
    this.options.yAxisWeight = yWeight;
    this.options.zAxisWeight = zWeight;
    return this;
  }
  
  toggleAutoRotation() {
    this.options.autoRotate = !this.options.autoRotate;
    return this;
  }
  
  resetRotation() {
    if (this.globe) {
      this.globe.rotation.set(0, 0, 0);
    }
    if (this.points) {
      this.points.rotation.set(0, 0, 0);
    }
    return this;
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onMouseMove(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
    
  
    if (this.globe) {
      this.globe.rotation.y += this.mouse.x * 0.01;
      this.globe.rotation.x += this.mouse.y * 0.01;
    }
    
    if (this.points) {
      this.points.rotation.y += this.mouse.x * 0.01;
      this.points.rotation.x += this.mouse.y * 0.01;
    }
  }

  resize() {
    this.onWindowResize();
  }

  destroy() {
    if (!this.isInitialized) return;
    
   
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.container.removeEventListener('mousemove', this.onMouseMove.bind(this));
    
   
    cancelAnimationFrame(this.animationFrame);
    
   
    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      this.scene.remove(object);
    }
    
   
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
    
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.globe = null;
    this.points = null;
    this.isInitialized = false;
  }
}
