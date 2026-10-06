const form = document.getElementById("predictionForm");

const result = document.getElementById("result");

const errorBox = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const priceCrore = document.getElementById("priceCrore");
const priceLakhs = document.getElementById("priceLakhs");

const predictButton = document.getElementById("predictButton");

const buttonText = document.getElementById("buttonText");
const buttonLoader = document.getElementById("buttonLoader");

const resetButton = document.getElementById("resetButton");


// =========================================
// FORM SUBMISSION
// =========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Hide previous result/error
    result.classList.add("hidden");
    errorBox.classList.add("hidden");


    // Start loading state
    predictButton.disabled = true;

    buttonText.classList.add("hidden");
    buttonLoader.classList.remove("hidden");


    // =====================================
    // COLLECT FORM DATA
    // =====================================

    const houseData = {

        City:
            document.getElementById("City").value,

        Locality_Type:
            document.getElementById("Locality_Type").value,

        Property_Type:
            document.getElementById("Property_Type").value,

        BHK:
            Number(
                document.getElementById("BHK").value
            ),

        Bathrooms:
            Number(
                document.getElementById("Bathrooms").value
            ),

        Super_Area_SqFt:
            Number(
                document.getElementById(
                    "Super_Area_SqFt"
                ).value
            ),

        Carpet_Area_SqFt:
            Number(
                document.getElementById(
                    "Carpet_Area_SqFt"
                ).value
            ),

        Floor_Number:
            Number(
                document.getElementById(
                    "Floor_Number"
                ).value
            ),

        Total_Floors:
            Number(
                document.getElementById(
                    "Total_Floors"
                ).value
            ),

        Age_of_Property:
            Number(
                document.getElementById(
                    "Age_of_Property"
                ).value
            ),

        Furnishing_Status:
            document.getElementById(
                "Furnishing_Status"
            ).value,

        Parking:
            Number(
                document.getElementById(
                    "Parking"
                ).value
            ),

        Lift_Available:
            Number(
                document.getElementById(
                    "Lift_Available"
                ).value
            ),

        Gated_Community:
            Number(
                document.getElementById(
                    "Gated_Community"
                ).value
            ),

        Distance_to_Metro_km:
            Number(
                document.getElementById(
                    "Distance_to_Metro_km"
                ).value
            ),

        Distance_to_City_Center_km:
            Number(
                document.getElementById(
                    "Distance_to_City_Center_km"
                ).value
            )
    };


    // =====================================
    // BASIC VALIDATION
    // =====================================

    if (
        houseData.Super_Area_SqFt <= 0 ||
        houseData.Carpet_Area_SqFt <= 0
    ) {

        showError(
            "Area values must be greater than zero."
        );

        resetLoadingState();

        return;
    }


    if (
        houseData.Carpet_Area_SqFt >
        houseData.Super_Area_SqFt
    ) {

        showError(
            "Carpet area cannot be greater than super area."
        );

        resetLoadingState();

        return;
    }


    if (
        houseData.Floor_Number >
        houseData.Total_Floors
    ) {

        showError(
            "Floor number cannot be greater than total floors."
        );

        resetLoadingState();

        return;
    }


    // =====================================
    // API REQUEST
    // =====================================

    try {

        const response = await fetch(
            "/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(houseData)
            }
        );


        // Handle HTTP errors

        if (!response.ok) {

            let message =
                "Unable to generate prediction.";

            try {

                const errorData =
                    await response.json();

                if (errorData.detail) {
                    message =
                        errorData.detail;
                }

            } catch (error) {
                // Keep default message
            }

            throw new Error(message);
        }


        // =================================
        // GET RESPONSE
        // =================================

        const data =
            await response.json();


        const lakhs =
            Number(
                data.predicted_price_lakhs
            );


        if (!Number.isFinite(lakhs)) {

            throw new Error(
                "The model returned an invalid prediction."
            );
        }


        // Convert Lakhs → Crore

        const crore =
            lakhs / 100;


        // =================================
        // DISPLAY RESULT
        // =================================

        priceCrore.textContent =
            `₹${crore.toFixed(2)} Crore`;


        priceLakhs.textContent =
            `₹${lakhs.toFixed(2)} Lakhs`;


        result.classList.remove(
            "hidden"
        );


        // Scroll smoothly to result

        setTimeout(() => {

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);


    } catch (error) {

        console.error(
            "Prediction error:",
            error
        );

        showError(
            error.message ||
            "Something went wrong while predicting the price."
        );

    } finally {

        resetLoadingState();

    }

});


// =========================================
// RESET BUTTON
// =========================================

resetButton.addEventListener(
    "click",
    function () {

        form.reset();

        result.classList.add(
            "hidden"
        );

        errorBox.classList.add(
            "hidden"
        );

        // Restore original defaults

        document.getElementById(
            "City"
        ).value = "Mumbai";

        document.getElementById(
            "Locality_Type"
        ).value = "Premium";

        document.getElementById(
            "Property_Type"
        ).value = "Apartment";

        document.getElementById(
            "BHK"
        ).value = 3;

        document.getElementById(
            "Bathrooms"
        ).value = 3;

        document.getElementById(
            "Super_Area_SqFt"
        ).value = 1800;

        document.getElementById(
            "Carpet_Area_SqFt"
        ).value = 1400;

        document.getElementById(
            "Floor_Number"
        ).value = 10;

        document.getElementById(
            "Total_Floors"
        ).value = 20;

        document.getElementById(
            "Age_of_Property"
        ).value = 5;

        document.getElementById(
            "Furnishing_Status"
        ).value = "Furnished";

        document.getElementById(
            "Parking"
        ).value = "1";

        document.getElementById(
            "Lift_Available"
        ).value = "1";

        document.getElementById(
            "Gated_Community"
        ).value = "1";

        document.getElementById(
            "Distance_to_Metro_km"
        ).value = 2;

        document.getElementById(
            "Distance_to_City_Center_km"
        ).value = 8;

    }
);


// =========================================
// ERROR DISPLAY
// =========================================

function showError(message) {

    errorMessage.textContent =
        message;

    errorBox.classList.remove(
        "hidden"
    );

    errorBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =========================================
// LOADING RESET
// =========================================

function resetLoadingState() {

    predictButton.disabled = false;

    buttonText.classList.remove(
        "hidden"
    );

    buttonLoader.classList.add(
        "hidden"
    );
}