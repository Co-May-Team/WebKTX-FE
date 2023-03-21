import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '~/containers/defaults/Home'
import ImagesDetail from '~/containers/defaults/Home/sections/ImagesSection/ImagesDetail'
import PostDetail from '~/containers/defaults/Posts/PostDetail'
import PostsHome from '~/containers/defaults/Posts/PostsHome'
import RegistrationForm from '~/containers/defaults/registration_form/RegistrationForm'
import { DefaultLayout } from '~/layouts'
import { path } from '~/utils'

const defaultRoutes = [
  { id: Math.random(), Container: Home, path: path.HOME },
  { id: Math.random(), Container: PostsHome, path: path.TAGS },
  {
    id: Math.random(),
    Container: RegistrationForm,
    path: path.REGISTRATION_FORM,
  },
  { id: Math.random(), Container: PostDetail, path: path.POST_DETAIL },
  { id: Math.random(), Container: ImagesDetail, path: path.IMAGES_DETAIL },
  {
    id: Math.random(),
    Container: Navigate,
    path: '*',
    replace: true,
    to: '/404',
  },
]

export default function DefaultRoutes() {
  const renderRoutes = () => {
    return defaultRoutes.map((item) => {
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
    <DefaultLayout>
      <Routes>{renderRoutes()}</Routes>
    </DefaultLayout>
  )
}
