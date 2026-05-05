import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(res.data.user);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </p>
      )}

      {profile ? (
        <div className="bg-white shadow p-6 rounded max-w-md">
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>User ID:</b> {profile._id}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;