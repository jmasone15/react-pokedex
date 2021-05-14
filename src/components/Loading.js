import React from 'react';
import { useLoading, Audio, Grid } from '@agney/react-loading';

export default function Loading() {

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Grid />
    });

    return (
        <section {...containerProps}>{indicatorEl}</section>
    )
}
