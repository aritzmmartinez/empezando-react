import { useEffect, useState } from "react"

function FollowMouse() {
    // Una buena practica es inicializar el estado con el valor que va a tener
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    // efecto para seguir el mouse
    useEffect(() => {
        console.log('effect', { enabled })

        const handleMove = (event) => {
            const { clientX, clientY } = event
            console.log('move', { clientX, clientY })
            setPosition({ x: clientX, y: clientY })
        }

        // Importante: limpiar el evento cuando el componente se desmonte
        // Porque ademas, si no se limpia, se va a seguir acumulando empeorando el rendimiento
        if (enabled) {
            window.addEventListener('pointermove', handleMove)
        }

        // En el return se define la limpieza del efecto
        return () => {
            window.removeEventListener('pointermove', handleMove)
        }

        // Para ver los eventos que hay suscritos a un elemento se puede usar getEventListeners(elemento), en este caso getEventListeners(window)
        // solo funciona en chromium
    }), [enabled]

    // efecto para cambiar el cursor
    useEffect(() => {
        document.body.classList.toggle('no-cursor', enabled)

        return () => {
            document.body.classList.remove('no-cursor')
        }
    }), [enabled]

    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: '#09f',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.x}px, ${position.y}px)`,
                }}
                />
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Desactivar' : 'Activar'}
            </button>
        </>
    )
}

function App() {
    // const [mounted, setMounted] = useState(true)
    return (
        <main>
            <FollowMouse />
            {/* {mounted && <FollowMouse />} */}
            {/* <button onClick={() => setMounted(!mounted)}>
                {mounted ? 'Desmontar' : 'Montar'}
            </button> */}
        </main>
    )
}

export default App
