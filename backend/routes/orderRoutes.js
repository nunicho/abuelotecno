import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkOrderExpiration from "../middleware/checkOrderExpiration.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders)
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, checkOrderExpiration, deleteOrder);
router.route("/:id/pay").put(protect, checkOrderExpiration, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, checkOrderExpiration, updateOrderToDelivered);


export default router;



/*
import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders)
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);;
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);


export default router;
*/