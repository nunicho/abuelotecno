import express from "express";
const router = express.Router();
import {
  createPromotion,
  getPromotions,
  addProductPromotion,
  removeProductPromotion,
  changeDiscountPromotion,
  changeDatePromotion,
  togglePromotion,
  deletePromotion,
} from "../controllers/promotionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createPromotion) // Crear promoción
  .get(protect, admin, getPromotions); // Obtener todas las promociones

router.route("/:id").delete(protect, admin, deletePromotion); // Eliminar promoción

router.route("/:id/togglePromotion").put(protect, admin, togglePromotion); // Activar/Desactivar promoción

router.route("/:id/addProduct").put(protect, admin, addProductPromotion); // Agregar producto a promoción

router.route("/:id/removeProduct").put(protect, admin, removeProductPromotion); // Eliminar producto de promoción

router
  .route("/:id/changeDiscount")
  .put(protect, admin, changeDiscountPromotion); // Cambiar porcentaje de descuento de promoción

router.route("/:id/changeDate").put(protect, admin, changeDatePromotion); // Cambiar fechas de promoción

export default router;
