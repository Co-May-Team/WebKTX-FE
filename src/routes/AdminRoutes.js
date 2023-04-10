import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '~/layouts'
import { authSelector } from '~/store/selectors'
import { path } from '~/utils'

const Posts = React.lazy(() => import('~/containers/admin/Posts'))

const adminRoutes = [
  {
    id: Math.random(),
    Container: Navigate,
    path: '*',
    replace: true,
    to: '/404',
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
]

export default function AdminRoutes() {
  const status = useSelector(authSelector).status
  const userInfo = useSelector(authSelector).userInfo

  if (!(status === "user") || userInfo?.googleAccount === true) {
    return <Navigate to="/" />
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
