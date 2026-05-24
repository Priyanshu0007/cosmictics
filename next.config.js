const path = require('path');
const TypeGPU = require("unplugin-typegpu/webpack").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(TypeGPU({}));
    
    // Map 'redraw' and 'react-redraw' to our local high-fidelity mock implementation
    config.resolve.alias['redraw'] = path.resolve(__dirname, 'src/redraw_mock/index.ts');
    config.resolve.alias['react-redraw'] = path.resolve(__dirname, 'src/redraw_mock/react.tsx');
    
    return config;
  }
}

module.exports = nextConfig
