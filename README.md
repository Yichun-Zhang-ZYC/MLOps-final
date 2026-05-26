# MLOps Final Project

End-to-end notebook-first MLOps project for predicting credit-card default with:
- `MLflow` for experiment tracking
- `FLAML AutoML` for model selection
- `FastAPI` for model serving
- `Docker` and `docker-compose` for containerized local deployment
- `Kubernetes` manifests for cluster deployment
- `GitHub Actions` for CI/CD

Repository: [Yichun-Zhang-ZYC/MLOps-final](https://github.com/Yichun-Zhang-ZYC/MLOps-final)

## Problem statement

We predict whether a credit-card customer will default next month using the UCI `Default of Credit Card Clients` dataset.

Outcome variable:
- `default.payment.next.month`

Primary metric:
- `ROC-AUC`

Secondary metrics:
- `F1`
- `Accuracy`

## Dataset

Source:
- UCI Machine Learning Repository dataset `id=350`

Feature engineering approach:
- Keep the original structured tabular features
- Rename raw UCI columns `X1` to `X23` into business-readable names such as `LIMIT_BAL`, `PAY_0`, and `BILL_AMT1`

## Project workflow

1. Load the dataset in the notebook.
2. Perform EDA and visualize class balance and feature behavior.
3. Split data into train and test sets.
4. Train with `FLAML AutoML` and track the run in `MLflow`.
5. Export the best pipeline to `models/credit_default_pipeline.joblib`.
6. Serve the model with `FastAPI`.
7. Run monitoring on:
   - original test data
   - changed test data with at least two feature modifications
8. Package the service with Docker.
9. Prepare Kubernetes manifests for deployment.
10. Automate test and image delivery with GitHub Actions.

## Repository structure

- `notebooks/credit_default_mlops_workflow.ipynb`: EDA, training, MLflow logging, AutoML, evaluation, changed-test analysis, and monitoring
- `src/app/main.py`: FastAPI inference application
- `tests/test_api.py`: API tests
- `models/credit_default_pipeline.joblib`: exported trained model
- `reports/`: monitoring HTML reports
- `artifacts/flaml.log`: AutoML search log
- `docker-compose.yml`: local stack for API + MLflow
- `k8s/`: Kubernetes deployment resources
- `.github/workflows/ci.yml`: CI workflow
- `.github/workflows/cd.yml`: CD workflow for publishing container images

## Results from the executed notebook

Original test data:
- `ROC-AUC = 0.7786`
- `F1 = 0.4707`
- `Accuracy = 0.8193`

Changed test data:
- `ROC-AUC = 0.7011`
- `F1 = 0.2125`
- `Accuracy = 0.7628`

AutoML winner:
- `LightGBM (lgbm)`

Interpretation:
- The modified test set degraded all metrics
- Monitoring reports show drift after changing `LIMIT_BAL` and shuffling `PAY_0`
- This supports the MLOps observation that data drift can reduce deployed model quality

## Notebook

Main notebook:
- [notebooks/credit_default_mlops_workflow.ipynb](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/notebooks/credit_default_mlops_workflow.ipynb)

What it includes:
- EDA
- train/test split
- metric definition
- MLflow experiment tracking
- FLAML AutoML search
- chosen algorithm
- test-set validation
- changed-test validation
- monitoring report generation

Monitoring outputs:
- [reports/test_monitoring_report.html](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/reports/test_monitoring_report.html)
- [reports/changed_test_monitoring_report.html](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/reports/changed_test_monitoring_report.html)

## MLflow

MLflow is used for:
- experiment tracking
- logging model parameters and metrics
- storing the trained sklearn pipeline artifact

Tracking directory:
- `mlruns/`

Run locally:

```bash
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter notebook
```

Open the tracking UI with Docker Compose:

```bash
docker compose up mlflow
```

Then open:
- [http://localhost:5001](http://localhost:5001)

## FastAPI model serving

Application file:
- [src/app/main.py](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/src/app/main.py)

Available endpoints:
- `GET /health`
- `GET /metadata`
- `GET /sample-payload`
- `POST /predict`
- `POST /predict-batch`

Run locally:

```bash
source .venv/bin/activate
uvicorn src.app.main:app --reload
```

Sample request:

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "features": [20000,2,2,1,24,2,2,-1,-1,-2,-2,3913,3102,689,0,0,0,0,689,0,0,0,0]
  }'
```

## Docker

Files:
- [Dockerfile](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/Dockerfile)
- [docker-compose.yml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/docker-compose.yml)

Build image manually:

```bash
docker build -t mlops-final:local .
```

Run container manually:

```bash
docker run --rm -p 8000:8000 mlops-final:local
```

Run the local stack with Compose:

```bash
docker compose up --build
```

Compose services:
- `api`: FastAPI inference service
- `mlflow`: MLflow tracking server UI

## Kubernetes

Kubernetes resources:
- [k8s/namespace.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/namespace.yaml)
- [k8s/configmap.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/configmap.yaml)
- [k8s/deployment.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/deployment.yaml)
- [k8s/service.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/service.yaml)
- [k8s/hpa.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/hpa.yaml)
- [k8s/kustomization.yaml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/k8s/kustomization.yaml)

Deploy:

```bash
kubectl apply -k k8s
```

What is configured:
- isolated namespace
- config via `ConfigMap`
- deployment with readiness and liveness probes
- `LoadBalancer` service
- autoscaling policy with HPA

## GitHub Actions CI/CD

CI workflow:
- [ci.yml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/.github/workflows/ci.yml)

CI responsibilities:
- install dependencies
- run `pytest`
- verify model artifact exists
- verify monitoring report files exist
- build Docker image as a smoke test

CD workflow:
- [cd.yml](/Users/yichunzhang/Desktop/0uchi_courses/2MLOps/MLOps/final/.github/workflows/cd.yml)

CD responsibilities:
- log into `GHCR`
- build Docker image
- tag image from branch, tag, and commit SHA
- push image to `ghcr.io/<owner>/mlops-final`

To enable GitHub package publishing:
- keep the repository on GitHub
- ensure Actions has package write permission
- push to `main` or manually run the workflow

## Verification completed locally

Completed:
- notebook executed successfully
- trained model artifact exported
- monitoring reports generated
- API tests passed with `pytest`

Current local verification command:

```bash
source .venv/bin/activate
pytest
```

## Presentation checklist

Your PPT should now be able to show:
- EDA charts from the notebook
- why `ROC-AUC` was chosen
- the MLflow + FLAML pipeline
- AutoML results and the selected `LightGBM` model
- original test metrics
- changed test metrics
- monitoring HTML reports
- FastAPI serving layer
- Docker and Compose deployment
- Kubernetes deployment design
- GitHub Actions CI/CD pipeline
- GitHub repository link
- member contribution slide

## Member contribution template

Fill this in before submission:

- Member 1: notebook EDA, metric choice, and AutoML analysis
- Member 2: FastAPI serving and Docker packaging
- Member 3: Kubernetes deployment and GitHub Actions CI/CD
- Member 4: monitoring analysis, changed-test experiment, and presentation
