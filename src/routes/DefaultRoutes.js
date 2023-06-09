import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import FormDetail from "~/containers/admin/forms/FormDetail"
import Logout from "~/containers/defaults/Logout"
import ImagesDetail from "~/containers/defaults/Posts/PostDetail/ImagesDetail"
import PostDetail from "~/containers/defaults/Posts/PostDetail/PostDetail"
import { DefaultLayout } from "~/layouts"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

const Home = React.lazy(() => import("~/containers/defaults/Home"))
// const Signup = React.lazy(() => import("~/containers/defaults/Signup"))
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
  { id: 1, Container: Home, path: path.HOME },
  // { id: 2, Container: Signup, path: path.SIGNUP },
  { id: 2, Container: Login, path: path.LOGIN },
  { id: 3, Container: Logout, path: path.LOGOUT },
  { id: 4, Container: Authentication, path: path.AUTH },
  { id: 5, Container: PostSaved, path: path.POSTSAVED },
  { id: 6, Container: Search, path: path.SEARCH },
  { id: 7, Container: PostsHome, path: path.TAGS },
  {
    id: 8,
    Container: RegistrationForm,
    path: path.REGISTRATION_FORM,
  },
  { id: 10, Container: PostDetail, path: path.POST_DETAIL },
  { id: 9, Container: FormDetail, path: path.FORM_DETAIL },
  { id: 11, Container: ImagesDetail, path: path.IMAGES_DETAIL },
  {
    id: 12,
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
