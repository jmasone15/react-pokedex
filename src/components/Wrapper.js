import React from "react";
import Particles from "react-tsparticles";

export default function Wrapper({ config }) {

    return (
        <Particles id="tsparticles" options={config} />
    )
}
