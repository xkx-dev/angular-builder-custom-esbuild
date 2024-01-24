import { DevServerBuilderOptions } from "@angular-devkit/build-angular";
interface ICustomDevServerBuilderOptions extends DevServerBuilderOptions {
    customEsbuildConfig?: string;
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ICustomDevServerBuilderOptions & import("@angular-devkit/core").JsonObject>;
export default _default;
