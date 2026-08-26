// Configuration File
const CONFIG = {
    // Particle Settings
    particles: {
        count: 120,           // Number of particles (tùy chỉnh)
        size: 2,              // Particle size
        color: 0x6496ff,      // Main color (light blue - Eon style)
        emissionColor: 0x64d5ff,  // Secondary color
    },

    // Animation Timing (in milliseconds)
    timing: {
        particlePhase: 2000,   // Random movement phase
        sphereFormation: 2000, // Particles form sphere
        sphereRotate: 2000,    // Sphere rotation phase
        helixTransform: 2000,  // Transform to helix
        helixRotate: 3000,     // Helix rotation phase
        textForm: 2000,        // Text formation
        textDisplay: 3000,     // Text display time
        totalDuration: 15000   // Total animation cycle
    },

    // Sphere Settings
    sphere: {
        radius: 150,           // Sphere radius
        rotationSpeed: 0.003   // Rotation speed
    },

    // Helix Settings
    helix: {
        radiusX: 120,          // Helix X radius
        radiusY: 80,           // Helix Y radius (height)
        turns: 3,              // Number of helix turns
        rotationSpeed: 0.002   // Helix rotation speed
    },

    // Text Messages (Random selection)
    messages: [
        "All the best to you",
        "Believe in yourself",
        "Fingers crossed"
    ],

    // Text Settings
    text: {
        size: 80,              // Font size
        color: 0x6496ff,       // Text color
        outlineColor: 0x64d5ff // Text outline
    },

    // Camera Settings
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000,
        posZ: 300
    },

    // Audio Settings
    audio: {
        enabled: true,
        volume: 0.3,           // Volume level (0-1)
        url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
    },

    // Color Palette (Eon Style - Light & Subtle)
    colors: {
        primary: 0x6496ff,     // Light blue
        secondary: 0x64d5ff,   // Cyan
        accent: 0x7dd3fc,      // Sky blue
        dark: 0x0a0e27         // Dark background
    }
};