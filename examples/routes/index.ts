import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
    {
        path: '/',
        Component: lazy(() => import('@/pages/flip_v7/List/index.tsx')),
        children: [
            {
                path: ':id',
                Component: lazy(() => import('@/pages/flip_v7/Detail/index.tsx'))
            },
        ]
    }
])

export default router