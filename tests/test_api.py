from fastapi.testclient import TestClient

from src.app.main import app


client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_metadata():
    response = client.get("/metadata")
    assert response.status_code == 200
    body = response.json()
    assert body["feature_count"] == 23
    assert len(body["feature_columns"]) == 23


def test_sample_payload():
    response = client.get("/sample-payload")
    assert response.status_code == 200
    assert len(response.json()["features"]) == 23


def test_evaluate_file_csv_upload():
    sample = client.get("/sample-payload").json()["features"]
    low_risk_sample = [
        200000,
        2,
        2,
        1,
        30,
        0,
        0,
        0,
        0,
        0,
        0,
        20000,
        18000,
        16000,
        14000,
        12000,
        10000,
        5000,
        5000,
        5000,
        5000,
        5000,
        5000,
    ]
    columns = client.get("/metadata").json()["feature_columns"]
    header = ",".join(columns + ["target"])
    rows = [
        ",".join(str(value) for value in sample + [1]),
        ",".join(str(value) for value in low_risk_sample + [0]),
    ]
    csv_body = f"{header}\n" + "\n".join(rows) + "\n"
    response = client.post(
        "/evaluate-file",
        files={"file": ("sample.csv", csv_body, "text/csv")},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["filename"] == "sample.csv"
    assert body["row_count"] == 2
    assert body["target_column"] == "target"
    assert set(body["metrics"]) == {"roc_auc", "f1", "accuracy"}
