import { addBackground, addBullets, addCard, addFooter, addHeader, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Dataset And Prediction Target", "Why we chose this dataset and what the model predicts");

  addCard(slide, ctx, {
    x: 56,
    y: 138,
    w: 372,
    h: 250,
    title: "Chosen Dataset",
    body: "UCI Default of Credit Card Clients. This is a structured tabular dataset with billing, repayment status, payment amount, demographics, and a clear binary outcome variable.",
  });
  addCard(slide, ctx, {
    x: 452,
    y: 138,
    w: 372,
    h: 250,
    title: "Outcome Variable",
    body: "Target = whether a client will default on the next payment. The prediction task is binary classification, which fits directly with monitoring and deployment for real-time inference.",
  });
  addCard(slide, ctx, {
    x: 848,
    y: 138,
    w: 364,
    h: 250,
    title: "Why It Fits MLOps",
    body: "It has enough features to make model selection meaningful, supports AutoML comparison, and makes drift testing easy because we can perturb financially meaningful features.",
  });

  ctx.addText(slide, {
    text: "Example feature groups",
    x: 56,
    y: 430,
    w: 240,
    h: 24,
    size: 18,
    bold: true,
    color: palette.ink,
  });
  addBullets(slide, ctx, {
    x: 56,
    y: 462,
    w: 1120,
    size: 18,
    items: [
      "Credit limit: LIMIT_BAL",
      "Repayment status history: PAY_0 to PAY_6",
      "Billing amount history: BILL_AMT1 to BILL_AMT6",
      "Repayment amount history: PAY_AMT1 to PAY_AMT6",
      "Basic profile features: SEX, EDUCATION, MARRIAGE, AGE",
    ],
  });
  addFooter(slide, ctx);
  return slide;
}
