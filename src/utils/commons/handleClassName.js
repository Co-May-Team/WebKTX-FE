export function add(ref, className) {
  if (!ref?.current?.classList) return
  ref.current.classList.add(className)
}

export function remove(ref, className) {
  if (!ref?.current?.classList) return
  ref.current.classList.remove(className)
}

export function contains(ref, className) {
  if (!ref?.current?.classList) return false
  return ref.current.classList.contains(className)
}
