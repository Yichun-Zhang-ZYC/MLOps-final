import { addBackground, addBullets, addCard, addFooter, addHeader, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx, { tone: "#F8F4EC" });
  addHeader(slide, ctx, "Project Files, Demo Script, And Team Split", "Closing slide for repo navigation and speaking order");

  addCard(slide, ctx, {
    x: 56,
    y: 146,
    w: 382,
    h: 310,
    title: "Core Files To Show",
    body: "Use these files during the live demo or Q&A.",
  });
  addBullets(slide, ctx, {
    x: 80,
    y: 220,
    w: 320,
    size: 16,
    items: [
      "notebooks/credit_default_mlops_workflow.ipynb",
      "src/app/main.py",
      "Dockerfile and docker-compose.yml",
      "k8s/*.yaml",
      ".github/workflows/ci.yml and cd.yml",
      "reports/*.html",
    ],
  });

  addCard(slide, ctx, {
    x: 462,
    y: 146,
    w: 350,
    h: 310,
    title: "Suggested Speaking Order",
    body: "1. Dataset + EDA\n2. Metric + AutoML\n3. Original vs changed test validation\n4. FastAPI + Docker + Kubernetes\n5. GitHub CI/CD + repo walkthrough",
  });

  addCard(slide, ctx, {
    x: 836,
    y: 146,
    w: 376,
    h: 310,
    title: "Member Contribution Placeholder",
    body: "Member 1: dataset/EDA\nMember 2: notebook pipeline + AutoML\nMember 3: FastAPI + Docker + Kubernetes\nMember 4: CI/CD + monitoring + presentation\n\nReplace these lines with your actual names before presenting.",
  });

  ctx.addText(slide, {
    text: "GitHub: github.com/Yichun-Zhang-ZYC/MLOps-final",
    x: 56,
    y: 506,
    w: 440,
    h: 24,
    size: 17,
    bold: true,
    color: palette.ink,
  });
  ctx.addText(slide, {
    text: "Speaker notes are provided separately so each slide already has a short script.",
    x: 56,
    y: 542,
    w: 680,
    h: 24,
    size: 15,
    color: palette.subink,
  });
  addFooter(slide, ctx);
  return slide;
}
