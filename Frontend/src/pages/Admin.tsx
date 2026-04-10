import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, Plus, LogOut, ArrowLeft, Camera, Film, LayoutDashboard, Image, Video } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClass =
    "w-full bg-transparent border border-gold-muted px-5 py-3.5 text-sm font-body focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/60";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 border border-gold/40 rounded-full flex items-center justify-center">
            <Camera size={24} className="text-gold" />
          </div>
          <h1 className="font-heading text-3xl mb-2">Admin Panel</h1>
          <p className="text-xs text-gold-dark uppercase tracking-[0.3em]">RP Photography</p>
          <div className="gold-divider mt-4" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          <button
            type="submit"
            className="w-full px-8 py-3.5 bg-gradient-to-r from-gold-dark to-gold text-white text-xs uppercase tracking-[0.25em] font-body hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold-dark transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={12} /> Back to Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  // ── Fetch real data from backend on mount ──
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/images`).then(res => res.json()).then(setImages);
    fetch(`${import.meta.env.VITE_API_URL}/api/videos`).then(res => res.json()).then(setVideos);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", category);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    setImages(prev => [data, ...prev]);
    setSelectedFile(null);
    setPreviewUrl(null);
    setCategory("");
  };

  const handleDeleteImage = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/images/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setImages(prev => prev.filter(img => img._id !== id));
  };

  const handleAddVideo = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, url }),
    });

    const data = await res.json();
    setVideos(prev => [data, ...prev]);
    setTitle("");
    setUrl("");
  };

  const handleDeleteVideo = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/videos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setVideos(prev => prev.filter(v => v._id !== id));
  };

  const inputClass =
    "w-full bg-transparent border border-gold-muted px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/60";

  const tabs = [
    { key: "images" as const, label: "Images", icon: Image },
    { key: "videos" as const, label: "Videos", icon: Video },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Premium header */}
      <header className="border-b border-gold-muted/50 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/40 rounded-full flex items-center justify-center">
              <LayoutDashboard size={14} className="text-gold" />
            </div>
            <div>
              <h1 className="font-heading text-xl leading-tight">RP Admin</h1>
              <p className="text-[10px] text-gold-dark uppercase tracking-[0.2em]">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold-dark transition-colors"
            >
              <ArrowLeft size={12} /> Site
            </Link>
            <div className="w-[1px] h-4 bg-gold-muted" />
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gold-muted/30">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] px-5 py-3 border-b-2 transition-all -mb-[1px] ${
                activeTab === tab.key
                  ? "border-gold text-gold-dark"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── IMAGES TAB ── */}
        {activeTab === "images" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Upload form */}
            <div className="bg-card border border-gold-muted/50 p-6 md:p-8 mb-8">
              <h3 className="font-heading text-lg mb-1">Upload Image</h3>
              <p className="text-[11px] text-muted-foreground mb-5">Add a new photo to your gallery</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="border-2 border-dashed border-gold-muted p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gold-muted/20 transition-all rounded-sm group relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                  ) : (
                    <>
                      <Upload size={28} className="text-gold/60 mb-3 group-hover:text-gold transition-colors" />
                      <p className="text-xs text-muted-foreground group-hover:text-gold-dark transition-colors">Choose file</p>
                    </>
                  )}
                  {selectedFile && (
                    <p className="absolute bottom-1 text-[10px] text-gold-dark bg-background/80 px-2 py-0.5 truncate max-w-full">
                      {selectedFile.name}
                    </p>
                  )}
                </label>

                <input
                  placeholder="Type a category (e.g. Wedding, Candid)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                />

                <button
                  onClick={handleUpload}
                  className="px-6 py-3 bg-gradient-to-r from-gold-dark to-gold text-white text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Plus size={14} /> Add Image
                </button>
              </div>
            </div>

            {/* Real image grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-gold-muted/50 p-3 group hover:border-gold/40 transition-colors"
                >
                  <div className="w-full h-36 bg-gold-muted/30 mb-3 overflow-hidden">
                    {img.url ? (
                      <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image size={24} className="text-gold/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs truncate font-medium">{img.filename || "Image"}</p>
                      <p className="text-[10px] text-gold-dark">{img.category}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteImage(img._id)}
                      className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── VIDEOS TAB ── */}
        {activeTab === "videos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Add video form */}
            <div className="bg-card border border-gold-muted/50 p-6 md:p-8 mb-8">
              <h3 className="font-heading text-lg mb-1">Add Video</h3>
              <p className="text-[11px] text-muted-foreground mb-5">Add a YouTube wedding film</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  placeholder="Video Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="YouTube Video ID"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={inputClass}
                />
                <button
                  onClick={handleAddVideo}
                  className="px-6 py-3 bg-gradient-to-r from-gold-dark to-gold text-white text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Plus size={14} /> Add Video
                </button>
              </div>
            </div>

            {/* Videos Grid with Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((v, i) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-gold-muted/50 p-3 group hover:border-gold/40 transition-colors overflow-hidden rounded-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-full h-36 bg-gold-muted/30 mb-3 overflow-hidden flex items-center justify-center relative group/thumb">
                    <img 
                      src={`https://img.youtube.com/vi/${v.youtubeId || v.url}/hqdefault.jpg`} 
                      alt={v.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <Film size={24} className="text-gold" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{v.title}</p>
                      <p className="text-[10px] text-gold-dark truncate">{v.youtubeId || v.url}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteVideo(v._id)}
                      className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin;