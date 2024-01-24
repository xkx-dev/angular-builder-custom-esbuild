import { createBuilder } from "@angular-devkit/architect";
import { DevServerBuilderOptions, DevServerBuilderOutput, executeDevServerBuilder } from "@angular-devkit/build-angular";

interface ICustomDevServerBuilderOptions extends DevServerBuilderOptions {
    customEsbuildConfig?: string,
}

export default createBuilder<ICustomDevServerBuilderOptions, DevServerBuilderOutput>(executeDevServerBuilder);
