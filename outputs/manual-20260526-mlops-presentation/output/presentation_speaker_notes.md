# Credit Default MLOps Project Speaker Notes

## Slide 1
This project uses the UCI credit default dataset to build an end-to-end MLOps workflow. We combined the class requirements with extra engineering components: MLflow, FLAML AutoML, FastAPI, Docker, Kubernetes, and GitHub CI/CD.

## Slide 2
Our dataset is the UCI Default of Credit Card Clients dataset. The target is whether a client defaults on the next payment, so this is a binary classification problem that works well for both model evaluation and production-style monitoring.

## Slide 3
In EDA, we saw class imbalance, with non-default cases dominating. That is important because accuracy alone can be misleading. We also found that repayment status features such as PAY_0 carry strong predictive signal.

## Slide 4
We split the data into train and test before modeling. Our primary metric is ROC-AUC because it measures ranking quality under imbalance, while F1 and accuracy are included as supporting metrics.

## Slide 5
Our training pipeline is notebook-first. It loads and renames the dataset, performs EDA, runs FLAML AutoML on the training data, logs artifacts with MLflow, and exports the final model pipeline for deployment.

## Slide 6
FLAML evaluated multiple candidate learners and selected LightGBM, listed as lgbm in the logs. This makes sense for structured tabular credit-risk data because boosted trees capture nonlinear patterns effectively.

## Slide 7
On the original held-out test data, the deployed pipeline achieved ROC-AUC 0.7786, F1 0.4707, and accuracy 0.8193. The model performs reasonably well, but F1 shows that minority-class prediction remains more challenging than accuracy suggests.

## Slide 8
To simulate drift, we changed two features in the test set: we multiplied LIMIT_BAL by 1.8 and shuffled PAY_0. Metrics fell to ROC-AUC 0.7011, F1 0.2125, and accuracy 0.7628, and the Evidently monitoring reports reflected this shift.

## Slide 9
We deployed the model with FastAPI so predictions can be served through an API instead of only inside the notebook. The service includes health, metadata, sample payload, single prediction, and batch prediction endpoints.

## Slide 10
We containerized the API with Docker and added docker-compose for local orchestration with MLflow. During validation we hit a real deployment issue with LightGBM and fixed it by installing libgomp1 in the container image.

## Slide 11
We also created Kubernetes manifests for namespace, configmap, deployment, service, HPA, and kustomization. On the GitOps side, GitHub Actions CI runs tests and artifact checks, while CD builds and pushes the image to GHCR.

## Slide 12
This final slide is our repo map and speaking handoff. We show the notebook, service code, container and Kubernetes files, workflow files, and monitoring reports, then explain which teammate handled each part.
