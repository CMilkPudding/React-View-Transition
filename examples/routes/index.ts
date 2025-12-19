import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
    {
        path: '/',
        Component: lazy(() => import('../flip_local/List')),
        children: [
            {
                path: ':id',
                Component: lazy(() => import('../flip_local/Detail'))
            },
        ]
    }
])

export default router