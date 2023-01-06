import { useEffect } from 'react'

export default function useClickOutside(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        // Bind the event listener
        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, callback])
    return null
}
