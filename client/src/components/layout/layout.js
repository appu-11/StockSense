import React from 'react'
import Header from '../header/header.js'

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;