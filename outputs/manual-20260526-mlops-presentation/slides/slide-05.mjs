import { addBackground, addFooter, addHeader, palette } from "./theme.mjs";

function stage(slide, ctx, { x, y, w, h, title, body, fill }) {
  ctx.addShape(slide, { x, y, w, h, fill, line: ctx.line(fill, 0) });
  ctx.addText(slide, {
    text: title,
    x: x + 18,
    y: y + 16,
    w: w - 36,
    h: 24,
    size: 18,
    bold: true,
    color: fill === palette.dark ? "#FFFFFF" : palette.ink,
  });
  ctx.addText(slide, {
    text: body,
    x: x + 18,
    y: y + 48,
    w: w - 36,
    h: h - 60,
    size: 14,
    color: fill === palette.dark ? "#DCE6F2" : palette.subink,
  });
}

function arrow(slide, ctx, x1, y, x2) {
  ctx.addShape(slide, {
    geometry: "chevron",
    x: x1,
    y: y - 12,
    w: x2 - x1,
    h: 24,
    fill: palette.accent,
    line: ctx.line(palette.accent, 0),
  });
}

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx, { tone: "#F7F5EF" });
  addHeader(slide, ctx, "Training Pipeline With MLflow And AutoML", "Notebook-first pipeline used for training and experiment tracking");

  stage(slide, ctx, {
    x: 60, y: 190, w: 210, h: 180, fill: palette.dark,
    title: "1. Load + Prepare",
    body: "Fetch UCI dataset, rename columns, clean numeric features, and define target.",
  });
  stage(slide, ctx, {
    x: 300, y: 190, w: 210, h: 180, fill: palette.tealSoft,
    title: "2. Split + EDA",
    body: "Create train/test partitions and run exploratory plots before model search.",
  });
  stage(slide, ctx, {
    x: 540, y: 190, w: 210, h: 180, fill: palette.accentSoft,
    title: "3. FLAML AutoML",
    body: "Search across candidate learners including LightGBM, Random Forest, XGBoost, and SGD.",
  });
  stage(slide, ctx, {
    x: 780, y: 190, w: 210, h: 180, fill: "#DDE7F7",
    title: "4. MLflow Logging",
    body: "Track the chosen estimator, metrics, parameters, and artifacts inside mlruns/.",
  });
  stage(slide, ctx, {
    x: 1020, y: 190, w: 180, h: 180, fill: "#E7F3E8",
    title: "5. Export + Reports",
    body: "Save model pipeline and monitoring artifacts for downstream serving and validation.",
  });

  arrow(slide, ctx, 270, 280, 300);
  arrow(slide, ctx, 510, 280, 540);
  arrow(slide, ctx, 750, 280, 780);
  arrow(slide, ctx, 990, 280, 1020);

  ctx.addText(slide, {
    text: "Key files: notebooks/credit_default_mlops_workflow.ipynb, models/credit_default_pipeline.joblib, mlruns/, artifacts/flaml.log",
    x: 60,
    y: 460,
    w: 1090,
    h: 22,
    size: 14,
    color: palette.subink,
  });
  ctx.addText(slide, {
    text: "This pipeline is notebook-driven for the class deliverable, but it still produces reusable artifacts for service deployment.",
    x: 60,
    y: 500,
    w: 1140,
    h: 24,
    size: 17,
    color: palette.ink,
  });
  addFooter(slide, ctx);
  return slide;
}
