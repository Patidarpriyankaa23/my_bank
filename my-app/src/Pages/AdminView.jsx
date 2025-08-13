import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminAxios from "../utils/axiosadmin";

export default function AdminView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
    state: "",
    city: "",
    pincode: "",
    category: "",
    gstType: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Get Agent Data
  const fetchAgent = async () => {
    try {
      const res = await adminAxios.get(`/admin/view/${id}`);
      const agent = res.data;
      setFormData({
        name: agent.name || agent.fullname || "",
        uniqueId: agent.uniqueId || "",
        state: agent.state || "",
        city: agent.city || "",
        pincode: agent.pincode || "",
        category: agent.category || "",
        gstType: agent.gstType || "",
        status: agent.computedStatus || agent.status || "",
      });
    } catch (err) {
      console.error("Error fetching agent:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save Changes
  const saveChanges = async () => {
    setSaving(true);
    setMessage("");
    try {
      await adminAxios.put(`/admin/view/${id}`, formData);
      setMessage("✅ Changes saved successfully!");
    } catch (err) {
      console.error("Error saving agent:", err);
      setMessage("❌ Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Edit Agent Details</h2>

      {message && (
        <div
          className={`p-2 mb-3 text-sm rounded ${
            message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveChanges();
        }}
      >
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize">{key}</label>
            {key === "status" || key === "gstType" ? (
              <select
                value={formData[key]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Select</option>
                {key === "status" && (
                  <>
                    <option value="active">Active</option>
                    <option value="deactivated">Deactivated</option>
                    <option value="deleted">Deleted</option>
                  </>
                )}
                {key === "gstType" && (
                  <>
                    <option value="GST">GST Registered</option>
                    <option value="Non-GST">Non-GST</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type="text"
                value={formData[key]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        ))}

        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => fetchAgent()}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded text-white ${
              saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
