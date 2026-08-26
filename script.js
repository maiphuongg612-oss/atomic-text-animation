// Main Animation Script
class AtomicTextAnimation {
    constructor() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupAudio();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0a0e27, 0.004);
    }

    setupCamera() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;

        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            aspect,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        this.camera.position.z = CONFIG.camera.posZ;
    }

    setupRenderer() {
        this.canvas = document.getElementById('canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0e27, 1);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        // Add lights
        const light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(200, 200, 200);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x6496ff, 0.5);
        this.scene.add(ambientLight);
    }

    setupAudio() {
        if (!CONFIG.audio.enabled) return;
        
        this.audio = document.getElementById('bgAudio');
        this.audio.volume = CONFIG.audio.volume;
        
        // Play audio on first user interaction
        const playAudio = () => {
            this.audio.play().catch(err => console.log('Audio play error:', err));
            document.removeEventListener('click', playAudio);
            document.removeEventListener('touchstart', playAudio);
        };
        
        document.addEventListener('click', playAudio);
        document.addEventListener('touchstart', playAudio);
    }

    createParticles() {
        this.particles = [];
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < CONFIG.particles.count; i++) {
            const x = (Math.random() - 0.5) * 800;
            const y = (Math.random() - 0.5) * 800;
            const z = (Math.random() - 0.5) * 800;

            positions.push(x, y, z);

            this.particles.push({
                x, y, z,
                targetX: x,
                targetY: y,
                targetZ: z,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: (Math.random() - 0.5) * 2,
                index: i
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

        const material = new THREE.PointsMaterial({
            color: CONFIG.particles.color,
            size: CONFIG.particles.size,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8
        });

        this.pointCloud = new THREE.Points(geometry, material);
        this.scene.add(this.pointCloud);
    }

    updateParticles(phase, progress) {
        const positions = this.pointCloud.geometry.attributes.position.array;

        this.particles.forEach((particle, index) => {
            const idx = index * 3;

            if (phase === 0) {
                // Phase 0: Random movement
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.z += particle.vz;

                // Bounce off boundaries
                if (Math.abs(particle.x) > 400) particle.vx *= -1;
                if (Math.abs(particle.y) > 400) particle.vy *= -1;
                if (Math.abs(particle.z) > 400) particle.vz *= -1;
            } else if (phase === 1) {
                // Phase 1: Form sphere
                const angle = (index / CONFIG.particles.count) * Math.PI * 2;
                const theta = Math.random() * Math.PI;
                
                particle.targetX = CONFIG.sphere.radius * Math.sin(theta) * Math.cos(angle);
                particle.targetY = CONFIG.sphere.radius * Math.cos(theta);
                particle.targetZ = CONFIG.sphere.radius * Math.sin(theta) * Math.sin(angle);

                particle.x += (particle.targetX - particle.x) * 0.05;
                particle.y += (particle.targetY - particle.y) * 0.05;
                particle.z += (particle.targetZ - particle.z) * 0.05;
            } else if (phase === 2) {
                // Phase 2: Sphere rotation (keep in sphere)
                const angle = (index / CONFIG.particles.count) * Math.PI * 2 + this.time * CONFIG.sphere.rotationSpeed;
                const theta = Math.random() * Math.PI;
                
                particle.x = CONFIG.sphere.radius * Math.sin(theta) * Math.cos(angle);
                particle.y = CONFIG.sphere.radius * Math.cos(theta);
                particle.z = CONFIG.sphere.radius * Math.sin(theta) * Math.sin(angle);
            } else if (phase === 3) {
                // Phase 3: Transform to helix
                const progress3 = (this.phaseProgress) % 1;
                const t = (index / CONFIG.particles.count) * CONFIG.helix.turns * Math.PI * 2;
                
                const helixX = CONFIG.helix.radiusX * Math.cos(t);
                const helixY = (index / CONFIG.particles.count - 0.5) * CONFIG.helix.radiusY * 2;
                const helixZ = CONFIG.helix.radiusX * Math.sin(t);

                particle.x += (helixX - particle.x) * 0.05;
                particle.y += (helixY - particle.y) * 0.05;
                particle.z += (helixZ - particle.z) * 0.05;
            } else if (phase === 4) {
                // Phase 4: Rotate helix
                const t = (index / CONFIG.particles.count) * CONFIG.helix.turns * Math.PI * 2 + this.time * CONFIG.helix.rotationSpeed;
                
                particle.x = CONFIG.helix.radiusX * Math.cos(t);
                particle.y = (index / CONFIG.particles.count - 0.5) * CONFIG.helix.radiusY * 2;
                particle.z = CONFIG.helix.radiusX * Math.sin(t);
            } else if (phase === 5) {
                // Phase 5: Form text (placeholder - particles spread)
                const angle = (index / CONFIG.particles.count) * Math.PI * 2;
                const distance = 100 + (index % 10) * 20;
                
                particle.targetX = distance * Math.cos(angle);
                particle.targetY = (index % 5) * 30 - 60;
                particle.targetZ = distance * Math.sin(angle);

                particle.x += (particle.targetX - particle.x) * 0.05;
                particle.y += (particle.targetY - particle.y) * 0.05;
                particle.z += (particle.targetZ - particle.z) * 0.05;
            }

            positions[idx] = particle.x;
            positions[idx + 1] = particle.y;
            positions[idx + 2] = particle.z;
        });

        this.pointCloud.geometry.attributes.position.needsUpdate = true;
    }

    getPhase() {
        const cycleTime = this.time % CONFIG.timing.totalDuration;
        
        if (cycleTime < CONFIG.timing.particlePhase) return 0;
        if (cycleTime < CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation) return 1;
        if (cycleTime < CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate) return 2;
        if (cycleTime < CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate + CONFIG.timing.helixTransform) return 3;
        if (cycleTime < CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate + CONFIG.timing.helixTransform + CONFIG.timing.helixRotate) return 4;
        
        return 5;
    }

    getPhaseProgress() {
        const cycleTime = this.time % CONFIG.timing.totalDuration;
        const phase = this.getPhase();
        
        const phaseStarts = [
            0,
            CONFIG.timing.particlePhase,
            CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation,
            CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate,
            CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate + CONFIG.timing.helixTransform,
            CONFIG.timing.particlePhase + CONFIG.timing.sphereFormation + CONFIG.timing.sphereRotate + CONFIG.timing.helixTransform + CONFIG.timing.helixRotate
        ];

        const phaseDurations = [
            CONFIG.timing.particlePhase,
            CONFIG.timing.sphereFormation,
            CONFIG.timing.sphereRotate,
            CONFIG.timing.helixTransform,
            CONFIG.timing.helixRotate,
            CONFIG.timing.textForm + CONFIG.timing.textDisplay
        ];

        return (cycleTime - phaseStarts[phase]) / phaseDurations[phase];
    }

    hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time = (this.time || 0) + 16; // ~60fps
        this.phaseProgress = this.getPhaseProgress();
        
        const phase = this.getPhase();
        this.updateParticles(phase, this.phaseProgress);

        this.hideLoadingScreen();
        this.renderer.render(this.scene, this.camera);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

// Initialize animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    new AtomicTextAnimation();
});