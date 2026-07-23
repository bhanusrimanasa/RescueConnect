import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "../services/authService";
function Profile() {
  const { user,setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user.name);
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-4xl text-white">
            👤
          </div>

          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">Name</p>
            {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">
                    {user.name}
                  </h2>
                )}
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">Email</p>
            <h2 className="text-xl font-semibold">
              {user.email}
            </h2>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">Role</p>
            <h2 className="text-xl font-semibold capitalize">
              {user.role}
            </h2>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">Member</p>
            <h2 className="text-xl font-semibold">
              RescueConnect User
            </h2>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

         <button
            onClick={async () => {
              if (!editing) {
                setEditing(true);
                return;
              }

              try {
                const updatedUser = await updateProfile({ name });

                setUser(updatedUser);

                setEditing(false);

                alert("Profile updated successfully!");
              } catch (err) {
                alert("Update failed");
               console.log(err);
              }
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
          {user.role === "user" && (
            <Link
              to="/volunteer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Become Volunteer
            </Link>
          )}

        </div>

      </div>
    </div>
  );
}

export default Profile;