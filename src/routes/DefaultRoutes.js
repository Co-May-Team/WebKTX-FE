import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '~/layouts'
import { path } from '~/utils'
import PostDetail from '~/containers/defaults/Posts/PostDetail/PostDetail'
import RegistrationForm from '~/containers/defaults/registration_form/RegistrationForm'

const Home = React.lazy(() => import('~/containers/defaults/Home'))
const Login = React.lazy(() => import('~/containers/defaults/Login'))
const PostSaved = React.lazy(() => import('~/containers/defaults/PostSaved'))
const Search = React.lazy(() => import('~/containers/defaults/Search'))
const PostsHome = React.lazy(() =>
  import('~/containers/defaults/Posts/PostsHome')
)
// const RegistrationForm = React.lazy(() =>
//   import('~/containers/defaults/registration_form/RegistrationForm')
// )
// const PostDetail = React.lazy(() =>
//   import('~/containers/defaults/Posts/PostDetail/PostDetail')
// )

const defaultRoutes = [
  { id: Math.random(), Container: Home, path: path.HOME },
  { id: Math.random(), Container: Login, path: path.LOGIN },
  { id: Math.random(), Container: PostSaved, path: path.POSTSAVED },
  { id: Math.random(), Container: Search, path: path.SEARCH },
  { id: Math.random(), Container: PostsHome, path: path.TAGS },
  {
    id: Math.random(),
    Container: RegistrationForm,
    path: path.REGISTRATION_FORM,
  },
  { id: Math.random(), Container: PostDetail, path: path.POST_DETAIL },
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
          vvv
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
