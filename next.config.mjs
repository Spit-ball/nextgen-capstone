/** @type {import('next').NextConfig} */
const nextConfig = {

    // allows images to work from cloudflare
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**.cloudfront.net",
                port: '',
            },
        ],
    },

};

export default nextConfig;
