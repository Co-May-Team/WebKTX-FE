import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom/dist"
import { logout } from "~/store/auth/slice"

export default function LogoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(logout())
    navigate(-1)
  }, [])
  return null
}
