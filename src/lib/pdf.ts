import puppeteer from "puppeteer";

export async function generatePdfFromHtml(
  html: string,
  filename = "resume.pdf"
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "18mm",
        right: "16mm",
        bottom: "15mm",
        left: "16mm",
      },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export function pdfResponse(buffer: Buffer, filename: string) {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
