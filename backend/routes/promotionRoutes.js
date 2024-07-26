import express from "express";
const router = express.Router();
import {
  createPromotion,
  getPromotions,
  updatePromotion,
  activatePromotion,
  deletePromotion,
} from "../controllers/promotionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createPromotion) // Crear promoción
  .get(protect, admin, getPromotions); // Obtener todas las promociones

router
  .route("/:id")
  .put(protect, admin, updatePromotion) // Actualizar promoción
  .delete(protect, admin, deletePromotion); // Eliminar promoción

router.route("/:id/activate").put(protect, admin, activatePromotion); // Activar/Desactivar promoción

export default router;
