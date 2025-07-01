import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

// Function to remove Unicode emoji characters and other problematic characters
function stripUnicodeEmojis(text: string): string {
  // Remove emoji characters (most are in the range U+1F000–U+1F9FF)
  // Also remove other problematic Unicode characters like ✅ (U+2705) and ⚠️ (U+26A0)
  return text.replace(/[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2700}-\u{27BF}]|[\u{FE0F}]/gu, '')
}

export async function exportProjectReport(resultText: string) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const title = "IT Project Risk Report"
  const titleSize = 24
  const bodySize = 12
  const titleWidth = boldFont.widthOfTextAtSize(title, titleSize)

  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y: height - 4 * titleSize,
    font: boldFont,
    size: titleSize,
    color: rgb(0, 0.47, 0.84), // primary color
  })

  // Strip Unicode emojis from the result text to avoid encoding issues
  const cleanedResultText = stripUnicodeEmojis(resultText)
  const lines = cleanedResultText.split("\n")
  let yPosition = height - 150

  lines.forEach((line) => {
    // Additional safety check to strip any remaining problematic characters
    const cleanLine = stripUnicodeEmojis(line)
    page.drawText(cleanLine, {
      x: 50,
      y: yPosition,
      font: font,
      size: bodySize,
      color: rgb(0, 0, 0),
      lineHeight: 20,
    })
    yPosition -= 20
  })

  const pdfBytes = await pdfDoc.save()

  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "risk_report.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
