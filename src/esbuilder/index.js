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
const path = require("path");
const loadConfig = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, util_1.loadCustomerPlugin)(path);
});
function buildCustomApplication(options, context) {
    if (options.customEsbuildConfig) {
        const currWorkDir = context.workspaceRoot;
        const espluginPath = path.resolve(currWorkDir, options.customEsbuildConfig);
        const esbuildConfig = loadConfig(espluginPath);
        return (0, build_angular_1.buildApplication)(options, context, esbuildConfig.plugins);
    }
    return (0, build_angular_1.buildApplication)(options, context);
}
exports.default = (0, architect_1.createBuilder)(buildCustomApplication);
//# sourceMappingURL=index.js.map