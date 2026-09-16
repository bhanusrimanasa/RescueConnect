import { useState, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../services/authService";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Profile() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePhoto: null,
    previewUrl: null,
  });

  // States for Instagram-like Cropping Modal
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const [changingPassword, setChangingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoSelect = (e) => {
    if (!editing) return; // Prevent selection if not in edit mode
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback((e) => {
    imgRef.current = e.currentTarget;
  }, []);

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      size,
      size
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const file = new File([blob], "profile-photo.jpg", { type: "image/jpeg" });
        const previewUrl = URL.createObjectURL(blob);
        resolve({ file, previewUrl });
      }, "image/jpeg", 0.95);
    });
  };

  const handleCropComplete = async () => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      try {
        const { file, previewUrl } = await getCroppedImg(imgRef.current, completedCrop);
        setFormData((prev) => ({
          ...prev,
          profilePhoto: file,
          previewUrl: previewUrl,
        }));
        setCropModalOpen(false);
        setImageSrc(null);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please adjust the crop area before saving.");
    }
  };

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      profilePhoto: null,
      previewUrl: null,
    });
    setEditing(true);
    setChangingPassword(false);
    setShowConfirmModal(false);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      if (formData.profilePhoto) {
        data.append("profilePhoto", formData.profilePhoto);
      }

      const updatedUser = await updateProfile(data);
      setUser(updatedUser);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      profilePhoto: null,
      previewUrl: null,
    });
    setEditing(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrePasswordSave = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    setShowConfirmModal(true);
  };

  const handlePasswordSave = async () => {
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setChangingPassword(false);
      setShowConfirmModal(false);
      setShowPasswords({ current: false, new: false, confirm: false });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all">
        
        {/* ================= PROFILE HEADER ================= */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-orange-50/50 via-white to-orange-50/30 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              
              {/* Profile Photo: Locked when NOT editing, interactive when editing */}
              <div className="relative group">
                {editing ? (
                  <label 
                    htmlFor="profile-photo-input"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-orange-100 flex items-center justify-center border-2 border-orange-500 shadow-md cursor-pointer block relative"
                  >
                    {formData.previewUrl || user.profilePhoto ? (
                      <img
                        src={formData.previewUrl || user.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">🐾</span>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                      <span className="text-xl">📷</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Change</span>
                    </div>
                  </label>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-orange-100 flex items-center justify-center border-2 border-orange-500 shadow-md block relative">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">🐾</span>
                    )}
                  </div>
                )}

                <input
                  id="profile-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  disabled={!editing}
                />
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {user.name}
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {user.role || "User"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>📅</span> Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2024"}
                </p>
              </div>
            </div>

            {(user.role === "volunteer" || user.role === "rescuer") && (
              <div className="w-full sm:w-auto flex flex-col items-start sm:items-end bg-white/80 p-3 sm:p-0 sm:bg-transparent rounded-xl">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Live Status</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isAvailable
                      ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200"
                      : "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-white animate-pulse" : "bg-white"}`}></span>
                  {isAvailable ? "Available for Rescue" : "Off Duty"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= ACTIVITY METRICS ================= */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 p-6 sm:p-8 bg-gray-50/50 border-b border-gray-100">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs text-center">
            <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Reports Made</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">4</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs text-center">
            <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Rescues Handled</p>
            <p className="text-xl sm:text-2xl font-black text-orange-600 mt-1">12</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs text-center">
            <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Adoptions</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">2</p>
          </div>
        </div>

        {/* ================= PERSONAL INFORMATION SECTION ================= */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            {!editing && (
              <button
                onClick={handleEdit}
                className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center gap-1.5 bg-orange-50 px-3.5 py-1.5 rounded-xl transition"
              >
                ✏️ Edit Details
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-5 bg-orange-50/30 p-6 rounded-2xl border border-orange-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 text-sm font-bold shadow-sm transition flex items-center gap-2"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/70 p-6 rounded-2xl border border-gray-100">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                <p className="font-semibold text-gray-800">{user.name || "Not provided"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                <p className="font-semibold text-gray-800">{user.email || "Not provided"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                <p className="font-semibold text-gray-800">{user.phone || "Not provided"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</p>
                <p className="font-semibold text-gray-800 capitalize">{user.role || "Not provided"}</p>
              </div>

              <div className="sm:col-span-2 space-y-1 pt-2 border-t border-gray-200/60">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
                <p className="font-semibold text-gray-800">{user.address || "Not provided"}</p>
              </div>
            </div>
          )}
        </div>

        {/* ================= SECURITY & ACCOUNT SETTINGS ================= */}
        <div className="p-6 sm:p-8 bg-gray-50/30 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Security & Password</h2>

          {!changingPassword ? (
            <button
              onClick={() => {
                setChangingPassword(true);
                setEditing(false);
                setShowConfirmModal(false);
              }}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 text-sm font-bold shadow-sm transition flex items-center gap-2"
            >
              🔐 Change Password
            </button>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Update Password</h3>

              {!showConfirmModal ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      >
                        {showPasswords.current ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      >
                        {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl p-3 pr-12 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                      >
                        {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handlePrePasswordSave}
                      className="bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 text-sm font-bold transition shadow-sm"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setChangingPassword(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setShowPasswords({ current: false, new: false, confirm: false });
                      }}
                      className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-4 space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <p className="text-amber-800 font-bold text-base">Are you sure you want to update your password?</p>
                    <p className="text-amber-600 text-xs mt-1">This will change your credentials immediately.</p>
                  </div>

                  <div className="flex gap-3 pt-2 justify-center">
                    <button
                      onClick={handlePasswordSave}
                      className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 text-sm font-bold transition shadow-sm"
                    >
                      Yes, Update Password
                    </button>
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="bg-gray-100 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-200 text-sm font-bold transition"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* ================= INSTAGRAM-LIKE CROP MODAL ================= */}
      {cropModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Crop Profile Picture</h3>
              <button
                onClick={() => setCropModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center max-h-[60vh] overflow-auto bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {imageSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    style={{ maxHeight: "50vh", display: "block" }}
                  />
                </ReactCrop>
              )}
            </div>

            <p className="text-xs text-center text-gray-400 font-medium">
              Drag corners to resize or move your photo inside the circle.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCropModalOpen(false)}
                className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                className="bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 text-sm font-bold shadow-sm transition"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;