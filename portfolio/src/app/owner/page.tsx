"use client";

import { About, Experience, Project, Skill, Certificate } from "@/type";
import {
  Briefcase,
  FolderKanban,
  Cpu,
  Plus,
  Edit,
  Trash2,
  Save,
  User,
  Award,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Swal from "sweetalert2";

export default function OwnerPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openToWork, setOpenToWork] = useState(true);
  const [sentence, setSentence] = useState("");
  const [savingAbout, setSavingAbout] = useState(false);
  const [id, setId] = useState("");
  const [uploadFile, setuploadFile] = useState<File | null>(null);
  const [uploadFileLoading, setuploadFileLoading] = useState(false);
  const [fileLink, setfileLink] = useState<any>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "experience" | "project" | "skill" | "certificate" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getAbout = async () => {
    try {
      const res = await fetch("/api/about", { cache: "no-store" });
      const data = await res.json();
      setId(data[0]._id);
      setOpenToWork(data[0].openToWork);
      setSentence(data[0].sentence);
    } catch (error) {
      console.log(error);
    }
  };

  const getExperiences = async () => {
    try {
      const res = await fetch("/api/experience", { cache: "no-store" });
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await fetch("/api/project", { cache: "no-store" });
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkills = async () => {
    try {
      const res = await fetch("/api/skill", { cache: "no-store" });
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCertificates = async () => {
    try {
      const res = await fetch("/api/certificate", { cache: "no-store" });
      const data = await res.json();
      setCertificates(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(id, openToWork, sentence);

      setSavingAbout(true);
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          openToWork,
          sentence,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "About section updated successfully",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#22d3ee",
        iconColor: "#22d3ee",
        customClass: {
          popup: "rounded-xl border border-cyan-400/30",
        },
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save changes",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#22d3ee",
        iconColor: "#ef4444",
      });
    } finally {
      setSavingAbout(false);
    }
  };

  const handleOpenModal = (
    type: "experience" | "project" | "skill" | "certificate",
    item: any = null
  ) => {
    setModalType(type);

    // If item is null, create empty template for new item
    if (!item) {
      switch (type) {
        case "experience":
          setSelectedItem({
            title: "",
            company: "",
            description: "",
            startDate: "",
            endDate: "",
            image: "",
          });
          break;
        case "project":
          setSelectedItem({
            title: "",
            description: "",
            link: "",
            skillsInput: "",
            skills: [],
            image: "",
            collaboratorsInput: "",
            collaborators: [],
          });
          break;
        case "certificate":
          setSelectedItem({
            title: "",
            issuer: "",
            description: "",
            month: "",
            year: "",
            credentialUrl: "",
          });
          break;
        case "skill":
          setSelectedItem({
            title: "",
            itemsInput: "",
            items: [],
          });
          break;
      }
      setIsEditing(true); // Auto-enable editing for new items
    } else {
      const itemCopy = { ...item };

      // Convert arrays to strings for editing
      if (type === "project") {
        itemCopy.skillsInput = item.skills?.join(", ") || "";
        itemCopy.collaboratorsInput = item.collaborators?.join(", ") || "";
      }
      if (type === "skill") {
        itemCopy.itemsInput = item.items?.join(", ") || "";
      }

      setSelectedItem(itemCopy);
      setIsEditing(false);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedItem(null);
    setIsEditing(false);
    setuploadFile(null);
    setuploadFileLoading(false);
  };

  const handleUpdateItem = async () => {
    try {
      let endpoint = "";
      let method = "PUT";

      const isNewItem = !selectedItem._id && !selectedItem.id;
      if (isNewItem) {
        method = "POST";
      }

      // Prepare data before sending
      const dataToSend = { ...selectedItem };

      // Upload image for experience
      if (modalType === "experience" && uploadFile) {
        setuploadFileLoading(true);
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("folderName", "portfolio-experiences");

        const uploadResponse = await fetch("/api/fileupload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        dataToSend.image = uploadData.res?.secure_url || uploadData.res?.url;
        setuploadFileLoading(false);
        setuploadFile(null);
      }

      // Convert string inputs back to arrays
      if (modalType === "project") {
        dataToSend.skills = selectedItem.skillsInput
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s);
        dataToSend.collaborators = selectedItem.collaboratorsInput
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s);
        delete dataToSend.skillsInput;
        delete dataToSend.collaboratorsInput;

        // Upload image if file is selected
        if (uploadFile) {
          setuploadFileLoading(true);
          const formData = new FormData();
          formData.append("file", uploadFile);
          formData.append("folderName", "portfolio-projects");

          const uploadResponse = await fetch("/api/fileupload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload image");
          }

          const uploadData = await uploadResponse.json();
          dataToSend.image = uploadData.res?.secure_url || uploadData.res?.url;
          setuploadFileLoading(false);
          setuploadFile(null);
        }
      }

      if (modalType === "skill") {
        dataToSend.items = selectedItem.itemsInput
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s);
        delete dataToSend.itemsInput;
      }

      // Remove preview field before saving
      delete dataToSend.imagePreview;

      switch (modalType) {
        case "experience":
          endpoint = "/api/experience";
          break;
        case "project":
          endpoint = "/api/project";
          break;
        case "skill":
          endpoint = "/api/skill";
          break;
        case "certificate":
          endpoint = "/api/certificate";
          break;
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok)
        throw new Error(`Failed to ${isNewItem ? "create" : "update"}`);

      Swal.fire({
        icon: "success",
        title: isNewItem ? "Created!" : "Updated!",
        text: `Item ${isNewItem ? "created" : "updated"} successfully`,
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#22d3ee",
        iconColor: "#22d3ee",
      });

      // Refresh data
      switch (modalType) {
        case "experience":
          getExperiences();
          break;
        case "project":
          getProjects();
          break;
        case "skill":
          getSkills();
          break;
        case "certificate":
          getCertificates();
          break;
      }

      handleCloseModal();
    } catch (error) {
      setuploadFileLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save item",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#22d3ee",
        iconColor: "#ef4444",
      });
    }
  };

  const handleDeleteItem = async (
    type: "experience" | "project" | "skill" | "certificate",
    id: string
  ) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        let endpoint = "";
        switch (type) {
          case "experience":
            endpoint = `/api/experience?id=${id}`;
            break;
          case "project":
            endpoint = `/api/project?id=${id}`;
            break;
          case "skill":
            endpoint = `/api/skill?id=${id}`;
            break;
          case "certificate":
            endpoint = `/api/certificate?id=${id}`;
            break;
        }

        const response = await fetch(endpoint, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Item has been deleted.",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#22d3ee",
          iconColor: "#22d3ee",
        });

        // Refresh data
        switch (type) {
          case "experience":
            getExperiences();
            break;
          case "project":
            getProjects();
            break;
          case "skill":
            getSkills();
            break;
          case "certificate":
            getCertificates();
            break;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete item",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#22d3ee",
          iconColor: "#ef4444",
        });
      }
    }
  };

  useEffect(() => {
    getExperiences();
    getProjects();
    getSkills();
    getAbout();
    getCertificates();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-slate-900 pt-20 md:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Dashboard <span className="text-cyan-400">Owner</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your portfolio content
            </p>
          </div>

          {/* About Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-400/10 rounded-lg">
                <User className="text-cyan-400 w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                About Settings
              </h2>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-400/30">
              <div className="space-y-6">
                {/* Open to Work Toggle */}
                <form onSubmit={handleSaveAbout}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        Open to Work Status
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Toggle your availability for new opportunities
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={openToWork}
                        onChange={(e) => setOpenToWork(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-400/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-400"></div>
                      <span className="ms-3 text-sm font-medium text-white">
                        {openToWork ? "Available" : "Not Available"}
                      </span>
                    </label>
                  </div>

                  <hr className="border-slate-700" />

                  {/* Sentence Input */}
                  <div className="mt-6">
                    <label className="block text-white font-semibold text-lg mb-2 ">
                      Introduction Sentence
                    </label>
                    <p className="text-gray-400 text-sm mb-4">
                      This text will appear in your About section
                    </p>
                    <textarea
                      value={sentence}
                      onChange={(e) => setSentence(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                      placeholder="Write your introduction here..."
                    />
                    <p className="text-gray-500 text-xs mt-2">
                      {sentence.length} characters
                    </p>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      disabled={savingAbout}
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={18} />
                      {savingAbout ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/10 rounded-lg">
                  <Briefcase className="text-cyan-400 w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Experience
                </h2>
              </div>
              <button
                onClick={() => handleOpenModal("experience")}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                Add Experience
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-cyan-400/30">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-800 border-b border-cyan-400/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden lg:table-cell">
                      Period
                    </th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                  {experiences.map((exp, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => handleOpenModal("experience", exp)}
                    >
                      <td className="px-4 py-4 text-sm text-white font-medium">
                        {exp.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {exp.company}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell max-w-xs truncate">
                        {exp.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 hidden lg:table-cell whitespace-nowrap">
                        {exp.startDate} - {exp.endDate}
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenModal("experience", exp)}
                            className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteItem("experience", exp._id)
                            }
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Project Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/10 rounded-lg">
                  <FolderKanban className="text-cyan-400 w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Projects
                </h2>
              </div>
              <button
                onClick={() => handleOpenModal("project")}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-cyan-400/30">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-800 border-b border-cyan-400/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden lg:table-cell">
                      Skills
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden xl:table-cell">
                      Link
                    </th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                  {projects.map((proj, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => handleOpenModal("project", proj)}
                    >
                      <td className="px-4 py-4 text-sm text-white font-medium">
                        {proj.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell max-w-xs truncate">
                        {proj.description}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {proj.skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {proj.skills.length > 3 && (
                            <span className="px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded-md">
                              +{proj.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm hidden xl:table-cell">
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 truncate block max-w-xs"
                        >
                          {proj.link}
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenModal("project", proj)}
                            className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteItem("project", proj._id)
                            }
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Certificate Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/10 rounded-lg">
                  <Award className="text-cyan-400 w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Certificates
                </h2>
              </div>
              <button
                onClick={() => handleOpenModal("certificate")}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                Add Certificate
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-cyan-400/30">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-800 border-b border-cyan-400/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Issuer
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                  {certificates.map((cert, idx) => (
                    <tr
                      key={cert.id || idx}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => handleOpenModal("certificate", cert)}
                    >
                      <td className="px-4 py-4 text-sm text-white font-medium">
                        {cert.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {cert.issuer}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell max-w-xs truncate">
                        {cert.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400 hidden lg:table-cell whitespace-nowrap">
                        {cert.month} {cert.year}
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenModal("certificate", cert)}
                            className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteItem("certificate", cert._id)
                            }
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Skills Section */}
          {/* <section className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/10 rounded-lg">
                  <Cpu className="text-cyan-400 w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Skills
                </h2>
              </div>
              <button
                onClick={() => handleOpenModal("skill")}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-900 font-semibold rounded-lg hover:bg-cyan-500 transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                Add Skill Category
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-cyan-400/30">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-800 border-b border-cyan-400/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                  {skills.map((skill, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => handleOpenModal("skill", skill)}
                    >
                      <td className="px-4 py-4 text-sm text-white font-medium">
                        {skill.title}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-medium rounded-md border border-cyan-400/20"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenModal("skill", skill)}
                            className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("skill", skill._id)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> */}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-slate-800 rounded-xl border border-cyan-400/30 w-full max-w-2xl my-4 animate-scaleIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-cyan-400/30 p-4 sm:p-6 flex items-center justify-between rounded-t-xl z-10">
              <h3 className="text-lg sm:text-2xl font-bold text-white capitalize line-clamp-1">
                {selectedItem._id || selectedItem.id
                  ? `${modalType} Details`
                  : `Add New ${modalType}`}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[calc(100vh-200px)] sm:max-h-[calc(90vh-160px)] overflow-y-auto">
              {modalType === "experience" && (
                <>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={selectedItem.company || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          company: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      value={selectedItem.description || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={selectedItem.startDate || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            startDate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={selectedItem.endDate || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            endDate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Image
                    </label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setuploadFile(file);
                              // Create preview URL
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSelectedItem({
                                  ...selectedItem,
                                  imagePreview: reader.result,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          disabled={uploadFileLoading}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-400 file:text-slate-900 hover:file:bg-cyan-500 file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {(uploadFile || selectedItem.image) && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                            <img
                              src={
                                selectedItem.imagePreview || selectedItem.image
                              }
                              alt="Preview"
                              className="w-full h-full object-contain bg-slate-900"
                            />
                            {uploadFileLoading && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="text-white text-sm">
                                  Uploading...
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      selectedItem.image && (
                        <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.company}
                            className="w-full h-full object-contain bg-slate-900"
                          />
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {modalType === "project" && (
                <>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      value={selectedItem.description || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Link
                    </label>
                    <input
                      type="text"
                      value={selectedItem.link || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          link: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Project Image
                    </label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setuploadFile(file);
                              // Create preview URL
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSelectedItem({
                                  ...selectedItem,
                                  imagePreview: reader.result,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          disabled={uploadFileLoading}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-400 file:text-slate-900 hover:file:bg-cyan-500 file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {(uploadFile || selectedItem.image) && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                            <img
                              src={
                                selectedItem.imagePreview || selectedItem.image
                              }
                              alt="Preview"
                              className="w-full h-full object-contain bg-slate-900"
                            />
                            {uploadFileLoading && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="text-white text-sm">
                                  Uploading...
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      selectedItem.image && (
                        <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.title}
                            className="w-full h-full object-contain bg-slate-900"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={selectedItem.skillsInput || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          skillsInput: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      placeholder="e.g. React, Node.js, MongoDB"
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Collaborators (comma separated, optional)
                    </label>
                    <input
                      type="text"
                      value={selectedItem.collaboratorsInput || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          collaboratorsInput: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      placeholder="e.g. John Doe, Jane Smith"
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </>
              )}

              {modalType === "certificate" && (
                <>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={selectedItem.issuer || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          issuer: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      value={selectedItem.description || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                        Month
                      </label>
                      <input
                        type="text"
                        value={selectedItem.month || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            month: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        value={selectedItem.year || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            year: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Credential URL
                    </label>
                    <input
                      type="text"
                      value={selectedItem.credentialUrl || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          credentialUrl: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </>
              )}

              {modalType === "skill" && (
                <>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Category Title
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={selectedItem.itemsInput || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          itemsInput: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      placeholder="e.g. JavaScript, Python, Java"
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-900 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-800 border-t border-cyan-400/30 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 rounded-b-xl">
              {!isEditing && (selectedItem._id || selectedItem.id) ? (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-slate-700 text-white text-sm sm:text-base rounded-lg hover:bg-slate-600 transition-all order-2 sm:order-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-cyan-400 text-slate-900 font-semibold text-sm sm:text-base rounded-lg hover:bg-cyan-500 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
                  >
                    <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-slate-700 text-white text-sm sm:text-base rounded-lg hover:bg-slate-600 transition-all order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateItem}
                    disabled={uploadFileLoading}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-cyan-400 text-slate-900 font-semibold text-sm sm:text-base rounded-lg hover:bg-cyan-500 transition-all flex items-center justify-center gap-2 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                    {uploadFileLoading
                      ? "Uploading..."
                      : selectedItem._id || selectedItem.id
                      ? "Save Changes"
                      : "Create"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
