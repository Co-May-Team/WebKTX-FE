import { Route, Routes, Navigate } from 'react-router-dom'
import { Login, Register } from '~/containers/auth'
import { EmptyLayout } from '~/layouts'

const authRoutes = [
    { id: Math.random(), Container: Login, path: '/login' },
    { id: Math.random(), Container: Register, path: '/register' },
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
        return authRoutes.map(item => {
            const Container = item.Container
            return (
                <Route key={item.id} path={item.path} element={<Container />} />
            )
        })
    }

    return (
        <EmptyLayout>
            <Routes>{renderRoutes()}</Routes>
        </EmptyLayout>
    )
}
