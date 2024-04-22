import React from 'react';
import { AuthProvider } from '../app/contexts/AuthContext';
import { BattleTagProvider } from '../app/contexts/BattleTagContext';
import '../app/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <BattleTagProvider>
                <Head>
                    <link rel="icon" href="/assets/ng_submark.png" />
                </Head>
                <Component {...pageProps} />
            </BattleTagProvider>
        </AuthProvider>
    );
}

export default MyApp;