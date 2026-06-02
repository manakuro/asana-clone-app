import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Disable Turbopack's scope hoisting optimization.
    //
    // Scope hoisting inlines modules into a single scope to reduce bundle size,
    // but it can cause React Context instances to be duplicated across chunks.
    // When `createContext()` is called inside a factory function (e.g. createProvider),
    // each inlined copy produces a distinct Context instance. As a result, the Provider
    // and its consumers may reference different instances, silently breaking context propagation.
    //
    // TODO: Refactor createProvider to accept an externally defined Context object
    // so that context identity is guaranteed regardless of how modules are bundled.
    // Re-enable this flag after the refactor is verified.
    turbopackScopeHoisting: false,
  },
  serverExternalPackages: ['utf-8-validate', 'bufferutil'],
  devIndicators: false,
};

export default nextConfig;
