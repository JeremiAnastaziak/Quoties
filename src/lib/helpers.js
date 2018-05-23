import BodyClassName from 'react-body-classname';
import React from 'react';

export function toggleBodyClass(className) {
    return (
        <BodyClassName className={className}></BodyClassName>
    )
}
