import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { AdminLayout } from "~/layouts"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

const PostsManagementPage = React.lazy(() =>
  import("~/containers/admin/PostsManagement/PostsManagementPage")
)
const RegistrationFormsManagementPage = React.lazy(() =>
  import(
    "~/containers/admin/RegistrationFormsManagement/RegistrationFormsManagementPage"
  )
)
const RegistrationFormDetailPage = React.lazy(() =>
  import(
    "~/containers/admin/RegistrationFormsManagement/RegistrationFormDetailPage"
  )
)

const adminRoutes = [
  {
    id: "/404",
    Container: Navigate,
    path: "*",
    replace: true,
    to: "/404",
  },
  // {
  //   id: Math.random(),
  //   Container: Dashboard,
  //   path: path.DASHBOARD,
  // },
  {
    id: path.POSTS,
    Container: PostsManagementPage,
    path: path.POSTS,
  },
  {
    id: path.FORMS,
    Container: RegistrationFormsManagementPage,
    path: path.FORMS,
  },
  {
    id: path.FORM_DETAIL,
    Container: RegistrationFormDetailPage,
    path: path.FORM_DETAIL,
  },
]

export default function AdminRoutes() {
  const status = useSelector(authSelector).status
  const userInfo = useSelector(authSelector).userInfo

  const navigate = useNavigate()

  useEffect(() => {
    if (!(status === "user") || userInfo?.admin === false) {
      navigate("/")
    }
  }, [status])

  const renderRoutes = () => {
    return adminRoutes.map((item) => {
      const Container = item.Container
      return (
        <Route
          key={item.id}
          path={item.path}
          element={<Container replace={item?.replace} to={item?.to} />}
        />
      )
    })
  }
  return (
    <AdminLayout>
      <Routes>{renderRoutes()}</Routes>
    </AdminLayout>
  )
}
