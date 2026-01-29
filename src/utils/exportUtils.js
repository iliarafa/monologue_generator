import { jsPDF } from 'jspdf';

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsPDF(text, styleLabel) {
  const doc = new jsPDF();
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(text, 170);
  let y = 20;
  doc.setFontSize(16);
  doc.text(`Monologue — ${styleLabel}`, 20, y);
  y += 12;
  doc.setFontSize(11);
  for (const line of lines) {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 20, y);
    y += 6;
  }
  doc.save(`monologue-${slug(styleLabel)}.pdf`);
}

export function exportAsDOC(text, styleLabel) {
  const html = `<html><head><meta charset="utf-8"><title>Monologue</title></head><body><h1>Monologue &mdash; ${styleLabel}</h1><pre style="font-family:Georgia,serif;white-space:pre-wrap;">${text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  triggerDownload(blob, `monologue-${slug(styleLabel)}.doc`);
}

export function exportAsCSV(text, styleLabel) {
  const escapedText = '"' + text.replace(/"/g, '""') + '"';
  const csv = `"Style","Monologue"\n"${styleLabel}",${escapedText}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, `monologue-${slug(styleLabel)}.csv`);
}

export async function shareMonologue(text, styleLabel) {
  const shareData = {
    title: `Monologue — ${styleLabel}`,
    text: text,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (e) {
      // User cancelled or share failed, fall back to clipboard
      await navigator.clipboard.writeText(text);
    }
  } else {
    await navigator.clipboard.writeText(text);
  }
}
