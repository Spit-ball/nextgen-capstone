import React from 'react';
import { AuthProvider } from '../app/contexts/AuthContext';
import { BattleTagProvider } from '../app/contexts/BattleTagContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <BattleTagProvider>
                <Component {...pageProps} />
            </BattleTagProvider>
        </AuthProvider>
    );
}

export default MyApp;