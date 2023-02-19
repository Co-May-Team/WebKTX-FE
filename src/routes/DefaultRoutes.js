import { Navigate, Route, Routes } from 'react-router-dom'
import {
    DetailPost,
    Forms,
    Home,
    Posts
} from '~/containers/defaults'
import { DefaultLayout } from '~/layouts'
import { path } from '~/utils'

const defaultRoutes = [
    { id: Math.random(), Container: Home, path: path.HOME },
    { id: Math.random(), Container: Posts, path: "/:url" },
    { id: Math.random(), Container: Forms, path: path.FORMS },
    { id: Math.random(), Container: DetailPost, path: path.DETAIL_POST },
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
                    element={
                        <Container replace={item?.replace} to={item?.to} />
                    }
                />
            )
        })
    }
    return (
        <DefaultLayout>
            <Routes>
                {renderRoutes()}
                {/* <Route path="*" element={<div>Not Found</div>} /> */}
            </Routes>
        </DefaultLayout>
    )
}
