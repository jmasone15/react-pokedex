import React from "react";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from "./components/Loading";

// Loading components for the lazy loading page.
const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading,
});
const Pokemon = Loadable({
    loader: () => import('./pages/Pokemon'),
    loading: Loading,
});
const PokedexPage = Loadable({
    loader: () => import("./pages/PokedexPage"),
    loading: Loading,
});

export default function Router() {
    return (
        <BrowserRouter basename="/react-pokedex">
            <HashRouter>
                <Route exact path="/" component={Home} />
                <Route path="/info" component={Pokemon} />
                <Route path="/pokedex" component={PokedexPage} />
            </HashRouter>
        </BrowserRouter>
    )
}