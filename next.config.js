/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  reactStrictMode: true,
  images:{
    domains:[
      'cdn.pixabay.com',
      'lh3.googleusercontent.com'
    ],
  }
}

module.exports = nextConfig
