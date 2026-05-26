import { addBackground, addCard, addFooter, addHeader, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "EDA Highlights", "Quick exploratory analysis before training");

  await ctx.addImage(slide, {
    path: `${ctx.assetDir}/eda_class_balance.png`,
    x: 56,
    y: 140,
    w: 610,
    h: 420,
    fit: "contain",
    alt: "EDA class balance chart",
  });

  addCard(slide, ctx, {
    x: 700,
    y: 150,
    w: 500,
    h: 126,
    title: "Observation 1",
    body: "The dataset is imbalanced: non-default cases are the majority. This is why we did not rely only on accuracy when evaluating the model.",
  });
  addCard(slide, ctx, {
    x: 700,
    y: 294,
    w: 500,
    h: 126,
    title: "Observation 2",
    body: "Repayment status variables such as PAY_0 and PAY_2 show strong signal. Credit limit and recent bill amounts also help separate riskier clients.",
  });
  addCard(slide, ctx, {
    x: 700,
    y: 438,
    w: 500,
    h: 108,
    title: "Data Prep",
    body: "We renamed the raw UCI columns X1 to X23 into business-readable names to make analysis, API payloads, and deployment documentation easier to follow.",
  });

  ctx.addText(slide, {
    text: "Notebook source: notebooks/credit_default_mlops_workflow.ipynb",
    x: 56,
    y: 586,
    w: 520,
    h: 20,
    size: 12,
    color: palette.subink,
  });
  addFooter(slide, ctx);
  return slide;
}
