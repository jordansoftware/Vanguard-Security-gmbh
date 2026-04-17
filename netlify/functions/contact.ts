import { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, company, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const destination = process.env.CONTACT_DESTINATION || user;

    if (!host || !user || !pass) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Mail server configuration missing" }),
      };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      to: destination,
      replyTo: email,
      subject: `[Netlify] Neue Anfrage von ${name} - ${company || 'Einzelperson'}`,
      text: `Name: ${name}\nFirma: ${company || 'N/A'}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html: `
        <h3>Neue Kontaktanfrage (via Netlify)</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Firma:</strong> ${company || 'N/A'}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error in contact function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};

export { handler };
