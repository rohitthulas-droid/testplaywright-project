const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

async function sendReport() {
  const reportPath = path.join(__dirname, "playwright-report", "index.html");

  if (!fs.existsSync(reportPath)) {
    console.error("HTML report not found. Run tests first.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || "rohitthulase@zohomail.in",
      pass: process.env.EMAIL_PASSWORD // ← Get from environment variable
    },
    logger: true,
    debug: true
  });

  const mailOptions = {
    from: `"QA Automation" <${process.env.EMAIL_USER || "rohitthulase@zohomail.in"}>`,
    to: process.env.EMAIL_TO || "rohitthulase@gmail.com",
    subject: "Playwright Test Report",
    text: "Hi,\n\nPlease find attached the latest Playwright Test Report.\n\nRegards,\nQA Automation",
    attachments: [
      {
        filename: "Playwright-Report.html",
        path: reportPath
      }
    ]
  };

  try {
    await transporter.verify(); // ← IMPORTANT
    console.log("SMTP connection verified");

    const info = await transporter.sendMail(mailOptions);
    console.log("Report sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending report:", error);
  }
}

sendReport();
