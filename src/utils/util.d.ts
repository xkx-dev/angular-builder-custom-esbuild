import { type Plugin } from 'esbuild';
export declare function loadCustomerPlugin(workspaceRoot: string, pluginConfigPath: string): Promise<Plugin[]>;
export declare const loadConfig: (workspaceRoot: string, path: string) => Promise<Plugin[]>;
