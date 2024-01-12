import { ApplicationBuilderOptions } from '@angular-devkit/build-angular';
interface ICustomApplicationBuilderOptions extends ApplicationBuilderOptions {
    customEsbuildConfig?: string;
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ICustomApplicationBuilderOptions & import("@angular-devkit/core").JsonObject>;
export default _default;
