export async function loadCustomerPlugin<T>(path: string): Promise<T> {
    const a = await require(path).plugins;
    return a;
}