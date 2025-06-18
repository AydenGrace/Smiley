import nodemailer from "nodemailer";
import { emailConfirmation } from "./templates/email-confirmation.template.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactForm = async (content) => {
  const mailOptions = {
    priority: "high",
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_MAIL,
    subject: "Nouveau formulaire de contact : " + content.subject,
    html: `<p>De: ${content.name}<br/>Email : ${
      content.email
    }<br/>Daté du : ${content.date.toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    })}<br/><br/>${content.content}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'inscription",
    html: emailConfirmation(
      `${process.env.FRONT}/verifyEmail/${token}`,
      `${process.env.FRONT}/unsubscribe`,
      `${process.env.FRONT}/privacy-policy`
    ),
  };

  await transporter.sendMail(mailOptions);
};

export const sendValidationAccount = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Inscription validée",
    html: `<p>Bienvenue sur notre site ! Cliquez sur le lien pour vous connecter : <a href="${process.env.FRONT}/login">Se connecter</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendInvalideToken = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Problème lors de la validation de votre compte.",
    html: `<p>Le temps d'inscription a expiré. Cliquez sur le lien pour vous inscrire à nouveau : <a href="${process.env.FRONT}/register">S'inscrire</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendChangePwd = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Demande de changement de mot de passe.",
    html: `<p>Votre demande de changement de mot de passe a bien été reçue. Si cette demande n'est pas de votre initiative, merci d'ignorer le lien suivant : <a href="${process.env.FRONT}/change_password/${token}">Modifier mon mot de passe</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
