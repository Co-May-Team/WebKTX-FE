import { Routes, Route, Navigate } from 'react-router-dom'
import Posts from '~/containers/systems/posts/Posts'
import System from '~/containers/systems/System'
import { SystemLayout } from '~/layouts'
import { path } from '~/utils'

const systemsRoutes = [
    {
        id: Math.random(),
        Container: Navigate,
        path: '*',
        replace: true,
        to: '/404',
    },
    {
        id: Math.random(),
        Container: System,
        path: path.HOME,
    },
    {
        id: Math.random(),
        Container: Posts,
        path: path.POSTS,
    },
]

export default function SystemsRoutes() {
    const renderRoutes = () => {
        return systemsRoutes.map(item => {
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
        <SystemLayout>
            <Routes>{renderRoutes()}</Routes>
        </SystemLayout>
    )
}
