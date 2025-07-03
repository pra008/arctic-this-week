// src/types/env.d.ts
declare module 'react-native-config' {
  interface NativeConfig {
    MAJOR_VERSION: string;
    MINOR_VERSION: string;
    PATCH_VERSION: string;
    COCKPIT_TOKEN: string;
    COCKPIT_API_URL: string;
    COCKPIT_BASE_URL: string;
  }

  const Config: NativeConfig;
  export default Config;
}
