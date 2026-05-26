import { addBackground, addCard, addFooter, addHeader, addMetricChip } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Original Test Validation", "Metrics from the held-out test split using the deployed pipeline");

  await ctx.addImage(slide, {
    path: `${ctx.assetDir}/metrics_comparison.png`,
    x: 56,
    y: 148,
    w: 560,
    h: 410,
    fit: "contain",
    alt: "Metric comparison chart",
  });

  addMetricChip(slide, ctx, { x: 680, y: 170, w: 170, h: 72, label: "ROC-AUC", value: "0.7786" });
  addMetricChip(slide, ctx, { x: 872, y: 170, w: 150, h: 72, label: "F1", value: "0.4707" });
  addMetricChip(slide, ctx, { x: 1044, y: 170, w: 150, h: 72, label: "Accuracy", value: "0.8193" });

  addCard(slide, ctx, {
    x: 680,
    y: 276,
    w: 514,
    h: 110,
    title: "Interpretation",
    body: "The model ranks default risk reasonably well and achieves strong overall accuracy, but F1 reminds us that minority-class identification remains harder than the aggregate accuracy suggests.",
  });
  addCard(slide, ctx, {
    x: 680,
    y: 404,
    w: 514,
    h: 122,
    title: "Deployment Check",
    body: "The same trained pipeline was exported and later loaded by the FastAPI service, so these evaluation numbers are aligned with the artifact used for inference.",
  });

  addFooter(slide, ctx);
  return slide;
}
