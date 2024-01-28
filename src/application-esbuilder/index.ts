import { type BuilderContext, createBuilder } from '@angular-devkit/architect';
import { ApplicationBuilderOptions, buildApplication } from '@angular-devkit/build-angular'
import { type Plugin } from 'esbuild';
import { loadConfig } from '../utils/util';

interface ICustomApplicationBuilderOptions extends ApplicationBuilderOptions {
    customEsbuildConfig?: string
}

// @ts-ignore
async function getBuildOptions(options: ICustomApplicationBuilderOptions, context: BuilderContext): Plugin[] {
    const plugins: Plugin[] = await loadConfig(context.workspaceRoot, options.customEsbuildConfig || "./esbuild/esbuildConfig.js") as Plugin[];
    return plugins
}

// Align to the esbuild builder: `Application, extend the ability to support custom esbuild plugin
async function* buildCustomApplicationInternal(options: ICustomApplicationBuilderOptions, context: BuilderContext) {
    if (options.customEsbuildConfig) {
        const plugins = await getBuildOptions(options, context) as Plugin[];
        delete options.customEsbuildConfig;
        yield* buildApplication(options, context, plugins)
    } else {
        yield* buildApplication(options, context);
    }
}

function buildCustomApplication(options: ICustomApplicationBuilderOptions, context: BuilderContext) {
    return {
        [Symbol.asyncIterator]: buildCustomApplicationInternal.bind(null, options, context)
    };
};

export default createBuilder(buildCustomApplication);