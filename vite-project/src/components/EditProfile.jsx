
import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState('');
  const [imageURL, setImageURL] = useState('');

  const availableSkills = [
    'React',
    'Node.js',
    'JavaScript',
    'MongoDB',
    'Express',
    'HTML',
    'CSS',
    'TypeScript',
    'Python',
    'Java',
  ];

  const handleSkillChange = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      firstName,
      lastName,
      age: age ? Number(age) : null,
      gender,
      skills,
      about,
      imageURL,
    };

    try {
      const response = await axios.patch(
        '/api/profile/edit',
        profileData,
        { withCredentials: true }
      );

      alert('Profile updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          'Failed to update profile.'
      );
    }
  };

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-slate-200/60">

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-8 text-center sm:px-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-white text-3xl font-bold text-indigo-600 shadow-lg">
            {imageURL ? (
              <img
                src={imageURL}
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              firstName ? firstName.charAt(0).toUpperCase() : 'U'
            )}
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Edit Your Profile
          </h2>
          <p className="mt-2 text-sm text-indigo-100">
            Keep your personal information up to date
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-10">

          {/* Personal Information */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className={inputClass}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className={inputClass}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter your age"
                  className={inputClass}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  className={inputClass}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Skills
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Select all the skills you know.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableSkills.map((skill) => {
                const selected = skills.includes(skill);

                return (
                  <label
                    key={skill}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleSkillChange(skill)}
                      className="h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
                    />
                    <span className="text-sm font-medium">
                      {skill}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              About You
            </label>
            <textarea
              rows="4"
              placeholder="Tell us something about yourself..."
              className={`${inputClass} resize-y`}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className={inputClass}
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] sm:w-auto sm:min-w-48"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
