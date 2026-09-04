/**
 * API Mock Service
 * This file acts as the single source of truth for mock data,
 * strictly mirroring the structures in docs/api-contracts.md.
 */

// Placeholder implementation.
// Once you provide the contracts, we will populate this!

export const mockApi = {
  login: async (credentials) => {
    console.log("Mock Login", credentials);
    return { token: "mock-jwt-token", user: { id: 1, role: "FARMER" } };
  },

  getProducts: async () => {
    return [
      { id: 1, name: "Organic Tomatoes", farmer: "Ramesh Kumar", location: "Punjab", price: 35, unit: "kg", isDirect: true },
    ];
  },

  getDashboardData: async () => {
    return { revenue: 45200, orders: 12, listings: 4 };
  },

  getOrderTracking: async (orderId) => {
    return {
      orderId,
      status: "IN_TRANSIT",
      aiRouted: true,
      eta: "15 mins"
    };
  }
};
