// Hardcoded JSON shaped exactly like docs/api-contracts.md — filled in next,
// once we go through the contract function by function. Pages currently use
// their own inline placeholder data instead of importing from here; that
// switches over to these functions as we build them out.
//
// Once backend endpoints are live, each function body swaps from returning
// a hardcoded value to a `fetch(\`${import.meta.env.VITE_BACKEND_URL}/...\`)`
// call — same signature, same shape, so call sites don't change.

export async function getFarmerListings() {
  throw new Error('getFarmerListings: not implemented yet')
}

export async function getMarketplaceListings() {
  throw new Error('getMarketplaceListings: not implemented yet')
}

export async function getOrderStatus(orderId) {
  throw new Error('getOrderStatus: not implemented yet')
}

export async function getPriceHistory(cropId) {
  throw new Error('getPriceHistory: not implemented yet')
}
