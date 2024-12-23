/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FIREBASE_CONFIG: string;
	// Add other environment variables here if needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}