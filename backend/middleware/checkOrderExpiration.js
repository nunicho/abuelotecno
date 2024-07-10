import asyncHandler from "./asyncHandler.js"; // Asegúrate de importar asyncHandler o el manejador de errores que uses
import Order from "../models/orderModel.js"; // Asegúrate de que la ruta sea correcta

const checkOrderExpiration = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id || req.body.id; // Puedes ajustar según las rutas y los cuerpos de las solicitudes

  if (orderId) {
    const order = await Order.findById(orderId);

    if (order) {
      const now = new Date();
      const createdAtPlus2Minutes = new Date(
        order.createdAt.getTime() + 2 * 60 * 1000
      ); // 2 minutos para testeo

      if (!order.isPaid && now > createdAtPlus2Minutes) {
        order.isExpired = true;
        await order.save();
      }
    }
  }

  next();
});

export default checkOrderExpiration;
