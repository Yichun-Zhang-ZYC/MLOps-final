import { addBackground, addBullets, addCard, addFooter, palette } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx, { tone: "#F8F4EC" });

  ctx.addShape(slide, { x: 56, y: 78, w: 510, h: 420, fill: palette.dark, line: ctx.line(palette.dark, 0) });
  ctx.addText(slide, {
    text: "Credit Default\nMLOps Pipeline",
    x: 86,
    y: 118,
    w: 420,
    h: 120,
    size: 30,
    bold: true,
    color: "#FFFFFF",
    face: ctx.fonts.title,
  });
  ctx.addText(slide, {
    text: "AutoML, MLflow tracking, FastAPI serving, Docker, Kubernetes, and GitHub CI/CD",
    x: 86,
    y: 252,
    w: 400,
    h: 70,
    size: 16,
    color: "#D6E4F0",
  });
  addBullets(slide, ctx, {
    x: 86,
    y: 344,
    w: 400,
    size: 16,
    color: "#F8FAFC",
    items: [
      "Dataset: UCI default of credit card clients",
      "Primary metric: ROC-AUC",
      "Best model: LightGBM from FLAML AutoML",
    ],
  });

  addCard(slide, ctx, {
    x: 610,
    y: 92,
    w: 600,
    h: 166,
    title: "Course Requirements Covered",
    body: "EDA, train/test split, metric selection, pipeline training, deployed inference, monitoring, original test validation, changed-test validation, and GitHub project delivery.",
  });
  addCard(slide, ctx, {
    x: 610,
    y: 278,
    w: 600,
    h: 120,
    title: "Extra MLOps Stack",
    body: "FastAPI service, Docker image + docker-compose, Kubernetes manifests, and GitHub Actions CI/CD.",
  });
  addCard(slide, ctx, {
    x: 610,
    y: 418,
    w: 600,
    h: 100,
    title: "Repository",
    body: "github.com/Yichun-Zhang-ZYC/MLOps-final",
  });

  ctx.addText(slide, {
    text: "Team presentation deck",
    x: 56,
    y: 540,
    w: 250,
    h: 24,
    size: 14,
    color: palette.subink,
  });
  addFooter(slide, ctx);
  return slide;
}
