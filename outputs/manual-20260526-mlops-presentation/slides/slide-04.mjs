import { addBackground, addBullets, addCard, addFooter, addHeader, addMetricChip, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Train/Test Split And Evaluation Metric", "How we set up the supervised learning experiment");

  addCard(slide, ctx, {
    x: 56,
    y: 140,
    w: 550,
    h: 310,
    title: "Data Split",
    body: "We split the dataset into training and test partitions before any modeling. The training split was used for AutoML search and final pipeline fitting, while the held-out test split was reserved for deployment-side validation.",
  });
  addBullets(slide, ctx, {
    x: 80,
    y: 250,
    w: 490,
    size: 17,
    items: [
      "Train set for AutoML search and retraining",
      "Test set for final unbiased validation",
      "Same test labels reused for changed-data comparison",
    ],
  });

  addCard(slide, ctx, {
    x: 642,
    y: 140,
    w: 570,
    h: 310,
    title: "Why ROC-AUC",
    body: "ROC-AUC measures ranking quality across thresholds, which is valuable for imbalanced binary classification. It tells us whether high-risk cases receive higher scores than low-risk cases, even before setting one hard decision threshold.",
  });
  addBullets(slide, ctx, {
    x: 668,
    y: 250,
    w: 510,
    size: 17,
    items: [
      "Primary metric: ROC-AUC",
      "Secondary metrics: F1 and Accuracy",
      "Accuracy alone can look good on imbalanced data",
    ],
  });

  addMetricChip(slide, ctx, { x: 90, y: 490, w: 180, h: 66, label: "Primary", value: "ROC-AUC" });
  addMetricChip(slide, ctx, { x: 294, y: 490, w: 180, h: 66, label: "Secondary", value: "F1" });
  addMetricChip(slide, ctx, { x: 498, y: 490, w: 180, h: 66, label: "Secondary", value: "Accuracy" });
  ctx.addText(slide, {
    text: "Evaluation logic lives in the notebook and is reused when validating original and changed test data.",
    x: 710,
    y: 500,
    w: 460,
    h: 42,
    size: 16,
    color: palette.subink,
  });

  addFooter(slide, ctx);
  return slide;
}
