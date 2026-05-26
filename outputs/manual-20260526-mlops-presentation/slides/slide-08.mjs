import { addBackground, addBullets, addCard, addFooter, addHeader, addMetricChip, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Changed Test Data And Monitoring", "We deliberately changed two features and checked both metrics and monitoring");

  addCard(slide, ctx, {
    x: 56,
    y: 150,
    w: 380,
    h: 240,
    title: "Injected Feature Changes",
    body: "We modified at least two feature values in the held-out test set to simulate distribution shift before re-running inference.",
  });
  addBullets(slide, ctx, {
    x: 82,
    y: 252,
    w: 320,
    size: 17,
    items: [
      "LIMIT_BAL multiplied by 1.8",
      "PAY_0 shuffled across rows",
      "Labels kept unchanged for fair comparison",
    ],
  });

  addMetricChip(slide, ctx, { x: 482, y: 164, w: 180, h: 68, label: "Changed ROC-AUC", value: "0.7011", fill: "#FCE7E7", valueColor: palette.bad });
  addMetricChip(slide, ctx, { x: 682, y: 164, w: 150, h: 68, label: "Changed F1", value: "0.2125", fill: "#FCE7E7", valueColor: palette.bad });
  addMetricChip(slide, ctx, { x: 852, y: 164, w: 170, h: 68, label: "Changed Acc.", value: "0.7628", fill: "#FEF3C7", valueColor: palette.warn });

  addCard(slide, ctx, {
    x: 482,
    y: 260,
    w: 338,
    h: 150,
    title: "Metric Effect",
    body: "All three metrics degraded versus the original test set. The sharpest drop was in F1, which shows the model became less reliable at identifying default cases after feature drift.",
  });
  addCard(slide, ctx, {
    x: 846,
    y: 260,
    w: 366,
    h: 150,
    title: "Monitoring Effect",
    body: "Evidently reports flagged drift between the reference test distribution and the changed data. This matched the metric drop and validated our monitoring setup.",
  });
  addCard(slide, ctx, {
    x: 482,
    y: 434,
    w: 730,
    h: 108,
    title: "Artifacts",
    body: "reports/test_monitoring_report.html and reports/changed_test_monitoring_report.html provide side-by-side evidence for stable versus shifted input behavior.",
  });

  addFooter(slide, ctx);
  return slide;
}
