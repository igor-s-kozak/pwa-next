import type { NextConfig } from "next";
import withPWA from 'next-pwa'

const nextConfigWithPWA = withPWA(
  {
    dest: 'public',
    // register: true,
    // skipWaiting: true,
    // disable: false,

  });


export default nextConfigWithPWA({})
