import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que la web se publique aunque haya errores de TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto permite que la web se publique aunque haya advertencias de código no usado.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
