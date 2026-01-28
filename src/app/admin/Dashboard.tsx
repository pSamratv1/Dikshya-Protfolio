"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useTransition } from "react";
import {
  updateHero,
  updateAbout,
  addGuest,
  updateGuest,
  deleteGuest,
  addPodcast,
  updatePodcast,
  deletePodcast,
  addGalleryImage,
  deleteGalleryImage,
  addProduct,
  updateProduct,
  deleteProduct,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/action";
import { extractYouTubeID, getYouTubeThumbnail } from "@/lib/utils";
import ImagePicker from "@/components/ui/ImageUpload";
import ProductImageUpload from "@/components/ui/ProductImageUpload";
import OrdersTab from "@/components/admin/OrderTabs";

// --- ICONS ---
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- UI COMPONENTS ---
const TabButton = ({ active, label, onClick }: any) => (
  <button
    onClick={onClick}
    className={`group flex items-center justify-between w-full text-left px-0 py-4 text-[10px] font-sans tracking-[0.25em] uppercase transition-all duration-500 border-b ${
      active
        ? "border-black text-black"
        : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
    }`}
  >
    <span>{label}</span>
    <span
      className={`h-1 w-1 rounded-full bg-black transition-all ${
        active ? "opacity-100" : "opacity-0"
      }`}
    ></span>
  </button>
);

const InputGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="group space-y-3 mb-8">
    <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-[#B0A285] transition-colors duration-500">
      {label}
    </label>
    {children}
  </div>
);

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <input
      {...props}
      className="w-full bg-transparent border-b border-[#E5E2D9] py-3 font-serif text-lg md:text-xl text-[#1C1B1A] placeholder:font-sans placeholder:text-xs placeholder:uppercase placeholder:tracking-widest placeholder:text-gray-300 focus:outline-none focus:border-[#1C1B1A] transition-all duration-500"
    />
  </div>
);

const StyledTextArea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    rows={props.rows || 4}
    className="w-full bg-[#FAFAFA] border border-[#E5E2D9] p-1 md:p-2 font-serif text-base md:text-lg text-black placeholder:font-sans placeholder:text-xs placeholder:uppercase placeholder:tracking-widest placeholder:text-gray-300 focus:outline-none focus:border-[#1C1B1A] focus:bg-white transition-all duration-500 resize-none"
  />
);

const ActionButton = ({ children, onClick, disabled, loading }: any) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className="w-full py-4 md:py-5 bg-[#1C1B1A] text-white font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-[#B0A285] transition-colors duration-500 disabled:opacity-50"
  >
    {loading ? "Processing..." : children}
  </button>
);

// --- LIST ITEM COMPONENT ---
const ListItem = ({ title, subtitle, image, onEdit, onDelete }: any) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-100 hover:bg-white transition-all duration-300 gap-4">
    <div className="flex items-center gap-4">
      {image && (
        <img
          src={image}
          alt=""
          className="w-10 h-10 object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
        />
      )}
      <div className="overflow-hidden">
        <h4 className="font-serif text-lg leading-none truncate">{title}</h4>
        <p className="font-sans text-[9px] uppercase tracking-widest text-gray-400 mt-1 truncate">
          {subtitle}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 self-end md:self-auto">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black"
        >
          Edit
        </button>
      )}
      <button
        onClick={onDelete}
        className="text-[9px] uppercase tracking-widest text-red-300 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

const ProductListItem = ({
  title,
  price,
  category,
  quantity,
  image,
  onEdit,
  onDelete,
}: any) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-100 hover:bg-white transition-all duration-300 gap-4">
    <div className="flex items-center gap-4">
      {image && (
        <img
          src={image}
          alt=""
          className="w-10 h-10 object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
        />
      )}
      <div className="overflow-hidden">
        <h4 className="font-serif text-lg leading-none truncate">{title}</h4>
        <p className="font-sans text-[9px] uppercase tracking-widest text-gray-400 mt-1 truncate">
          {price} | {category} | {quantity}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 self-end md:self-auto">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black"
        >
          Edit
        </button>
      )}
      <button
        onClick={onDelete}
        className="text-[9px] uppercase tracking-widest text-red-300 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

// --- DASHBOARD COMPONENT ---
export default function Dashboard({ initialData }: { initialData: any }) {
  const { user, isLoaded } = useUser();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("guests");

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State
  const [heroForm, setHeroForm] = useState(initialData.hero || {});
  const [aboutForm, setAboutForm] = useState(initialData.about || {});

  // Guest State
  const [guestForm, setGuestForm] = useState({
    id: "",
    name: "",
    role: "",
    image: "",
    link: "",
  });
  const [isEditingGuest, setIsEditingGuest] = useState(false);

  // Podcast State
  const [podcastForm, setPodcastForm] = useState({
    id: "",
    videoId: "",
    title: "",
    description: "",
  });

  // Testimonail State
  const [testimonialForm, setTestimonialForm] = useState({
    id: "",
    quote: "",
    author: "",
    role: "",
  });

  // Product State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    images: [] as string[],
    videos: [] as string[],
  });

  const [isEditingPodcast, setIsEditingPodcast] = useState(false);
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  const [galleryUrl, setGalleryUrl] = useState("");

  if (!isLoaded) return <div>Loading...</div>;

  // --- HELPER TO CLOSE MOBILE MENU ON TAB CLICK ---
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close menu
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  // --- HANDLERS ---

  // Hero & About (Same as before)
  const handleHeroSubmit = () =>
    startTransition(async () => {
      await updateHero(heroForm);
      alert("Hero Saved");
    });
  const handleAboutSubmit = () =>
    startTransition(async () => {
      await updateAbout(aboutForm);
      alert("About Saved");
    });

  // Guest Handlers (Create & Update)
  const handleGuestSubmit = () =>
    startTransition(async () => {
      if (isEditingGuest && guestForm.id) {
        await updateGuest(guestForm.id, guestForm); // Update
        setIsEditingGuest(false);
      } else {
        await addGuest(guestForm); // Create
      }
      setGuestForm({ id: "", name: "", role: "", image: "", link: "" });
    });

  const handleEditGuest = (guest: any) => {
    setGuestForm(guest);
    setIsEditingGuest(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form
  };

  // Testimonial Handlers
  const handleTestimonialSubmit = () =>
    startTransition(async () => {
      if (isEditingTestimonial && testimonialForm.id) {
        await updateTestimonial(testimonialForm.id, testimonialForm);
        setIsEditingTestimonial(false);
        alert("Testimonial Updated");
      } else {
        await addTestimonial(testimonialForm);
        alert("Testimonial Added");
      }
      // Reset Form
      setTestimonialForm({ id: "", quote: "", author: "", role: "" });
    });

  const handleEditTestimonial = (item: any) => {
    setTestimonialForm(item);
    setIsEditingTestimonial(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Podcast Handlers
  const handlePodcastSubmit = () =>
    startTransition(async () => {
      if (isEditingPodcast && podcastForm.id) {
        await updatePodcast(podcastForm.id, podcastForm);
        setIsEditingPodcast(false);
      } else {
        await addPodcast(podcastForm);
      }
      setPodcastForm({ id: "", videoId: "", title: "", description: "" });
    });

  const handleEditPodcast = (pod: any) => {
    setPodcastForm(pod);
    setIsEditingPodcast(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Index for additional Images
  let actualImageIndex: number = 1;

  // Index for additional Videos
  let actualVideoIndex: number = 1;

  // 1. Get the Name
  const firstName = user?.fullName;

  // 2. Get the Role from publicMetadata
  // We use type casting here or the global.d.ts method to avoid TS errors
  const role = user?.publicMetadata?.role as string | undefined;

  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#1C1B1A] font-sans">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-8 py-4 md:py-6 flex justify-between items-center mix-blend-darken bg-[#F2F0E9]/90 backdrop-blur-sm border-b border-black/5">
        <span className="font-serif text-xl md:text-2xl">
          Dikshya.<span className="text-[#B0A285] italic">Studio</span>
        </span>

        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <div className="-space-y-6 ">
              <h2 className="font-serif text-sm">{firstName}</h2>
              <p className="font-sans text-end text-[10px] uppercase tracking-widest text-gray-400">
                {role}
              </p>
            </div>
            <UserButton />
          </div>
          {/* HAMBURGER BUTTON (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-2 text-black"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div
        className={`fixed inset-0 z-[60] bg-[#F2F0E9] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif text-2xl italic text-[#B0A285]">
              Menu
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto">
            {[
              "hero",
              "about",
              "podcast",
              "guests",
              "gallery",
              "testimonials",
              "products",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`block w-full text-left text-xl font-serif py-3 border-b border-gray-200 ${
                  activeTab === tab ? "text-black italic" : "text-gray-400"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto pt-24 md:pt-32 pb-20 px-6 lg:px-12 flex flex-col md:flex-row gap-12 md:gap-20">
        {/* --- DESKTOP SIDEBAR (Hidden on Mobile) --- */}
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-40 h-fit">
          <p className="font-serif text-3xl italic text-[#B0A285] mb-8">
            Contents
          </p>
          <div className="space-y-2">
            <TabButton
              active={activeTab === "hero"}
              label="01 / Hero"
              onClick={() => setActiveTab("hero")}
            />
            <TabButton
              active={activeTab === "about"}
              label="02 / About"
              onClick={() => setActiveTab("about")}
            />
            <TabButton
              active={activeTab === "podcast"}
              label="03 / Podcast"
              onClick={() => setActiveTab("podcast")}
            />
            <TabButton
              active={activeTab === "guests"}
              label="04 / Guests"
              onClick={() => setActiveTab("guests")}
            />
            <TabButton
              active={activeTab === "gallery"}
              label="05 / Gallery"
              onClick={() => setActiveTab("gallery")}
            />
            <TabButton
              active={activeTab === "testimonials"}
              label="06 / Testimonials"
              onClick={() => setActiveTab("testimonials")}
            />
            <TabButton
              active={activeTab === "products"}
              label="07 / Product"
              onClick={() => setActiveTab("products")}
            />
            <TabButton
              active={activeTab === "orders"}
              label="08 / Orders"
              onClick={() => setActiveTab("orders")}
            />
          </div>
        </aside>

        {/* --- MAIN CONTENT WORKSPACE --- */}
        <main className="flex-grow max-w-5xl pt-4 w-full">
          {/* HERO TAB */}
          {activeTab === "hero" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                The Hero
              </h1>
              <div className="bg-white p-6 md:p-12 shadow-sm">
                <InputGroup label="Headline">
                  <StyledInput
                    value={heroForm.headline}
                    onChange={(e) =>
                      setHeroForm({ ...heroForm, headline: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup label="Sub-Headline">
                  <StyledInput
                    value={heroForm.subheadline}
                    onChange={(e) =>
                      setHeroForm({ ...heroForm, subheadline: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup label="Video URL">
                  <StyledInput
                    value={heroForm.videoUrl}
                    onChange={(e) =>
                      setHeroForm({ ...heroForm, videoUrl: e.target.value })
                    }
                  />
                </InputGroup>
                <div className="mt-8">
                  <ActionButton onClick={handleHeroSubmit} loading={isPending}>
                    Update Hero
                  </ActionButton>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                About
              </h1>
              <div className="bg-white p-6 md:p-12 shadow-sm">
                <InputGroup label="Title">
                  <StyledInput
                    value={aboutForm.title}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, title: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup label="Lead Text">
                  <StyledTextArea
                    value={aboutForm.lead}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, lead: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup label="Body Text">
                  <StyledTextArea
                    value={aboutForm.body}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, body: e.target.value })
                    }
                  />
                </InputGroup>
                <div className="mb-8">
                  <ImagePicker
                    label="Profile Image"
                    defaultValue={aboutForm.imageUrl}
                    onImageSelect={(url) =>
                      setAboutForm({ ...aboutForm, imageUrl: url })
                    }
                  />
                </div>

                <ActionButton onClick={handleAboutSubmit} loading={isPending}>
                  Update About
                </ActionButton>
              </div>
            </div>
          )}

          {/* GUESTS TAB */}
          {activeTab === "guests" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                The Network
              </h1>

              {/* FORM */}
              <div className="bg-white p-6 md:p-12 shadow-sm mb-12 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gray-300">
                  {isEditingGuest ? "Editing Guest" : "New Entry"}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Full Name">
                    <StyledInput
                      value={guestForm.name}
                      onChange={(e) =>
                        setGuestForm({ ...guestForm, name: e.target.value })
                      }
                    />
                  </InputGroup>
                  <InputGroup label="Role">
                    <StyledInput
                      value={guestForm.role}
                      onChange={(e) =>
                        setGuestForm({ ...guestForm, role: e.target.value })
                      }
                    />
                  </InputGroup>
                </div>
                <div className="mb-8 mt-8">
                  <ImagePicker
                    label="Guest Photo"
                    defaultValue={guestForm.image}
                    onImageSelect={(url) =>
                      setGuestForm({ ...guestForm, image: url })
                    }
                  />
                </div>
                <InputGroup label="Profile Link">
                  <StyledInput
                    value={guestForm.link}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, link: e.target.value })
                    }
                  />
                </InputGroup>
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  {isEditingGuest && (
                    <button
                      onClick={() => {
                        setIsEditingGuest(false);
                        setGuestForm({
                          id: "",
                          name: "",
                          role: "",
                          image: "",
                          link: "",
                        });
                      }}
                      className="px-6 py-4 border border-gray-200 text-[10px] uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                  )}
                  <ActionButton onClick={handleGuestSubmit} loading={isPending}>
                    {isEditingGuest ? "Update Guest" : "+ Add Guest"}
                  </ActionButton>
                </div>
              </div>

              {/* LIST ARCHIVE */}
              <div className="md:pl-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                  Active Guests ({initialData.guests.length})
                </p>
                <div className="space-y-2">
                  {initialData.guests.map((g: any) => (
                    <ListItem
                      key={g.id}
                      title={g.name}
                      subtitle={g.role}
                      image={g.image}
                      onEdit={() => handleEditGuest(g)}
                      onDelete={() => startTransition(() => deleteGuest(g.id))}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PODCAST TAB */}
          {activeTab === "podcast" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                Podcasts
              </h1>

              <div className="bg-white p-6 md:p-12 shadow-sm mb-12 relative">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gray-300">
                  {isEditingPodcast ? "Editing Episode" : "New Entry"}
                </div>

                <InputGroup label="YouTube Link or ID">
                  <StyledInput
                    placeholder="Paste full link..."
                    value={podcastForm.videoId}
                    onChange={(e) => {
                      const val = e.target.value;
                      const extractedId = extractYouTubeID(val) || val;
                      setPodcastForm({ ...podcastForm, videoId: extractedId });
                    }}
                  />
                </InputGroup>

                {podcastForm.videoId && podcastForm.videoId.length > 5 && (
                  <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                    <p className="font-sans text-[9px] uppercase tracking-widest text-gray-400 mb-3">
                      Thumbnail Preview
                    </p>
                    <div className="w-full aspect-video bg-black/5 relative overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={getYouTubeThumbnail(podcastForm.videoId)}
                        className="w-full h-full object-cover"
                        alt="Preview"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  </div>
                )}

                <InputGroup label="Title">
                  <StyledInput
                    value={podcastForm.title}
                    onChange={(e) =>
                      setPodcastForm({ ...podcastForm, title: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup label="Description">
                  <StyledTextArea
                    value={podcastForm.description}
                    onChange={(e) =>
                      setPodcastForm({
                        ...podcastForm,
                        description: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  {isEditingPodcast && (
                    <button
                      onClick={() => {
                        setIsEditingPodcast(false);
                        setPodcastForm({
                          id: "",
                          videoId: "",
                          title: "",
                          description: "",
                        });
                      }}
                      className="px-6 py-4 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <ActionButton
                    onClick={handlePodcastSubmit}
                    loading={isPending}
                  >
                    {isEditingPodcast ? "Update Episode" : "Publish Episode"}
                  </ActionButton>
                </div>
              </div>

              <div className="md:pl-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                  Published Episodes ({initialData.podcasts.length})
                </p>
                <div className="space-y-2">
                  {initialData.podcasts.map((p: any) => (
                    <ListItem
                      key={p.id}
                      title={p.title}
                      subtitle={`ID: ${p.videoId}`}
                      image={getYouTubeThumbnail(p.videoId)}
                      onEdit={() => handleEditPodcast(p)}
                      onDelete={() =>
                        startTransition(() => deletePodcast(p.id))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === "gallery" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                Gallery
              </h1>

              <div className="bg-white p-6 md:p-12 shadow-sm mb-12">
                <div className="mb-8">
                  <ImagePicker
                    label="Gallery Artwork"
                    defaultValue={galleryUrl}
                    onImageSelect={(url) => setGalleryUrl(url)}
                  />
                </div>
                <div className="mt-8">
                  <ActionButton
                    onClick={() =>
                      startTransition(async () => {
                        await addGalleryImage(galleryUrl);
                        setGalleryUrl("");
                      })
                    }
                    loading={isPending}
                  >
                    + Add Image
                  </ActionButton>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:pl-6">
                {initialData.gallery.map((img: any) => (
                  <div
                    key={img.id}
                    className="relative group aspect-square bg-gray-200"
                  >
                    <img
                      src={img.imageUrl}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        startTransition(() => deleteGalleryImage(img.id))
                      }
                      className="absolute inset-0 bg-red-900/80 text-white text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === "testimonials" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                Words
              </h1>

              <div className="bg-white p-6 md:p-12 shadow-sm mb-12 relative">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gray-300">
                  {isEditingTestimonial ? "Editing Quote" : "New Entry"}
                </div>

                <InputGroup label="The Quote">
                  <StyledTextArea
                    placeholder="She asks the questions that unlock the soul..."
                    value={testimonialForm.quote}
                    onChange={(e) =>
                      setTestimonialForm({
                        ...testimonialForm,
                        quote: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Author Name">
                    <StyledInput
                      placeholder="Jane Doe"
                      value={testimonialForm.author}
                      onChange={(e) =>
                        setTestimonialForm({
                          ...testimonialForm,
                          author: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                  <InputGroup label="Role / Title">
                    <StyledInput
                      placeholder="Founder, Company X"
                      value={testimonialForm.role}
                      onChange={(e) =>
                        setTestimonialForm({
                          ...testimonialForm,
                          role: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  {isEditingTestimonial && (
                    <button
                      onClick={() => {
                        setIsEditingTestimonial(false);
                        setTestimonialForm({
                          id: "",
                          quote: "",
                          author: "",
                          role: "",
                        });
                      }}
                      className="px-6 py-4 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <ActionButton
                    onClick={handleTestimonialSubmit}
                    loading={isPending}
                  >
                    {isEditingTestimonial ? "Update Quote" : "Add Quote"}
                  </ActionButton>
                </div>
              </div>

              <div className="md:pl-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                  Active Testimonials ({initialData.testimonials.length})
                </p>
                <div className="space-y-2">
                  {initialData.testimonials.map((t: any) => (
                    <ListItem
                      key={t.id}
                      title={t.author}
                      subtitle={t.role}
                      image={null}
                      onEdit={() => handleEditTestimonial(t)}
                      onDelete={() =>
                        startTransition(() => deleteTestimonial(t.id))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {/* --- PRODUCTS TAB --- */}
          {activeTab === "products" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="font-serif font-medium italic text-4xl md:text-6xl mb-8 md:mb-12 border-l-2 border-black pl-6">
                Store
              </h1>

              {/* --- PRODUCT FORM --- */}
              <div className="bg-white p-6 md:p-12 shadow-sm mb-12 relative">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-gray-300">
                  {isEditingProduct ? "Editing Product" : "New Entry"}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Product Name">
                    <StyledInput
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                    />
                  </InputGroup>
                  <InputGroup label="Price">
                    <StyledInput
                      type="number"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Quantity">
                    <StyledInput
                      type="number"
                      value={productForm.quantity}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                  <InputGroup label="Category">
                    <StyledInput
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                      className="opacity-50"
                    />
                  </InputGroup>
                </div>

                <InputGroup label="Description">
                  <StyledTextArea
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                {/* --- DYNAMIC IMAGES SECTION --- */}
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                    Product Images (First 2 are Front/Hover)
                  </p>

                  {/* Dynamic Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {productForm.images.map((imgUrl: string, index: number) => {
                      // Label logic: 0=Main, 1=Hover, 2+=Gallery
                      const label =
                        index === 0
                          ? "Main Image"
                          : index === 1
                            ? "Hover Reveal"
                            : `Gallery Image ${index + 1}`;

                      return (
                        <div key={index}>
                          {" "}
                          {/* Using index key ensures input stays mounted */}
                          <ProductImageUpload
                            label={label}
                            defaultValue={imgUrl} // This now auto-updates thanks to Step 1
                            onSuccess={(url) =>
                              setProductForm((prev: any) => {
                                const images = [...prev.images];
                                images[index] = url;
                                return { ...prev, images };
                              })
                            }
                          />
                          {/* Remove button for extra images */}
                          {index > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setProductForm((prev: any) => {
                                  const images = prev.images.filter(
                                    (_: any, i: number) => i !== index
                                  );
                                  return { ...prev, images };
                                })
                              }
                              className="text-[9px] text-red-400 mt-2 hover:underline"
                            >
                              Remove Image
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setProductForm((prev: any) => ({
                        ...prev,
                        images: [...prev.images, ""],
                      }))
                    }
                    className="mt-6 text-[9px] uppercase tracking-widest border-b border-black pb-1"
                  >
                    + Add Another Image
                  </button>
                </div>

                {/* --- DYNAMIC VIDEOS SECTION --- */}
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                    Shoppable Videos (MP4 Uploads or Links)
                  </p>

                  <div className="space-y-8">
                    {productForm.videos.map((vidUrl: string, index: number) => (
                      <div key={index} className="relative">
                        {/* REUSE IMAGE PICKER FOR VIDEOS */}
                        <ImagePicker
                          label={`Video ${index + 1}`}
                          defaultValue={vidUrl}
                          onImageSelect={(url) =>
                            setProductForm((prev: any) => {
                              const videos = [...prev.videos];
                              videos[index] = url;
                              return { ...prev, videos };
                            })
                          }
                        />

                        {/* Remove Button (Positioned to the right of the label) */}
                        <button
                          onClick={() =>
                            setProductForm((prev: any) => {
                              const videos = prev.videos.filter(
                                (_: any, i: number) => i !== index
                              );
                              return { ...prev, videos };
                            })
                          }
                          className="absolute -bottom-4 right-0 text-red-400 text-[9px] uppercase tracking-widest hover:text-red-600 hover:underline"
                        >
                          Remove Video
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setProductForm((prev: any) => ({
                        ...prev,
                        videos: [...prev.videos, ""], // Add empty slot
                      }))
                    }
                    className="mt-6 text-[9px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-70 transition-opacity"
                  >
                    + Add Another Video
                  </button>
                </div>

                {/* --- FORM ACTIONS --- */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4">
                  {isEditingProduct && (
                    <button
                      onClick={() => {
                        setIsEditingProduct(false);
                        setProductForm({
                          name: "",
                          price: "",
                          quantity: "",
                          category: "",
                          description: "",
                          images: ["", ""], // Reset to 2 slots
                          videos: ["", ""],
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-8 py-4 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}

                  <ActionButton
                    onClick={() =>
                      startTransition(async () => {
                        // Clean up empty slots before sending
                        const finalData = {
                          ...productForm,
                          images: productForm.images.filter(Boolean),
                          videos: productForm.videos.filter(Boolean),
                        };

                        if (isEditingProduct) {
                          await updateProduct(editingProductId!, finalData);
                          alert("Product Updated");
                          setIsEditingProduct(false);
                        } else {
                          await addProduct(finalData);
                          alert("Product Added");
                        }

                        // Reset Form
                        setProductForm({
                          name: "",
                          price: "",
                          quantity: "",
                          category: "",
                          description: "",
                          images: ["", ""],
                          videos: ["", ""],
                        });
                      })
                    }
                    loading={isPending}
                  >
                    {isEditingProduct ? "Save Changes" : "Add Product"}
                  </ActionButton>
                </div>
              </div>

              {/* --- PRODUCT ARCHIVE LIST --- */}
              <div className="md:pl-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                  Active Products ({initialData.products?.length || 0})
                </p>
                <div className="space-y-2">
                  {initialData.products?.map((p: any) => (
                    <ProductListItem
                      key={p.id}
                      title={p.name}
                      price={`Rs ${p.price}`}
                      category={p.category}
                      quantity={`${p.quantity} pcs`}
                      image={p.images[0] || null} // Show first image as thumbnail
                      onEdit={() => {
                        // Populate form with existing data
                        setEditingProductId(p.id);
                        setProductForm({
                          name: p.name,
                          price: p.price,
                          quantity: p.quantity,
                          category: p.category,
                          description: p.description,
                          // Ensure arrays have at least 2 slots for UI consistency
                          images: p.images.length > 0 ? p.images : ["", ""],
                          videos: p.videos.length > 0 ? p.videos : ["", ""],
                        });
                        setIsEditingProduct(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      onDelete={() =>
                        startTransition(() => deleteProduct(p.id))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {/* --- ORDERS TAB --- */}
          {activeTab === "orders" && <OrdersTab />}
        </main>
      </div>
    </div>
  );
}
