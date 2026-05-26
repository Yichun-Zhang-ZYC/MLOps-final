import { addBackground, addBullets, addCard, addCodeBlock, addFooter, addHeader } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "FastAPI Model Serving", "Deployed inference layer for local container and Kubernetes use");

  addCard(slide, ctx, {
    x: 56,
    y: 146,
    w: 350,
    h: 250,
    title: "Why FastAPI",
    body: "FastAPI turns the trained model artifact into a reproducible inference service. This gives the project a clean deployment boundary instead of keeping prediction logic only inside the notebook.",
  });
  addBullets(slide, ctx, {
    x: 80,
    y: 258,
    w: 300,
    size: 17,
    items: [
      "GET /health",
      "GET /metadata",
      "GET /sample-payload",
      "POST /predict",
      "POST /predict-batch",
    ],
  });

  addCodeBlock(slide, ctx, {
    x: 434,
    y: 146,
    w: 730,
    h: 240,
    title: "Sample request",
    lines: [
      "curl -X POST http://localhost:8000/predict \\",
      "  -H 'Content-Type: application/json' \\",
      "  -d '{",
      "    \"features\": [20000,2,2,1,24,2,2,-1,-1,-2,-2,3913,3102,689,0,0,0,0,689,0,0,0,0]",
      "  }'",
    ],
  });
  addCodeBlock(slide, ctx, {
    x: 434,
    y: 408,
    w: 730,
    h: 124,
    title: "Verified response",
    lines: [
      "{\"prediction\": 1,",
      " \"default_probability\": 0.7182714474800603}",
    ],
  });

  addFooter(slide, ctx);
  return slide;
}
