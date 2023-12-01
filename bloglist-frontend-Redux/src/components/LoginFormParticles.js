import { useCallback } from 'react'
import Particles from 'react-particles'

import { useEffect } from 'react'
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const LoginParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine)
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container)
  }, [])

  /*   useEffect(() => {
      const duration = 15 * 1000
      const animationEnd = Date.now() + duration
      let skew = 1

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min
      }

      function frame() {
        const timeLeft = animationEnd - Date.now()
        const ticks = Math.max(200, 500 * (timeLeft / duration))

        skew = Math.max(0.8, skew - 0.001)

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: 0.5,
            y: 0.2 * skew,
          },
          shapes: ['image'],
          shapeOptions: {
            image: [
              {
                src: 'https://svgshare.com/i/z26.svg',
                width: 32,
                height: 32,
              },
            ],
          },
          gravity: randomInRange(0.4, 0.6),
          scalar: 5,
          drift: randomInRange(-0.4, 0.4),
        })

        if (timeLeft > 0) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }, [])*/

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default LoginParticles
