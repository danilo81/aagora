'use server';

// Order is persisted in localStorage on the client side (key: `item-order-${projectId}`)
// This stub exists so the import in page.tsx resolves.
export async function reorderProjectItems(
    _projectId: string,
    _orderedItemIds: string[]
): Promise<{ success: boolean }> {
    return { success: true };
}
