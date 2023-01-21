import { Routes, Route, Navigate } from 'react-router-dom'
import Posts from '~/containers/admin/posts/Posts'
import Admin from '~/containers/admin/Admin'
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
]


export default function AdminRoutes() {
    const renderRoutes = () => {
        return adminRoutes.map(item => {
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
