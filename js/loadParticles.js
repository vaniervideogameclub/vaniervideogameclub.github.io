document.addEventListener('DOMContentLoaded', function() {

    var button = document.getElementById('loadParticlesButton');
    if (button) {
        console.log('Button found'); // Confirm button is found
        button.addEventListener('click', function() {
            console.log('Button clicked'); // Confirm button click is detected

            // Check if particles.js is already loaded
            if (!window.particlesJS) {
                // Create and load particles.js script
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
                script.onload = function() {

                    // Initialize particles.js
                    particlesJS('particles-js', {
                        "particles": {
                            "number": {
                                "value": 80,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#00ff00"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false
                            },
                            "size": {
                                "value": 3,
                                "random": true
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#00ff00",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            }
                        },
                        "retina_detect": true
                    });
                };
                document.body.appendChild(script);
            } else {
                console.log('Particles.js is already loaded');
            }
        });
    } else {
        console.error('Button not found'); // Error if button is not found
    }
});
