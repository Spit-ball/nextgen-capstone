// added AuthProvider to wrap the entire app since it wasn't working on individual pages

import React from 'react';
import { AuthProvider } from '../app/contexts/AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;