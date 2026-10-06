import joblib
import numpy as np
import pandas as pd
from pathlib import Path


# Project root directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Model path
MODEL_PATH = PROJECT_ROOT / "models" / "house_price_model.joblib"


def load_model():
    """Load the trained house price model."""
    return joblib.load(MODEL_PATH)


def predict_price(model, house_data):
    """
    Predict house price.

    Parameters
    ----------
    model : trained model
        Trained XGBoost pipeline.

    house_data : dict
        House features.

    Returns
    -------
    float
        Predicted price in INR Lakhs.
    """

    input_df = pd.DataFrame([house_data])

    # Model predicts log(1 + price)
    log_prediction = model.predict(input_df)[0]

    # Convert back to original INR Lakhs scale
    prediction = np.expm1(log_prediction)

    return prediction


if __name__ == "__main__":

    print("Loading house price model...")

    model = load_model()

    print("Model loaded successfully!")
    print()

    sample_house = {
        "City": "Mumbai",
        "Locality_Type": "Premium",
        "Property_Type": "Apartment",
        "BHK": 3,
        "Bathrooms": 3,
        "Super_Area_SqFt": 1800,
        "Carpet_Area_SqFt": 1400,
        "Floor_Number": 10,
        "Total_Floors": 20,
        "Age_of_Property": 5,
        "Furnishing_Status": "Furnished",
        "Parking": 1,
        "Lift_Available": 1,
        "Gated_Community": 1,
        "Distance_to_Metro_km": 2.0,
        "Distance_to_City_Center_km": 8.0
    }

    predicted_price = predict_price(
        model,
        sample_house
    )

    print("Sample House")
    print("------------")

    for feature, value in sample_house.items():
        print(f"{feature}: {value}")

    print()
    print(
        f"Predicted House Price: "
        f"₹{predicted_price:.2f} Lakhs"
    )