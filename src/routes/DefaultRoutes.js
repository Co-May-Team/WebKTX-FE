import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
// import RegistrationFormDetailPage from "~/containers/admin/RegistrationFormsManagement/RegistrationFormDetailPage"
// import FormDetail from "~/containers/admin/RegistrationFormsManagement/RegistrationFormDetailPage"
// import Logout from "~/containers/defaults/LogoutPage"
// import ImagesDetail from "~/containers/defaults/Posts/PostDetail/ImagesDetailPage"
// import PostDetail from "~/containers/defaults/Posts/PostDetail/PostDetailPage"
import { DefaultLayout } from "~/layouts"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

const HomePage = React.lazy(() => import("~/containers/defaults/Home/HomePage"))
// const Signup = React.lazy(() => import("~/containers/defaults/Signup"))
const LoginPage = React.lazy(() => import("~/containers/defaults/LoginPage"))
const LogoutPage = React.lazy(() => import("~/containers/defaults/LogoutPage"))
const AuthenticationPage = React.lazy(() =>
  import("~/containers/defaults/AuthenticationPage")
)
const PostSavedPage = React.lazy(() =>
  import("~/containers/defaults/PostSavedPage")
)
const SearchPage = React.lazy(() => import("~/containers/defaults/SearchPage"))
const PostsHomePage = React.lazy(() =>
  import("~/containers/defaults/Posts/PostsHomePage")
)
const PostDetailPage = React.lazy(() =>
  import("~/containers/defaults/Posts/PostDetail/PostDetailPage")
)
const ImagesDetailPage = React.lazy(() =>
  import("~/containers/defaults/Posts/PostDetail/ImagesDetailPage")
)
const RegistrationFormPage = React.lazy(() =>
  import("~/containers/defaults/RegistrationForm/RegistrationFormPage")
)
const RegistrationFormDetailPage = React.lazy(() =>
  import(
    "~/containers/admin/RegistrationFormsManagement/RegistrationFormDetailPage"
  )
)

const defaultRoutes = [
  { id: path.HOME, Container: HomePage, path: path.HOME },
  // { id: 2, Container: Signup, path: path.SIGNUP },
  { id: path.LOGIN, Container: LoginPage, path: path.LOGIN },
  { id: path.LOGOUT, Container: LogoutPage, path: path.LOGOUT },
  { id: path.AUTH, Container: AuthenticationPage, path: path.AUTH },
  { id: path.POSTSAVED, Container: PostSavedPage, path: path.POSTSAVED },
  { id: path.SEARCH, Container: SearchPage, path: path.SEARCH },
  { id: path.TAGS, Container: PostsHomePage, path: path.TAGS },
  {
    id: path.REGISTRATION_FORM,
    Container: RegistrationFormPage,
    path: path.REGISTRATION_FORM,
  },
  { id: path.POST_DETAIL, Container: PostDetailPage, path: path.POST_DETAIL },
  { id: path.IMAGES_DETAIL, Container: ImagesDetailPage, path: path.IMAGES_DETAIL },
  { id: path.FORM_DETAIL, Container: RegistrationFormDetailPage, path: path.FORM_DETAIL },
  {
    id: "/404",
    Container: Navigate,
    path: "*",
    replace: true,
    to: "/404",
  },
]

export default function DefaultRoutes() {
  const status = useSelector(authSelector).status

  const navigate = useNavigate()

  useEffect(() => {
    if (status === "auth") {
      navigate("/xac-thuc")
    }
  }, [status])

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
