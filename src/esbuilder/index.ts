import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { ApplicationBuilderOptions, buildApplication } from '@angular-devkit/build-angular'
import { BuildOptions } from 'esbuild';
import { loadCustomerPlugin } from '../utils/util';
import path = require('path');

interface ICustomApplicationBuilderOptions extends ApplicationBuilderOptions {
    customEsbuildConfig?: string
}


const loadConfig = async (path: string) => {
    return await loadCustomerPlugin(path)
}

function buildCustomApplication(options: ICustomApplicationBuilderOptions, context: BuilderContext) {
    if (options.customEsbuildConfig) {
        const currWorkDir = context.workspaceRoot;
        const espluginPath = path.resolve(currWorkDir, options.customEsbuildConfig)
        const esbuildConfig: BuildOptions = loadConfig(espluginPath) as BuildOptions;
        return buildApplication(options, context, esbuildConfig.plugins)
    }

    return buildApplication(options, context);
}

export default createBuilder(buildCustomApplication);