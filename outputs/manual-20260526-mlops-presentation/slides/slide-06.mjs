import { addBackground, addCard, addFooter, addHeader, addMetricChip, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "AutoML Result And Selected Algorithm", "FLAML searched multiple learners and selected the strongest model");

  addMetricChip(slide, ctx, { x: 70, y: 150, w: 220, h: 76, label: "Selected Model", value: "LightGBM" });
  addMetricChip(slide, ctx, { x: 310, y: 150, w: 220, h: 76, label: "FLAML Name", value: "lgbm" });
  addMetricChip(slide, ctx, { x: 550, y: 150, w: 220, h: 76, label: "Search Time", value: "~120s", fill: palette.accentSoft, valueColor: palette.warn });
  addMetricChip(slide, ctx, { x: 790, y: 150, w: 220, h: 76, label: "Task Type", value: "Binary CLS", fill: "#DDE7F7", valueColor: palette.ink });

  addCard(slide, ctx, {
    x: 70,
    y: 264,
    w: 360,
    h: 238,
    title: "Learners In Search Space",
    body: "FLAML evaluated lgbm, rf, xgboost, extra_tree, xgb_limitdepth, sgd, and lrl1. LightGBM reached the best validation error among the candidates and was retrained as the final pipeline.",
  });
  addCard(slide, ctx, {
    x: 452,
    y: 264,
    w: 360,
    h: 238,
    title: "Why This Winner Makes Sense",
    body: "Gradient-boosted trees often perform strongly on structured tabular credit-risk features. They capture nonlinear interactions without requiring deep manual feature engineering.",
  });
  addCard(slide, ctx, {
    x: 834,
    y: 264,
    w: 378,
    h: 238,
    title: "Evidence In Repo",
    body: "Notebook output includes the FLAML training log. MLflow stores experiment tracking in mlruns/, and the final exported model is committed for reproducible serving and grading.",
  });

  ctx.addText(slide, {
    text: "Notebook output line: Best estimator from FLAML: lgbm",
    x: 70,
    y: 538,
    w: 480,
    h: 20,
    size: 14,
    color: palette.subink,
  });
  addFooter(slide, ctx);
  return slide;
}
