import { format } from 'date-fns';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generatePDF(equipo: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleSize = 18;
  const textSize = 12;
  const lineHeight = 20;
  const tableTop = height - 120;
  const cellPadding = 5;
  const cellHeight = 25;
  const cellWidth = 200;

  const title = "Datos del Equipo";
  const titleWidth = font.widthOfTextAtSize(title, titleSize);
  const titleX = (width - titleWidth) / 2;
  page.drawText(title, {
    x: titleX,
    y: height - 60,
    size: titleSize,
    font,
    color: rgb(0, 0, 0),
  });

  const fechaFormateada = format(new Date(equipo.fecha), 'yyyy-MM-dd');

  const data = [
    ["Nombre del PC", equipo.pcName],
    ["Número de Serie", equipo.numSerie],
    ["Unidad", equipo.unidad],
    ["Tecnico asignado", equipo.autor],
    ["Fecha", fechaFormateada],
  ];


  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const y = tableTop - rowIndex * cellHeight;
      const x = 50 + cellIndex * cellWidth;

      page.drawRectangle({
        x,
        y: y - cellHeight + cellPadding,
        width: cellWidth,
        height: cellHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      // Dibujar texto de la celda
      page.drawText(cell, {
        x: x + cellPadding,
        y: y - lineHeight + cellPadding,
        size: textSize,
        font,
        color: rgb(0, 0, 0),
      });
    });
  });

  const appsTitleY = tableTop - data.length * cellHeight - 40;
  page.drawText(`Aplicaciones Instaladas:`, {
    x: 50,
    y: appsTitleY,
    size: textSize,
    font,
    color: rgb(0, 0, 0),
  });

  if (Array.isArray(equipo.aplicaciones) && equipo.aplicaciones.length > 0) {
    equipo.aplicaciones
      .filter((app: any) => app.instalada === true)
      .forEach((app: any, index: number) => {
        page.drawText(`- ${app.aplicacion.nombre}`, {
          x: 70,
          y: appsTitleY - (index + 1) * lineHeight,
          size: textSize,
          font,
          color: rgb(0, 0, 0),
        });
      });
  } else {
    page.drawText(`No hay aplicaciones instaladas.`, {
      x: 70,
      y: appsTitleY - lineHeight,
      size: textSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


export function downloadPDF(pdfBytes: Uint8Array, fileName: string) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
