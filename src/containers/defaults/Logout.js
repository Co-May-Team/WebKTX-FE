import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from "~/store/auth/actions"

export default function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])
  return null
}
