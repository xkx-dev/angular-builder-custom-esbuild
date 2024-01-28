import { createBuilder, type BuilderContext } from "@angular-devkit/architect";
import { DevServerBuilderOptions, DevServerBuilderOutput, executeDevServerBuilder } from "@angular-devkit/build-angular";
import { loadConfig } from "../utils/util";
import { type Plugin } from 'esbuild';
import { Observable, from, switchMap } from "rxjs";


interface ICustomDevServerBuilderOptions extends DevServerBuilderOptions {
    customEsbuildConfig?: string,
}

// @ts-ignore
async function getBuildOptions(options: ICustomDevServerBuilderOptions, context: BuilderContext): Plugin[] {
    const plugins: Plugin[] = await loadConfig(context.workspaceRoot, options.customEsbuildConfig || "./esbuild/esbuildConfig.js") as Plugin[];
    return plugins
}

function isEsbuildBased(
    builderName: string,
): builderName is
    | '@angular-devkit/build-angular:application'
    | '@angular-devkit/build-angular:browser-esbuild' {
    if (
        builderName === '@angular-devkit/build-angular:application' ||
        builderName === '@angular-devkit/build-angular:browser-esbuild'
    ) {
        return true;
    }

    return false;
}

interface BuilderSelectorInfo {
    builderName: string;
    forceEsbuild: boolean;
}

function BuilderSelector(
    info: BuilderSelectorInfo,
    logger: BuilderContext['logger'],
): string {
    if (isEsbuildBased(info.builderName)) {
        return info.builderName;
    }

    if (info.forceEsbuild) {
        if (!info.builderName.startsWith('@angular-devkit/build-angular:')) {
            logger.warn(
                'Warning: Forcing the use of the esbuild-based build system with third-party builders' +
                ' may cause unexpected behavior and/or build failures.\n' +
                'Cuurently, the following builder is being used: application'
            );
        }

        // The compatibility builder should be used as application if esbuild is force enabled.
        return '@angular-devkit/build-angular:application';
    }

    return info.builderName;
}

async function buildCustomApplicationInternal(options: ICustomDevServerBuilderOptions, context: BuilderContext) {
    const plugins = await getBuildOptions(options, context) as Plugin[];
    return executeDevServerBuilder(options, context, undefined, { buildPlugins: plugins, builderSelector: BuilderSelector })
}

const executeCustomDevServerBuilder = (options: DevServerBuilderOptions, context: BuilderContext) => {
    return from(buildCustomApplicationInternal(options, context)).pipe(
        switchMap((result: Observable<DevServerBuilderOutput>) => result)
    );
};

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(executeCustomDevServerBuilder);
