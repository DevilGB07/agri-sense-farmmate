const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.getFarmDashboardData = functions.https.onCall(async (data, context) => {
  // 1. Check for user authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { farmId } = data;

  if (!farmId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'farmId' argument."
    );
  }

  try {
    // 2. Access Internal Data (Firestore)
    const farmDoc = await db.collection("farms").doc(farmId).get();
    if (!farmDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Farm not found.");
    }
    const farmData = farmDoc.data();

    // 3. Process and Interconnect Data (Simulated)

    // 3.1. Simulate Soil Health
    const soilHealth = {
      fertility: "Good", // Simulated
      prediction: "Stable", // Simulated
    };

    // 3.2. Simulate AI Crop Recommendations
    const cropRecommendations = [
      { crop: "Tomato", suitability: "92%" },
      { crop: "Potato", suitability: "85%" },
      { crop: "Corn", suitability: "78%" },
    ];

    // 3.3. Manage Irrigation Schedules
    const irrigationZones = farmData.irrigationZones.map(zone => {
        const nextIrrigation = new Date();
        nextIrrigation.setDate(nextIrrigation.getDate() + 2); // Simulate next irrigation in 2 days
        return {
            ...zone,
            nextIrrigation: nextIrrigation.toISOString(),
        }
    });

    // 3.4. Simulate Growth Tracking
    const growthTracking = {
      predictedYield: "250kg", // Simulated
      healthScore: 88, // Simulated
    };

    // 3.5. Generate Smart Recommendations
    const smartRecommendations = [
      "Consider applying organic fertilizer to Zone A.",
      "Scout for pests in the cornfield.",
    ];

    // 3.6. Calculate Green Points
    let greenPoints = farmData.greenPoints || 0;
    greenPoints += 5; // Add 5 points for fetching data (example)

    // 4. Return a Single Payload
    return {
      soilHealth,
      cropRecommendations,
      irrigationZones,
      growthTracking,
      smartRecommendations,
      greenPoints,
      farmData, // Including original farm data for context
    };
  } catch (error) {
    console.error("Error in getFarmDashboardData:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "An internal error occurred."
    );
  }
});
