import os
from io import BytesIO
from functools import lru_cache
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, Field
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score


MODEL_PATH = Path(os.getenv("MODEL_PATH", "models/credit_default_pipeline.joblib"))
FEATURE_COLUMNS = [
    "LIMIT_BAL",
    "SEX",
    "EDUCATION",
    "MARRIAGE",
    "AGE",
    "PAY_0",
    "PAY_2",
    "PAY_3",
    "PAY_4",
    "PAY_5",
    "PAY_6",
    "BILL_AMT1",
    "BILL_AMT2",
    "BILL_AMT3",
    "BILL_AMT4",
    "BILL_AMT5",
    "BILL_AMT6",
    "PAY_AMT1",
    "PAY_AMT2",
    "PAY_AMT3",
    "PAY_AMT4",
    "PAY_AMT5",
    "PAY_AMT6",
]


class PredictionRequest(BaseModel):
    features: list[float | int] = Field(..., min_length=23, max_length=23)


class BatchPredictionRequest(BaseModel):
    rows: list[PredictionRequest]


@lru_cache(maxsize=1)
def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            "Model artifact not found at models/credit_default_pipeline.joblib. "
            "Run the notebook first to train and export the model."
        )
    return joblib.load(MODEL_PATH)


app = FastAPI(title="Credit Default Prediction API", version="0.1.0")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/metadata")
def metadata():
    return {
        "model_path": str(MODEL_PATH),
        "feature_columns": FEATURE_COLUMNS,
        "feature_count": len(FEATURE_COLUMNS),
    }


@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        model = load_model()
        frame = pd.DataFrame([request.features], columns=FEATURE_COLUMNS)
        prediction = int(model.predict(frame)[0])
        probability = float(model.predict_proba(frame)[0][1])
        return {"prediction": prediction, "default_probability": probability}
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/predict-batch")
def predict_batch(request: BatchPredictionRequest):
    try:
        model = load_model()
        rows = [row.features for row in request.rows]
        frame = pd.DataFrame(rows, columns=FEATURE_COLUMNS)
        predictions = model.predict(frame).tolist()
        probabilities = model.predict_proba(frame)[:, 1].tolist()
        return {
            "predictions": [int(value) for value in predictions],
            "default_probabilities": [float(value) for value in probabilities],
        }
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/evaluate-file")
async def evaluate_file(
    file: UploadFile = File(...),
    target_column: str = Form("target"),
):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    try:
        contents = await file.read()
        frame = pd.read_csv(BytesIO(contents))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read CSV file: {exc}") from exc

    missing_columns = [column for column in FEATURE_COLUMNS if column not in frame.columns]
    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"CSV is missing required feature columns: {missing_columns}",
        )

    if target_column not in frame.columns:
        raise HTTPException(
            status_code=400,
            detail=f"CSV is missing target column: {target_column}",
        )

    try:
        model = load_model()
        feature_frame = frame[FEATURE_COLUMNS]
        predictions = model.predict(feature_frame).tolist()
        probabilities = model.predict_proba(feature_frame)[:, 1]
        labels = frame[target_column]
        return {
            "filename": file.filename,
            "row_count": len(feature_frame),
            "target_column": target_column,
            "metrics": {
                "roc_auc": float(roc_auc_score(labels, probabilities)),
                "f1": float(f1_score(labels, predictions)),
                "accuracy": float(accuracy_score(labels, predictions)),
            },
        }
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=f"Could not calculate metrics: {exc}") from exc


@app.get("/sample-payload")
def sample_payload():
    return {
        "features": [
            20000,
            2,
            2,
            1,
            24,
            2,
            2,
            -1,
            -1,
            -2,
            -2,
            3913,
            3102,
            689,
            0,
            0,
            0,
            0,
            689,
            0,
            0,
            0,
            0,
        ]
    }
