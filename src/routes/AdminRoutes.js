import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '~/containers/admin/Admin'
import Images from '~/containers/admin/Images'
import Posts from '~/containers/admin/Posts'
import Videos from '~/containers/admin/Videos'
import { AdminLayout } from '~/layouts'
import { path } from '~/utils'

const adminRoutes = [
    {
        id: Math.random(),
        Container: Navigate,
        path: '*',
        replace: true,
        to: '/404',
    },
    {
        id: Math.random(),
        Container: Admin,
        path: path.HOME,
    },
    {
        id: Math.random(),
        Container: Posts,
        path: path.POSTS,
    },
    {
        id: Math.random(),
        Container: Images,
        path: path.IMAGES,
    },
    {
        id: Math.random(),
        Container: Videos,
        path: path.VIDEOS,
    },
]

export default function AdminRoutes() {
    const renderRoutes = () => {
        return adminRoutes.map((item) => {
            const Container = item.Container
            return (
                <Route
                    key={item.id}
                    path={item.path}
                    element={
                        <Container replace={item?.replace} to={item?.to} />
                    }
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
