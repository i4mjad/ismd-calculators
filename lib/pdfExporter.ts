import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

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

  const lines = resultText.split("\n")
  let yPosition = height - 150

  lines.forEach((line) => {
    page.drawText(line, {
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

  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "risk_report.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
