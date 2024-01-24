import path = require('path');
export async function loadCustomerPlugin<T>(workspaceRoot: string, pluginConfigPath: string): Promise<T> {
    // Todo: currently, only support config with commonJs
    const currWorkDir = workspaceRoot;
    const espluginAbsPath = path.resolve(currWorkDir, pluginConfigPath)
    const plugins = await require(espluginAbsPath).plugins;
    //@ts-ignore
    const pluginSvg = await import('esbuild-plugin-svg');
    if (Array.isArray(plugins) && pluginSvg.default) {
        plugins.push(pluginSvg.default())
    }
    return plugins;
}

export const loadConfig = async (workspaceRoot: string, path: string) => {
    const res = await loadCustomerPlugin(workspaceRoot, path);
    return res;
}