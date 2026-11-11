/**
 * Represents an order in the review console.
 *
 * @typedef {Object} Order
 * @property {number} id - Unique order identifier.
 * @property {'pending'|'processing'|'shipped'} status - Current order status.
 * @property {boolean} paid - Whether the order has been paid.
 * @property {boolean} inventoryAvailable - Whether inventory is available.
 * @property {number} daysWaiting - Number of days the order has been waiting.
 */

// Sample order records for testing.
/** @type {Order[]} */
const orders = [
  {
    id: 103,
    status: 'pending',
    paid: false,
    inventoryAvailable: false,
    daysWaiting: 3,
  },
  {
    id: 401,
    status: 'processing',
    paid: true,
    inventoryAvailable: true,
    daysWaiting: 5,
  },
  {
    id: 345,
    status: 'shipped',
    paid: true,
    inventoryAvailable: true,
    daysWaiting: 1,
  },
  {
    id: 125,
    status: 'pending',
    paid: true,
    inventoryAvailable: false,
    daysWaiting: 4,
  },
  {
    id: 118,
    status: 'shipped',
    paid: true,
    inventoryAvailable: true,
    daysWaiting: 7,
  },
];
// Get the table body where the order rows will be inserted.
const tableBody = document.querySelector('tbody');

const reviewOnlyCheckbox = document.querySelector('#review-only');

// Update the displayed orders when the review-only checkbox changes.
reviewOnlyCheckbox.addEventListener('change', (event) => {
  const ordersToDisplay = event.target.checked ? reviewOrders : orders;
  renderOrders(ordersToDisplay);
});

/**
 * Identifies paid orders that are pending or processing and require review
 * because inventory is unavailable or they have been waiting at least 3 days.
 *
 * @param {Order[]} orders - The list of orders to evaluate.
 * @returns {Order[]} The order objects that meet the review criteria.
 */
function getOrdersNeedingReview(orders) {
  const ordersNeedingReview = [];

  for (const order of orders) {
    // Flag paid orders that are pending or processing and have
    // unavailable inventory or have been waiting at least 3 days.
    if (
      order.paid &&
      (order.status === 'pending' || order.status === 'processing') &&
      (!order.inventoryAvailable || order.daysWaiting >= 3)
    ) {
      ordersNeedingReview.push(order);
    }
  }
  return ordersNeedingReview;
}

/**
 * Collects all applicable review reasons for an individual order.
 * Checks for unavailable inventory and delays of 3 or more days.
 * Does not determine whether the order qualifies for review.
 *
 * @param {Order} order - The order to evaluate.
 * @returns {string[]} An array of applicable review reasons.
 */
function getReviewReasons(order) {
  const reasons = [];
  if (!order.inventoryAvailable) {
    reasons.push('Inventory unavailable');
  }
  if (order.daysWaiting >= 3) {
    reasons.push('Processing Delay');
  }
  return reasons;
}

// Get the orders that meet our review criteria.
const reviewOrders = getOrdersNeedingReview(orders);

/**
 * Renders the provided orders in the HTML table.
 * Clears existing rows before creating new ones and highlights
 * orders that meet the review criteria.
 *
 * @param {Order[]} ordersToDisplay - The orders to display in the table.
 * @returns {void} This function updates the DOM without returning a value.
 */
function renderOrders(ordersToDisplay) {
  // Clear existing rows before rendering the current selection.
  tableBody.replaceChildren();
  // Create a table row for each order in the provided array/
  for (const order of ordersToDisplay) {
    const row = document.createElement('tr');
    // Check whether the current order is flagged for review.
    // This works because both arrays reference the same order objects.
    const needsReview = reviewOrders.includes(order);
    // Mark orders that require attention so they can be styled differently.
    if (needsReview) {
      row.classList.add('needs-review');
    }
    const idCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const paidCell = document.createElement('td');
    const inventoryAvailableCell = document.createElement('td');
    const daysWaitingCell = document.createElement('td');
    const reviewCell = document.createElement('td');

    idCell.textContent = order.id;

    statusCell.textContent = order.status;

    reviewCell.textContent = needsReview
      ? getReviewReasons(order).join(', ')
      : '—';

    paidCell.textContent = order.paid ? 'Paid' : 'Unpaid';

    inventoryAvailableCell.textContent = order.inventoryAvailable
      ? 'Available'
      : 'Unavailable';

    daysWaitingCell.textContent = `${order.daysWaiting} ${order.daysWaiting === 1 ? 'day' : 'days'}`;

    // Add the cells in the same order as the table headers.
    row.appendChild(idCell);
    row.appendChild(statusCell);
    row.appendChild(paidCell);
    row.appendChild(inventoryAvailableCell);
    row.appendChild(daysWaitingCell);
    row.appendChild(reviewCell);

    // Add the completed row to the table.
    tableBody.appendChild(row);
  }
}

renderOrders(orders);
