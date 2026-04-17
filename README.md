# VANGUARD SECURITY GmbH - Premium Security Services & Site Logistics

A modern, high-performance, and SEO-optimized web application for **VANGUARD SECURITY GmbH**, specializing in site protection and construction logistics in Germany.

## 🚀 Features
- **High-End Corporate Design:** Dark, clean, and professional interface using Tailwind CSS and Framer Motion.
- **Smart Contact Form:** Integrated quote request form.
- **Serverless Architecture:** Ready for **Netlify** deployment with a Netlify Function for email management.
- **SEO Optimization:** Comprehensive meta tags, H1-H3 semantic structure, and Open Graph for WhatsApp/Social Media previews.
- **Mobile-First Compatibility:** Smooth user experience across all devices.

## 🛠 Technologies
- **Frontend:** React 18, TypeScript, Vite.
- **Styling:** Tailwind CSS.
- **Animations:** Motion (Framer Motion).
- **Backend (Emails):** Nodemailer with Strato SMTP support.
- **Deployment:** Netlify (via `netlify.toml` and `/netlify/functions`).

## ⚙️ Deployment Configuration (Netlify)

To make the contact form work on Netlify, you must configure the following environment variables in your Netlify administration panel:

| Variable | Value |
| :--- | :--- |
| `SMTP_HOST` | `smtp.strato.de` |
| `SMTP_PORT` | `465` (or 587) |
| `SMTP_USER` | Your Strato email address |
| `SMTP_PASS` | Your email password |
| `CONTACT_DESTINATION` | The address that will receive inquiries |

## 📦 Project Structure
- `/src`: React components and application logic.
- `/netlify/functions`: Secure backend logic for sending emails.
- `index.html`: Entry point with SEO and Favicon configuration.
- `netlify.toml`: Redirects and build commands configuration.

## 🏗 Local Installation
1. `npm install`
2. `npm run dev` to launch the development server.
3. `npm run build` to generate production files in `/dist`.

---
*Developed for VANGUARD SECURITY GmbH - Expertise & Excellence in Security.*
