interface ConfigType {
  env: string;
  KEY_ENCRYPTION?: string;
}

const CONFIG: ConfigType = {
  env: import.meta.env.VITE_ENV || import.meta.env.MODE,
  KEY_ENCRYPTION: import.meta.env.VITE_KEY_ENCRYPTION || "secret",
};

export default CONFIG;