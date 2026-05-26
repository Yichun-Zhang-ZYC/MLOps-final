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
