"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const build_angular_1 = require("@angular-devkit/build-angular");
const util_1 = require("../utils/util");
const rxjs_1 = require("rxjs");
// @ts-ignore
function getBuildOptions(options, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const plugins = yield (0, util_1.loadConfig)(context.workspaceRoot, options.customEsbuildConfig || "./esbuild/esbuildConfig.js");
        return plugins;
    });
}
function isEsbuildBased(builderName) {
    if (builderName === '@angular-devkit/build-angular:application' ||
        builderName === '@angular-devkit/build-angular:browser-esbuild') {
        return true;
    }
    return false;
}
function BuilderSelector(info, logger) {
    if (isEsbuildBased(info.builderName)) {
        return info.builderName;
    }
    if (info.forceEsbuild) {
        if (!info.builderName.startsWith('@angular-devkit/build-angular:')) {
            logger.warn('Warning: Forcing the use of the esbuild-based build system with third-party builders' +
                ' may cause unexpected behavior and/or build failures.\n' +
                'Cuurently, the following builder is being used: application');
        }
        // The compatibility builder should be used if esbuild is force enabled.
        return '@angular-devkit/build-angular:application';
    }
    return info.builderName;
}
function buildCustomApplicationInternal(options, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const plugins = yield getBuildOptions(options, context);
        return (0, build_angular_1.executeDevServerBuilder)(options, context, undefined, { buildPlugins: plugins, builderSelector: BuilderSelector });
    });
}
const executeCustomDevServerBuilder = (options, context) => {
    return (0, rxjs_1.from)(buildCustomApplicationInternal(options, context)).pipe((0, rxjs_1.switchMap)((result) => result));
};
exports.default = (0, architect_1.createBuilder)(executeCustomDevServerBuilder);
//# sourceMappingURL=index.js.map