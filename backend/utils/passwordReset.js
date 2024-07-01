import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Método para generar tokens de restablecimiento de contraseña
const generateResetToken = (user) => {
  const tokenObject = {
    email: user.email,
    id: user._id,
  };
  const resetToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {
    expiresIn: "1h", // 1 hora
  });
  return resetToken;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "conta.alonso@gmail.com",
    pass: "zksknememwcscioe",
  },
});

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetLink = `${process.env.RESET_LINK}?token=${resetToken}`;
    console.log(resetLink)
  const mailOptions = {
    from: "conta.alonso@gmail.com",
    to: email,
    subject: "Restablecimiento de contraseña",
    text: `Haga clic en este enlace para restablecer su contraseña: ${resetLink}
    
    El Token es ${resetToken}
    
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Enlace de restablecimiento de contraseña enviado a ${email}`);
  } catch (error) {
    console.error(`Error al enviar email a ${email}:`, error.message);
    throw new Error("Error al enviar el correo electrónico");
  }
};

export { generateResetToken, sendResetPasswordEmail };
    

/*
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Método para generar tokens de restablecimiento de contraseña
const generateResetToken = (user) => {
  const tokenObject = {
    email: user.email,
    id: user._id,
  };
  const resetToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {
    expiresIn: "1h", // 1 hora
  });
  return resetToken;
};

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetLink = `${process.env.RESET_LINK}?token=${resetToken}`;
    console.log(resetLink)
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Restablecimiento de contraseña",
    text: `Haga clic en este enlace para restablecer su contraseña: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Enlace de restablecimiento de contraseña enviado a ${email}`);
  } catch (error) {
    console.error(`Error al enviar email a ${email}:`, error.message);
    throw new Error("Error al enviar el correo electrónico");
  }
};

export { generateResetToken, sendResetPasswordEmail };
    
*/