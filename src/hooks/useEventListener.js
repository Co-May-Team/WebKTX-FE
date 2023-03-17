import { useEffect } from 'react'

export default function useEventListener(type, eventHandler) {
  useEffect(() => {
    if (!type.trim()) return
    function listener() {
      eventHandler()
    }
    window.addEventListener(type, listener)
    return () => window.removeEventListener(type, listener)
  }, [type, eventHandler])
  return null
}
