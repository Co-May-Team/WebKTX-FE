import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import FormDetail from "~/containers/admin/forms/FormDetail"
import { AdminLayout } from "~/layouts"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

const Posts = React.lazy(() => import("~/containers/admin/Posts"))
const Forms = React.lazy(() => import("~/containers/admin/forms/Forms"))

const adminRoutes = [
  {
    id: Math.random(),
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
    id: Math.random(),
    Container: Posts,
    path: path.POSTS,
  },
  {
    id: Math.random(),
    Container: Forms,
    path: path.FORMS,
  },
  {
    id: Math.random(),
    Container: FormDetail,
    path: path.FORM_DETAIL,
  },
]

export default function AdminRoutes() {
  const status = useSelector(authSelector).status
  const userInfo = useSelector(authSelector).userInfo

  if (!(status === "user") || userInfo?.admin === false) {
    return <Navigate to='/' />
  }

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
