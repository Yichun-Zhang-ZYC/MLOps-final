import { addBackground, addBullets, addCard, addFooter, addHeader, palette } from "./theme.mjs";

function miniFlow(slide, ctx, { x, y, labels, fills }) {
  labels.forEach((label, index) => {
    const boxX = x + index * 180;
    ctx.addShape(slide, {
      x: boxX,
      y,
      w: 150,
      h: 70,
      fill: fills[index],
      line: ctx.line(fills[index], 0),
    });
    ctx.addText(slide, {
      text: label,
      x: boxX + 14,
      y: y + 18,
      w: 122,
      h: 34,
      size: 16,
      bold: true,
      color: fills[index] === palette.dark ? "#FFFFFF" : palette.ink,
      align: "center",
    });
    if (index < labels.length - 1) {
      ctx.addShape(slide, {
        geometry: "chevron",
        x: boxX + 150,
        y: y + 21,
        w: 30,
        h: 28,
        fill: palette.accent,
        line: ctx.line(palette.accent, 0),
      });
    }
  });
}

export async function addSlide(presentation, ctx) {
  const slide = presentation.slides.add();
  addBackground(slide, ctx);
  addHeader(slide, ctx, "Kubernetes And GitHub CI/CD", "Operationalizing the service after local validation");

  addCard(slide, ctx, {
    x: 56,
    y: 148,
    w: 540,
    h: 188,
    title: "Kubernetes",
    body: "We created namespace, configmap, deployment, service, HPA, and kustomization manifests. After enabling Docker Desktop Kubernetes, we applied the manifests and confirmed the deployment rolled out successfully.",
  });
  addBullets(slide, ctx, {
    x: 82,
    y: 248,
    w: 490,
    size: 16,
    items: [
      "kubectl apply -k k8s",
      "kubectl rollout status deployment/credit-default-api -n mlops-final",
      "Service exposed and pod reached Ready state",
    ],
  });

  addCard(slide, ctx, {
    x: 620,
    y: 148,
    w: 590,
    h: 188,
    title: "GitHub Actions",
    body: "The CI workflow installs dependencies, runs pytest, checks committed artifacts, and smoke-tests Docker build logic. The CD workflow builds and pushes the image to GHCR when main is updated.",
  });
  addBullets(slide, ctx, {
    x: 646,
    y: 248,
    w: 540,
    size: 16,
    items: [
      "ci.yml -> tests + artifact checks + Docker build smoke",
      "cd.yml -> login to GHCR + build/push image",
      "Latest CI and CD runs finished successfully",
    ],
  });

  miniFlow(slide, ctx, {
    x: 118,
    y: 402,
    labels: ["Push", "CI", "Build Image", "CD / GHCR", "Deploy"],
    fills: [palette.dark, palette.tealSoft, palette.accentSoft, "#DDE7F7", "#E7F3E8"],
  });

  addFooter(slide, ctx);
  return slide;
}
