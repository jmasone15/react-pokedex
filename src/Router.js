import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import NavBar from "./components/NavBar";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/react-pokedex">
                    <Home />
                </Route>
                <Route>
                    <Pokemon path="/info" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}