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
exports.loadConfig = exports.loadCustomerPlugin = void 0;
const path = require("path");
function loadCustomerPlugin(workspaceRoot, pluginConfigPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo: currently, only support config with commonJs
        const currWorkDir = workspaceRoot;
        const espluginAbsPath = path.resolve(currWorkDir, pluginConfigPath);
        const plugins = yield require(espluginAbsPath).plugins;
        //@ts-ignore
        const pluginSvg = yield import('esbuild-plugin-svg');
        if (Array.isArray(plugins) && pluginSvg.default) {
            plugins.push(pluginSvg.default());
        }
        return plugins;
    });
}
exports.loadCustomerPlugin = loadCustomerPlugin;
const loadConfig = (workspaceRoot, path) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield loadCustomerPlugin(workspaceRoot, path);
    return res;
});
exports.loadConfig = loadConfig;
//# sourceMappingURL=util.js.map