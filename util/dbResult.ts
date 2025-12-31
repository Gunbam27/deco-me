export function unwrap<T>(result: { data: T | null; error: any; }): T {
    if (result.error) throw result.error;
    return result.data as T;
}