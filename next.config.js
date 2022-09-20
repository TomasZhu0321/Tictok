/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["i.postimg.cc"]
  }
}

module.exports = nextConfig
