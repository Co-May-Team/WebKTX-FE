import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import ImagesDetail from "~/containers/defaults/Posts/PostDetail/ImagesDetail"
import PostDetail from "~/containers/defaults/Posts/PostDetail/PostDetail"
import { DefaultLayout } from "~/layouts"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

const Home = React.lazy(() => import("~/containers/defaults/Home"))
const Signup = React.lazy(() => import("~/containers/defaults/Signup"))
const Login = React.lazy(() => import("~/containers/defaults/Login"))
const Authentication = React.lazy(() =>
  import("~/containers/defaults/Authentication")
)
const PostSaved = React.lazy(() => import("~/containers/defaults/PostSaved"))
const Search = React.lazy(() => import("~/containers/defaults/Search"))
const PostsHome = React.lazy(() =>
  import("~/containers/defaults/Posts/PostsHome")
)
const RegistrationForm = React.lazy(() =>
  import("~/containers/defaults/RegistrationForm/RegistrationForm")
)
// const PostDetail = React.lazy(() =>
//   import('~/containers/defaults/Posts/PostDetail/PostDetail')
// )

const defaultRoutes = [
  { id: Math.random(), Container: Home, path: path.HOME },
  { id: Math.random(), Container: Signup, path: path.SIGNUP },
  { id: Math.random(), Container: Login, path: path.LOGIN },
  { id: Math.random(), Container: Authentication, path: path.AUTH },
  { id: Math.random(), Container: PostSaved, path: path.POSTSAVED },
  { id: Math.random(), Container: Search, path: path.SEARCH },
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
    path: "*",
    replace: true,
    to: "/404",
  },
]

export default function DefaultRoutes() {
  const status = useSelector(authSelector).status

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
