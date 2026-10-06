from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# --------------------------------------------------
# Paths
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent

MODEL_PATH = PROJECT_ROOT / "models" / "house_price_model.joblib"


# --------------------------------------------------
# Load model
# --------------------------------------------------

model = joblib.load(MODEL_PATH)


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="House Price Prediction API",
    description="Machine Learning API for predicting Indian house prices.",
    version="1.0.0"
)

app.mount("/static", StaticFiles(directory=PROJECT_ROOT / "app" / "static"), name="static")

# --------------------------------------------------
# Input schema
# --------------------------------------------------

class HouseInput(BaseModel):

    City: str
    Locality_Type: str
    Property_Type: str

    BHK: int
    Bathrooms: int

    Super_Area_SqFt: float
    Carpet_Area_SqFt: float

    Floor_Number: int
    Total_Floors: int
    Age_of_Property: int

    Furnishing_Status: str

    Parking: int
    Lift_Available: int
    Gated_Community: int

    Distance_to_Metro_km: float
    Distance_to_City_Center_km: float


# --------------------------------------------------
# Root endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return FileResponse(
        PROJECT_ROOT / "app" / "static" / "index.html"
    )

# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict_price(house: HouseInput):

    # Convert request data to DataFrame
    input_data = pd.DataFrame([
        house.model_dump()
    ])

    # Model predicts log(1 + price)
    log_prediction = model.predict(input_data)[0]

    # Convert back to original Lakhs scale
    predicted_price_lakhs = np.expm1(log_prediction)

    # Convert Lakhs to INR
    predicted_price_inr = predicted_price_lakhs * 100000

    return {
        "predicted_price_lakhs": round(
            float(predicted_price_lakhs), 2
        ),
        "predicted_price_inr": round(
            float(predicted_price_inr), 2
        )
    }