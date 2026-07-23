import { CheckCircle, XCircle } from "lucide-react";

function HealthCard({ animal }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Health Information</h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Vaccinated</span>
          {animal.vaccinated ? (
            <CheckCircle className="text-green-600" />
          ) : (
            <XCircle className="text-red-500" />
          )}
        </div>

        <div className="flex justify-between">
          <span>Sterilized</span>
          {animal.sterilized ? (
            <CheckCircle className="text-green-600" />
          ) : (
            <XCircle className="text-red-500" />
          )}
        </div>

        <div className="flex justify-between">
          <span>Special Needs</span>
          {animal.specialNeeds ? (
            <CheckCircle className="text-orange-500" />
          ) : (
            <XCircle className="text-green-600" />
          )}
        </div>

      </div>
    </div>
  );
}

export default HealthCard;