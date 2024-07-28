import express from "express";
const router = express.Router();
import {
  createPromotion,
  getPromotions,
  getPromotionById,
  updatePromotion,
  addProductPromotion,
  removeProductPromotion,
  changeDiscountPromotion,
  changeDatePromotion,
  togglePromotion,
  deletePromotion,
} from "../controllers/promotionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createPromotion) // Crear promoción
  .get(protect, admin, getPromotions); // Obtener todas las promociones

router
  .route("/:id")
  .get(protect, admin, checkObjectId, getPromotionById) // Obtener promoción por ID
  .put(protect, admin, checkObjectId, updatePromotion) // Actualizar promoción
  .delete(protect, admin, checkObjectId, deletePromotion); // Eliminar promoción

router
  .route("/:id/togglePromotion")
  .put(protect, admin, checkObjectId, togglePromotion); // Activar/Desactivar promoción

router
  .route("/:id/addProduct")
  .put(protect, admin, checkObjectId, addProductPromotion); // Agregar producto a promoción

router
  .route("/:id/removeProduct")
  .put(protect, admin, checkObjectId, removeProductPromotion); // Eliminar producto de promoción

router
  .route("/:id/changeDiscount")
  .put(protect, admin, checkObjectId, changeDiscountPromotion); // Cambiar porcentaje de descuento de promoción

router
  .route("/:id/changeDate")
  .put(protect, admin, checkObjectId, changeDatePromotion); // Cambiar fechas de promoción

export default router;
