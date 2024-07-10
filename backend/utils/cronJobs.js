import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";

dotenv.config();

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Función para actualizar el campo isExpired
const updateExpiredOrders = async () => {
  const expirationTime = new Date(Date.now() - 2 * 60 * 1000); // 2 minutos atrás

  try {
    await Order.updateMany(
      {
        createdAt: { $lt: expirationTime },
        isPaid: false,
        isExpired: false,
      },
      { isExpired: true }
    );
    console.log("Ordenes actualizadas a isExpired = true");
  } catch (error) {
    console.error("Error actualizando ordenes expiradas:", error);
  }
};

// Programar la tarea cron para ejecutarse cada minuto
cron.schedule("* * * * *", () => {
  updateExpiredOrders();
});
