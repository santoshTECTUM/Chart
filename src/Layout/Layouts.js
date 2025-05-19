import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Graph from '../Component/Graph'
import { router } from './routes'

export const Layouts = () => {
    return (

        <Routes>
            {router.map((route, key) =>
                route.Children && route.Children.length > 0 ? (
                    <Route key={key} path={route.url}>
                        {route.Children.map((child, index) => (
                            <Route
                                key={index}
                                path={child.url}
                                element={<Graph name={child.name} type={child.type} />}
                            />
                        ))}
                    </Route>
                ) : (
                    <Route
                        key={key}
                        path={route.url}
                        element={<Graph name={route.name} type={route.type} />}
                    />
                )
            )}
        </Routes>

    )
}
