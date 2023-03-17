import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '~/containers/defaults/Login'
import { DefaultLayout } from '~/layouts'
import { path } from '~/utils'

const authRoutes = [
  { id: Math.random(), Container: Login, path: path.LOGIN },
  {
    id: Math.random(),
    Container: Navigate,
    path: '*',
    replace: true,
    to: '/404',
  },
]

export default function AuthRoutes() {
  const renderRoutes = () => {
    return authRoutes.map((item) => {
      const Container = item.Container
      return <Route key={item.id} path={item.path} element={<Container />} />
    })
  }

  return (
    <DefaultLayout>
      <Routes>{renderRoutes()}</Routes>
    </DefaultLayout>
  )
}
