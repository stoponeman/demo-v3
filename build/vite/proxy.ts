import { ProxyOptions } from "vite";

type ProxyItem = [string, string];
type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

export const createProxy = (list: ProxyItem[]): ProxyTargetList => {
    const proxy: ProxyTargetList = {};
    console.log(list, 'list');

    list?.forEach((item) => {
        const [prefix, target] = item;

        const isHttps = httpsRE.test(target);

        proxy[prefix] = {
            target,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ""),
            ...(isHttps ? { secure: false } : {}),
        };
    });
    return proxy;
};
