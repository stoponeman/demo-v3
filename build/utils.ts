export interface ViteEnv {
    VITE_PROXY: [string, string][];
    VITE_PORT: number;
}

export const wrapperEnv = (config: any): ViteEnv => {
    console.log(config, 'config');
    const obj: any = {};
    for (const key of Object.keys(config)) {
        let name = config[key].replace(/\\n/g, "\n");
        if (key === "VITE_PROXY" && name) {
            try {
                name = JSON.parse(name.replace(/'/g, '"'));
            } catch {
                name = "";
            }
        }
        obj[key] = name;
    }
    return obj;
};
