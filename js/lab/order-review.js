// Sample order records for testing.
const orders = [
  // Your existing order objects
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
// Get the orders that meet our review criteria.
const reviewOrders = getOrdersNeedingReview(orders);

// Loop through all orders to build the table, including those that don't need review. 
for (const order of orders) {
  const row = document.createElement('tr');
  // Check whether the current order is flagged for review. 
  // THis works because both arrays reference the same order objects.
  const needsReview = reviewOrders.includes(order);
  const idCell = document.createElement('td');
  const statusCell = document.createElement('td');
  const paidCell = document.createElement('td');
  const inventoryAvailableCell = document.createElement('td');
  const daysWaitingCell = document.createElement('td');

  console.log(order.id, needsReview);

  idCell.textContent = order.id;
  row.appendChild(idCell);

  statusCell.textContent = order.status;
  row.appendChild(statusCell);

  paidCell.textContent = order.paid ? 'Paid' : 'Unpaid';

  row.appendChild(paidCell);

  inventoryAvailableCell.textContent = order.inventoryAvailable
    ? 'Available'
    : 'Unavailable';
  row.appendChild(inventoryAvailableCell);

  daysWaitingCell.textContent = `${order.daysWaiting} ${order.daysWaiting === 1 ? 'day' : 'days'}`;

  row.appendChild(daysWaitingCell);

  tableBody.appendChild(row);
}

// Return the orders that meet the business rules for review. 
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
console.log(getOrdersNeedingReview(orders));
