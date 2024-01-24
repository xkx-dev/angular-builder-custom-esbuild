import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { ApplicationBuilderOptions, buildApplication } from '@angular-devkit/build-angular'
import {  Plugin } from 'esbuild';
import { loadConfig } from '../utils/util';

interface ICustomApplicationBuilderOptions extends ApplicationBuilderOptions {
    customEsbuildConfig?: string
}

// @ts-ignore
async function getBuildOptions(options: ICustomApplicationBuilderOptions, context: BuilderContext): Plugin[] {
    if (options.customEsbuildConfig) {
        const plugins: Plugin[] = await loadConfig(context.workspaceRoot, options.customEsbuildConfig) as Plugin[];
        return plugins
    }
}

// Align to the esbuild builder: `Application`, current now is not supported with increamental serve with Vite
 async function*  buildCustomApplicationInternal(options: ICustomApplicationBuilderOptions, context: BuilderContext) {
    if (options.customEsbuildConfig) {
        const plugins =  await getBuildOptions(options, context) as Plugin[];
        yield* buildApplication(options, context, plugins)
    } else {
        yield* buildApplication(options, context);
    }
}

const buildCustomApplication = (options: ICustomApplicationBuilderOptions, context: BuilderContext) => {
  return buildCustomApplicationInternal(options, context);
};

export default createBuilder(buildCustomApplication);