/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(graphql|gql)/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader"
        })

        return config
    }
}

module.exports = nextConfig
