import { addBackground, addBullets, addCard, addCodeBlock, addFooter, addHeader } from "./theme.mjs";

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Docker And Compose", "Containerizing the API and local experiment services");

  addCard(slide, ctx, {
    x: 56,
    y: 150,
    w: 352,
    h: 226,
    title: "Dockerfile",
    body: "The service image packages the FastAPI app and the trained model artifact. We also fixed a real deployment issue by installing libgomp1 so the LightGBM runtime loads correctly inside the container.",
  });
  addBullets(slide, ctx, {
    x: 80,
    y: 272,
    w: 300,
    size: 16,
    items: [
      "Image builds from repo root",
      "Model artifact copied into container",
      "Health and prediction endpoints exposed on port 8000",
    ],
  });

  addCodeBlock(slide, ctx, {
    x: 438,
    y: 150,
    w: 330,
    h: 178,
    title: "Docker commands",
    lines: [
      "docker build -t mlops-final:local .",
      "docker run -p 8000:8000 mlops-final:local",
      "docker compose up --build",
    ],
  });
  addCard(slide, ctx, {
    x: 794,
    y: 150,
    w: 370,
    h: 178,
    title: "docker-compose.yml",
    body: "Compose launches both the API service and MLflow UI locally, making it easy to demonstrate model serving and experiment tracking together.",
  });

  addCodeBlock(slide, ctx, {
    x: 438,
    y: 356,
    w: 726,
    h: 178,
    title: "What we verified",
    lines: [
      "GET /health -> {\"status\":\"ok\"}",
      "GET /metadata -> feature list + model path",
      "POST /predict -> real probability output",
      "docker compose config -> validated",
    ],
  });

  addFooter(slide, ctx);
  return slide;
}
