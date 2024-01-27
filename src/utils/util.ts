import path = require('path');
import { type Plugin } from 'esbuild'
export async function loadCustomerPlugin(workspaceRoot: string, pluginConfigPath: string): Promise<Plugin[]> {
    // Todo: currently, only support config with commonJs
    const currWorkDir = workspaceRoot;
    const espluginAbsPath = path.resolve(currWorkDir, pluginConfigPath)
    const { getPlugins, plugins } = await require(espluginAbsPath);
    if (typeof getPlugins === 'function') {
        return await getPlugins();
    } else if (Array.isArray(plugins)) {
        return plugins;
    }
    return [];
}

export const loadConfig = async (workspaceRoot: string, path: string): Promise<Plugin[]> => {
    const res = await loadCustomerPlugin(workspaceRoot, path);
    return res;
}