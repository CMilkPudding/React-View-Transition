import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
     {
        path: '/',
        Component: lazy(() => import('../ViewTransitionTrigger.tsx')),
    },
    // 本地测试
    {
        path: '/local',
        Component: lazy(() => import('../flip_local/List')),
        children: [
            {
                path: ':id',
                Component: lazy(() => import('../flip_local/Detail'))
            },
        ]
    },
    // 打包测试
    {
        path: '/dist',
        Component: lazy(() => import('../flip_dist/List')),
        children: [
            {
                path: ':id',
                Component: lazy(() => import('../flip_dist/Detail'))
            },
        ]
    }
])

export default router