from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

from app.optimize_route import optimize_route, LatLng
from app.predict_demand import predict_demand

app = FastAPI(title="AgriConnect AI Service")


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-service"}


class PredictDemandRequest(BaseModel):
    crop: str
    region: str
    historicalPrices: Optional[List[float]] = []


class PredictDemandResponse(BaseModel):
    crop: str
    predictedDemandKg: float
    predictedPricePerKg: float
    confidence: float


@app.post("/predict-demand", response_model=PredictDemandResponse)
def predict_demand_endpoint(req: PredictDemandRequest):
    return predict_demand(req.crop, req.region, req.historicalPrices)


class OptimizeRouteRequest(BaseModel):
    origin: LatLng
    destination: LatLng
    waypoints: Optional[List[LatLng]] = []


class OptimizeRouteResponse(BaseModel):
    distanceKm: float
    etaMinutes: float
    waypoints: List[LatLng]


@app.post("/optimize-route", response_model=OptimizeRouteResponse)
def optimize_route_endpoint(req: OptimizeRouteRequest):
    return optimize_route(req.origin, req.destination, req.waypoints or [])
