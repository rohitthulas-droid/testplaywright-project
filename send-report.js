const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

async function sendReport() {
  // Path to your Playwright HTML report file
  const reportPath = path.join(__dirname, "playwright-report", "index.html");

  // Check if HTML report exists
  if (!fs.existsSync(reportPath)) {
    console.error("HTML report not found. Run tests first.");
    return;
  }

  // Configure your email settings (Gmail example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourEmail@gmail.com",
      pass: "your-app-password"  // Use Gmail App Password
    }
  });

  const mailOptions = {
    from: "yourEmail@gmail.com",
    to: "product.manager@example.com",
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Report sent successfully: " + info.response);
  } catch (error) {
    console.error("Error sending report:", error);
  }
}

sendReport();
