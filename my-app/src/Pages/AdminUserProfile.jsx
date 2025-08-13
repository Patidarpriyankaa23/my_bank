// src/pages/AdminUserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import adminAxios from "../utils/axiosadmin";

export default function AdminUserProfile() {
  const { uniqueId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditedView = new URLSearchParams(location.search).get("view") === "edited";

  const [user, setUser] = useState(null);
  const [editHistory, setEditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await adminAxios.get(`/admin/user/${uniqueId}`);
        // expecting { user, editHistory }
        setUser(res.data.user || res.data);
        setEditHistory(res.data.editHistory || []);
        setForm(res.data.user || res.data); // prefill for potential edit
      } catch (err) {
        console.error(err);
        alert("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [uniqueId]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!user) return <div className="p-6">No profile found for {uniqueId}</div>;

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    // Example: save changes to backend PUT /admin/user/:uniqueId
    setSaving(true);
    try {
      await adminAxios.put(`/admin/user/${uniqueId}`, form);
      alert("Saved successfully");
      // re-fetch
      const res = await adminAxios.get(`/admin/user/${uniqueId}`);
      setUser(res.data.user || res.data);
      setEditHistory(res.data.editHistory || []);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // helper to render object fields nicely
  const renderField = (label, value) => (
    <div className="mb-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm">{value ?? "N/A"}</div>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Profile — {user.name || user.fullname || uniqueId}</h1>
        <div>
          <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded mr-2">Back</button>
          <button onClick={handleSave} disabled={saving} className="px-3 py-1 bg-green-600 text-white rounded">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="col-span-2 border p-4 rounded shadow-sm">
          <h2 className="font-semibold mb-3">Profile Details</h2>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input name="name" value={form.name || ""} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
            </div>

            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input name="email" value={form.email || ""} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
            </div>

            <div>
              <label className="text-xs text-gray-500">Mobile</label>
              <input name="mobile" value={form.mobile || ""} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
            </div>

            <div>
              <label className="text-xs text-gray-500">Unique ID</label>
              <div className="w-full px-2 py-1 rounded border bg-gray-50">{user.uniqueId}</div>
            </div>

            <div>
              <label className="text-xs text-gray-500">State</label>
              <input name="state" value={form.state || ""} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
            </div>

            <div>
              <label className="text-xs text-gray-500">City</label>
              <input name="city" value={form.city || ""} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
            </div>

            {/* add other profile fields similarly */}
          </div>
        </div>

        <div className="border p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2">Quick info</h3>
          {renderField("Category", user.category)}
          {renderField("GST Type", user.gstType)}
          {renderField("Pincode", user.pincode)}
          {renderField("Status", user.isDeleted ? "Deleted" : user.lastLoginAt ? "Active" : "Deactivated")}
          {renderField("Last CIBIL Fetch", user.lastCibilFetch ? new Date(user.lastCibilFetch).toLocaleString() : "Never")}
        </div>
      </div>

      {isEditedView && (
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Edit History (Before / After)</h2>
          {editHistory.length === 0 ? (
            <p>No edit history found.</p>
          ) : (
            editHistory.map((edit, idx) => {
              // edit.before and edit.after might be objects or stored fields
              const before = typeof edit.before === "string" ? tryParse(edit.before) : edit.before || {};
              const after = typeof edit.after === "string" ? tryParse(edit.after) : edit.after || {};
              return (
                <div key={idx} className="mb-4 border p-3 rounded bg-white">
                  <div className="text-xs text-gray-500 mb-2">Edited at: {new Date(edit.editedAt || edit.date || edit.createdAt).toLocaleString()}</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Before</h4>
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">{JSON.stringify(before, null, 2)}</pre>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">After</h4>
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">{JSON.stringify(after, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// helper parse function
function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
