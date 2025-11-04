import { errHandler } from "@/helpers/errHandler";
import * as nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name) {
      throw { message: "Name is Required", status: 400 };
    }

    if (!email) {
      throw { message: "Email is Required", status: 400 };
    }

    if (!message) {
      throw { message: "Message is Required", status: 400 };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "fredly210307@gmail.com",
      subject: `Message from ${name}`,
      text: `${message}`,
      html: `
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
    });

    await transporter.sendMail({
      from: `"Fredly Marvander" <${process.env.EMAIL_USER}>`,
      to: `${email}`,
      subject: `Thanks for reaching out!`,
      text: `Hi ${name},\n\nThanks for your message! I’ve received it and will get back to you soon.\n\n— Fredly`,
    });

    return Response.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
