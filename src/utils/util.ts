export async function loadCustomerPlugin<T>(path: string): Promise<T> {
    // Todo: currently, only support config with commonJs
    const a = await require(path).plugins;
    return a;
}