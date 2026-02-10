import { createWooCommerceTools, WooCommerceAPI } from "./woo-tools"

// Initialize WooCommerce API client
const getWooAPI = (): WooCommerceAPI | null => {
  const url = process.env.WOOCOMMERCE_URL
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET

  if (!url || !consumerKey || !consumerSecret) {
    console.warn(
      "⚠️ WooCommerce API credentials not configured. Please set WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET environment variables."
    )
    return null
  }

  return new WooCommerceAPI({
    url,
    consumerKey,
    consumerSecret,
  })
}

const wooAPI = getWooAPI()

// Create all WooCommerce tools using createWooCommerceTools from create-injected-and-logged-tool
// This returns an object with all the properly configured tools
const allTools = createWooCommerceTools(wooAPI)

// Export individual tools for AI SDK to use with validateUIMessages
export const wooTools = {
  getProducts: allTools.getProducts,
  getOrders: allTools.getOrders,
  getCustomers: allTools.getCustomers,
  getReports: allTools.getReports,
  getStoreOverview: allTools.getStoreOverview,
  getData: allTools.getData,
  createCard: allTools.createCard,
  createChart: allTools.createChart,
  createTable: allTools.createTable,
  codeInterpreter: allTools.codeInterpreter,
  createMap: allTools.createMap,
}

export { WooCommerceAPI }
