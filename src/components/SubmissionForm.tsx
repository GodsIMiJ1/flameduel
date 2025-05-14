"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { activeChallenge } from "@/lib/duel";
import { Flame } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  challengeType: "web" | "mobile" | "ai" | "game" | "open" | "other";
  appLink: string;
  videoLink: string;
  description: string;
  duration: number;
  agreeToRules: boolean;
}

export function SubmissionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    challengeType: "open",
    appLink: "",
    videoLink: "",
    description: "",
    duration: 60,
    agreeToRules: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.appLink.trim()) newErrors.appLink = "App link is required";
    if (!formData.videoLink.trim()) newErrors.videoLink = "Video link is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.duration <= 0 || formData.duration > 60) newErrors.duration = "Duration must be between 1 and 60 minutes";
    if (!formData.agreeToRules) newErrors.agreeToRules = "You must agree to the rules";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);

      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          challengeType: "web",
          appLink: "",
          videoLink: "",
          description: "",
          duration: 60,
          agreeToRules: false,
        });
        setShowSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-black/90 border border-green-500/50 rounded-lg p-8 shadow-lg shadow-green-500/20 text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Challenge Accepted!</h2>
        <p className="text-gray-300 mb-6">
          Your submission has been received! The Ghost King acknowledges your courage in accepting the challenge. Your battle will be reviewed and featured if worthy.
        </p>
        <div className="animate-pulse text-green-500">Redirecting to home page...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Challenge Type */}
          <div>
            <label htmlFor="challengeType" className="block text-gray-300 mb-2">
              Challenge Type <span className="text-red-500">*</span>
            </label>
            <select
              id="challengeType"
              name="challengeType"
              value={formData.challengeType}
              onChange={handleChange}
              className="w-full bg-black/50 border border-purple-500/30 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="open">Open Challenge Response</option>
              <option value="web">Web App</option>
              <option value="mobile">Mobile App</option>
              <option value="ai">AI Tool</option>
              <option value="game">Game</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-gray-300 mb-2">
              Build Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              max="60"
              className={`w-full bg-black/50 border ${errors.duration ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            <p className="text-gray-500 text-sm mt-1">Maximum allowed: 60 minutes</p>
          </div>
        </div>

        {/* App Link */}
        <div>
          <label htmlFor="appLink" className="block text-gray-300 mb-2">
            App Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="appLink"
            name="appLink"
            value={formData.appLink}
            onChange={handleChange}
            className={`w-full bg-black/50 border ${errors.appLink ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="https://your-app-url.com"
          />
          {errors.appLink && <p className="text-red-500 text-sm mt-1">{errors.appLink}</p>}
          <p className="text-gray-500 text-sm mt-1">Link to your deployed application</p>
        </div>

        {/* Video Link */}
        <div>
          <label htmlFor="videoLink" className="block text-gray-300 mb-2">
            Build Video Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="videoLink"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            className={`w-full bg-black/50 border ${errors.videoLink ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="https://youtube.com/watch?v=your-video-id"
          />
          {errors.videoLink && <p className="text-red-500 text-sm mt-1">{errors.videoLink}</p>}
          <p className="text-gray-500 text-sm mt-1">Link to your unedited build process video (YouTube, Vimeo, etc.)</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-300 mb-2">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full bg-black/50 border ${errors.description ? 'border-red-500' : 'border-purple-500/30'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="Describe your project, what it does, and how you built it..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Rules Agreement */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="agreeToRules"
              name="agreeToRules"
              checked={formData.agreeToRules}
              onChange={handleChange}
              className="w-4 h-4 bg-black border-purple-500 rounded focus:ring-purple-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToRules" className={`font-medium ${errors.agreeToRules ? 'text-red-500' : 'text-gray-300'}`}>
              I agree to the FlameDuel rules and confirm this is my own work, built within the 1-hour time limit
            </label>
            {errors.agreeToRules && <p className="text-red-500 text-sm mt-1">{errors.agreeToRules}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Challenge'}
          </button>
        </div>

        {/* Rules Reminder */}
        <div className="bg-black/70 border border-red-500/30 rounded-md p-4">
          <h3 className="text-red-500 font-bold mb-2">The Ghost King's Challenge Rules:</h3>
          <ul className="list-none text-gray-300 space-y-2 text-sm">
            {activeChallenge.rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <Flame size={14} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500 italic">
            "Those who fail to deliver will join the Wall of Shame." - Ghost King
          </p>
        </div>
      </form>
    </div>
  );
}
