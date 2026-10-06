# 🏠 Indian House Price Prediction

An end-to-end machine learning application that predicts residential property prices in India based on property characteristics such as city, BHK, bathrooms, area, furnishing status, parking, floor information, and proximity to metro stations and city centers.

The project combines **data analysis, machine learning, model optimization, and a FastAPI-powered web interface** into a complete ML application.

---

## 🚀 Project Overview

Real-estate prices depend on multiple factors, including location, property size, number of rooms, age of the property, furnishing status, and accessibility.

This project uses the **Indian Urban House Price Prediction** dataset containing approximately **80,000 property records** to build a machine learning model capable of estimating house prices.

The final solution uses a **Tuned XGBoost Regression model with log-transformed target values**.

### Key Highlights

- 📊 80,000+ property records
- 🤖 XGBoost regression
- 📈 Log-transformed target variable
- ⚡ FastAPI REST API
- 🌐 Interactive web interface
- 📉 Exploratory Data Analysis
- 🧪 Multiple model comparison
- 💾 Trained model saved using Joblib
- 🐍 Python-based ML pipeline

---

## 🎯 Problem Statement

The objective is to predict the selling price of residential properties in Indian cities using available property-level features.

### Input Features

- City
- Locality Type
- Property Type
- BHK
- Number of Bathrooms
- Super Area
- Carpet Area
- Floor Number
- Total Floors
- Age of Property
- Furnishing Status
- Parking
- Lift Availability
- Gated Community
- Distance to Metro
- Distance to City Center

### Target Variable

**Price_INR_Lakhs**

The model predicts the estimated property price in Indian Lakhs.

---

## 📂 Dataset

The project uses the **Indian Urban House Price Prediction** dataset.

### Dataset Size

- **80,000 rows**
- **18 columns**

The dataset is stored locally at:

`data/raw/train.csv`

---

## 🔍 Exploratory Data Analysis

The project includes an extensive EDA notebook:

`notebooks/01_house_price_eda.ipynb`

The analysis includes:

- Price distribution
- City-wise price comparison
- Property type analysis
- BHK vs price
- Area vs price
- Price per square foot
- City-level statistics
- Locality-level statistics
- Feature relationships
- Correlation analysis

---

## 🤖 Machine Learning Models

Several regression models were evaluated during the project.

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| Linear Regression | 47.94 | 86.03 | 0.6657 |
| Random Forest | 33.93 | 70.21 | 0.7774 |
| Gradient Boosting | 33.51 | 69.21 | 0.7836 |
| XGBoost | 32.90 | 69.09 | 0.7844 |
| XGBoost + Log Target | 32.20 | 68.56 | 0.7877 |
| **Tuned XGBoost + Log Target** | **32.01** | **68.26** | **0.7895** |

### 🏆 Final Model

**Tuned XGBoost + Log Target Transformation**

Final performance:

- MAE: **32.01 Lakhs**
- RMSE: **68.26 Lakhs**
- R²: **0.7895**

The trained model is stored at:

`models/house_price_model.joblib`

---

## 🧠 Why XGBoost?

XGBoost was selected because it performs well on structured and tabular datasets and can capture nonlinear relationships between property characteristics and prices.

The final model was improved using:

- Target log transformation
- Hyperparameter tuning
- Feature preprocessing
- Model comparison
- Validation-based evaluation

---

## 🏗️ Project Architecture

```text
House-Price-Prediction/
│
├── app/
│   ├── app.py
│   └── static/
│       ├── index.html
│       ├── script.js
│       └── style.css
│
├── data/
│   └── raw/
│       └── train.csv
│
├── models/
│   └── house_price_model.joblib
│
├── notebooks/
│   └── 01_house_price_eda.ipynb
│
├── src/
│   ├── data_preprocessing.py
│   ├── evaluate.py
│   ├── predict.py
│   └── train.py
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## 🌐 Web Application

The project includes a web-based property price estimator.

Users can enter property information and receive an estimated house price.

### Application Features

- Modern responsive UI
- Property information form
- Real-time prediction
- Price displayed in Indian Lakhs
- Approximate Crore conversion
- XGBoost model information
- Model performance information
- FastAPI backend

---

## ⚡ FastAPI Backend

The machine learning model is served through a FastAPI REST API.

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start the API

```bash
uvicorn app.app:app --reload
```

The API will be available at:

`http://127.0.0.1:8000`

---

## 📖 API Documentation

FastAPI automatically provides interactive Swagger documentation.

Open:

`http://127.0.0.1:8000/docs`

The `/predict` endpoint can be used to test house price predictions.

---

## 🔮 Example Prediction

Example API response:

```json
{
  "predicted_price_lakhs": 590.87,
  "predicted_price_inr": 59086800
}
```

The prediction depends on the property features provided to the model.

---

## 🛠️ Technologies Used

### Programming

- Python

### Machine Learning

- XGBoost
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Data Analysis

- Pandas
- NumPy
- Matplotlib
- Seaborn
- Plotly

### Backend

- FastAPI
- Uvicorn

### Frontend

- HTML
- CSS
- JavaScript

### Development Tools

- VS Code
- Jupyter Notebook
- Git
- GitHub

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hasanaamna/House-Price-Prediction.git
```

### 2. Navigate to the Project

```bash
cd House-Price-Prediction
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Environment

Windows:

```bash
venv\Scripts\activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run the Application

Start the FastAPI server:

```bash
uvicorn app.app:app --reload
```

Open the web application:

`http://127.0.0.1:8000`

Open the API documentation:

`http://127.0.0.1:8000/docs`

---

## 📊 Machine Learning Workflow

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Exploratory Data Analysis
     ↓
Feature Preprocessing
     ↓
Train/Test Split
     ↓
Model Training
     ↓
Model Comparison
     ↓
Hyperparameter Tuning
     ↓
Log Target Transformation
     ↓
Final Tuned XGBoost Model
     ↓
FastAPI
     ↓
Web Interface
     ↓
House Price Prediction
```

---

## 🔮 Future Improvements

- Cloud deployment
- SHAP-based model explainability
- Location-based visualization
- Interactive property maps
- Automated model retraining
- Additional real-world datasets
- Database integration
- Docker containerization
- Improved prediction accuracy

---

## 👩‍💻 Author

**Aamna Hasan**

B.Tech Computer Science & Engineering

GitHub: https://github.com/hasanaamna

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
