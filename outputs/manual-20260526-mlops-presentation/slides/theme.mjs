export const palette = {
  bg: "#F5F1E8",
  ink: "#14213D",
  subink: "#415A77",
  accent: "#D97706",
  accentSoft: "#F3D3A1",
  teal: "#0F766E",
  tealSoft: "#CDEAE7",
  card: "#FFFDF8",
  line: "#D6CCBC",
  good: "#1D7A46",
  warn: "#A16207",
  bad: "#B42318",
  dark: "#0B1F33",
};

export function addBackground(slide, ctx, opts = {}) {
  const tone = opts.tone ?? palette.bg;
  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: ctx.H, fill: tone });
  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: 18, fill: palette.accent });
  ctx.addShape(slide, { x: 0, y: ctx.H - 20, w: ctx.W, h: 20, fill: palette.dark });
}

export function addHeader(slide, ctx, title, subtitle = "") {
  ctx.addText(slide, {
    text: title,
    x: 56,
    y: 36,
    w: 820,
    h: 56,
    size: 28,
    bold: true,
    color: palette.ink,
    face: ctx.fonts.title,
  });
  if (subtitle) {
    ctx.addText(slide, {
      text: subtitle,
      x: 56,
      y: 88,
      w: 900,
      h: 28,
      size: 14,
      color: palette.subink,
    });
  }
}

export function addFooter(slide, ctx, label = "MLOps Final Project") {
  ctx.addText(slide, {
    text: `${label}  |  Slide ${String(ctx.slideNumber).padStart(2, "0")}`,
    x: 56,
    y: ctx.H - 18,
    w: 420,
    h: 14,
    size: 10,
    color: "#FFFFFF",
  });
}

export function addCard(slide, ctx, { x, y, w, h, fill = palette.card, stroke = palette.line, title, body }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(stroke, 1),
  });
  if (title) {
    ctx.addText(slide, {
      text: title,
      x: x + 18,
      y: y + 16,
      w: w - 36,
      h: 26,
      size: 17,
      bold: true,
      color: palette.ink,
    });
  }
  if (body) {
    ctx.addText(slide, {
      text: body,
      x: x + 18,
      y: y + 50,
      w: w - 36,
      h: h - 64,
      size: 14,
      color: palette.subink,
    });
  }
}

export function addBullets(slide, ctx, { x, y, w, items, size = 18, color = palette.ink, gap = 8 }) {
  const lineHeight = size + gap;
  const text = items.map((item) => `• ${item}`).join("\n");
  ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h: lineHeight * items.length + 8,
    size,
    color,
  });
}

export function addMetricChip(slide, ctx, { x, y, w, h, label, value, fill = palette.tealSoft, valueColor = palette.teal }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(fill, 0),
  });
  ctx.addText(slide, {
    text: label,
    x: x + 14,
    y: y + 10,
    w: w - 28,
    h: 18,
    size: 12,
    color: palette.subink,
    bold: true,
  });
  ctx.addText(slide, {
    text: value,
    x: x + 14,
    y: y + 28,
    w: w - 28,
    h: 24,
    size: 21,
    color: valueColor,
    bold: true,
  });
}

export function addCodeBlock(slide, ctx, { x, y, w, h, lines, title = "" }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill: palette.dark,
    line: ctx.line(palette.dark, 0),
  });
  if (title) {
    ctx.addText(slide, {
      text: title,
      x: x + 16,
      y: y + 10,
      w: w - 32,
      h: 16,
      size: 11,
      color: "#D9E2EC",
      bold: true,
      face: ctx.fonts.mono,
    });
  }
  ctx.addText(slide, {
    text: Array.isArray(lines) ? lines.join("\n") : lines,
    x: x + 16,
    y: y + 30,
    w: w - 32,
    h: h - 40,
    size: 13,
    color: "#F8FAFC",
    face: ctx.fonts.mono,
  });
}
