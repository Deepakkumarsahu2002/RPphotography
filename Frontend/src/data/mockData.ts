import galleryWedding1 from "@/assets/gallery-wedding-1.jpg";
import galleryPrewedding1 from "@/assets/gallery-prewedding-1.jpg";
import galleryCandid1 from "@/assets/gallery-candid-1.jpg";
import galleryEngagement1 from "@/assets/gallery-engagement-1.jpg";
import galleryTraditional1 from "@/assets/gallery-traditional-1.jpg";
import galleryReception1 from "@/assets/gallery-reception-1.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export type GalleryCategory = "All" | "Wedding" | "Pre-Wedding" | "Engagement" | "Candid" | "Traditional" | "Reception";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  aspect: "portrait" | "landscape" | "square";
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  includes: string[];
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  event: string;
  category: "Wedding" | "Pre-Wedding" | "Engagement" | "Birthday" | "Ad Shoot";
  rating: number;
}

export const heroImages = [hero1, hero2, hero3];

export const galleryImages: GalleryImage[] = [
  { id: "1", src: galleryWedding1, alt: "Wedding ceremony", category: "Wedding", aspect: "portrait" },
  { id: "2", src: galleryPrewedding1, alt: "Pre-wedding couple shoot", category: "Pre-Wedding", aspect: "portrait" },
  { id: "3", src: galleryCandid1, alt: "Candid celebration moment", category: "Candid", aspect: "landscape" },
  { id: "4", src: galleryEngagement1, alt: "Engagement ring detail", category: "Engagement", aspect: "portrait" },
  { id: "5", src: galleryTraditional1, alt: "Traditional ceremony", category: "Traditional", aspect: "landscape" },
  { id: "6", src: galleryReception1, alt: "Reception first dance", category: "Reception", aspect: "landscape" },
  { id: "7", src: hero1, alt: "Garden wedding portrait", category: "Wedding", aspect: "landscape" },
  { id: "8", src: hero2, alt: "Reception table details", category: "Reception", aspect: "landscape" },
  { id: "9", src: hero3, alt: "Sunset couple silhouette", category: "Pre-Wedding", aspect: "landscape" },
];

export const videoItems: VideoItem[] = [
  { id: "1", title: "Ananya & Rohit — A Timeless Union", description: "A cinematic wedding film capturing every emotion", youtubeId: "dQw4w9WgXcQ", thumbnail: hero1 },
  { id: "2", title: "Priya & Arjun — Love in the Hills", description: "Pre-wedding story set in the misty mountains", youtubeId: "dQw4w9WgXcQ", thumbnail: hero3 },
  { id: "3", title: "Meera & Vikram — Royal Celebration", description: "A grand traditional wedding celebration", youtubeId: "dQw4w9WgXcQ", thumbnail: hero2 },
];

export const packages: Package[] = [
  {
    id: "1",
    name: "Pre-Wedding Photography",
    description: "Capture your love story in stunning locations before the big day.",
    includes: ["4–6 hours of shooting", "2 outfit changes", "100+ edited photos", "Online gallery", "10 premium prints"],
    price: "₹25,000",
  },
  {
    id: "2",
    name: "Wedding Photography",
    description: "Complete coverage of your wedding day — every ritual, every emotion.",
    includes: ["Full-day coverage", "2 photographers", "500+ edited photos", "Premium photo album", "Highlight reel video", "Online gallery"],
    price: "₹75,000",
  },
  {
    id: "3",
    name: "Birthday & Events",
    description: "Make every celebration memorable with professional photography.",
    includes: ["3–5 hours coverage", "1 photographer", "200+ edited photos", "Online gallery", "Digital delivery"],
    price: "₹15,000",
  },
  {
    id: "4",
    name: "Engagement & Couple Shoots",
    description: "Intimate portraits that tell your unique love story.",
    includes: ["3 hours shooting", "1 location", "75+ edited photos", "Online gallery", "5 premium prints"],
    price: "₹18,000",
  },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Ananya & Rohit", text: "Rudra captured our wedding so beautifully. Every photo tells a story — we couldn't have asked for a better photographer. The attention to detail was extraordinary.", event: "Wedding, Kolkata", category: "Wedding", rating: 5 },
  { id: "2", name: "Priya Sharma", text: "The pre-wedding shoot was magical. Rudra made us feel so comfortable and the results were beyond our expectations. Truly an artist.", event: "Pre-Wedding, Darjeeling", category: "Pre-Wedding", rating: 4.5 },
  { id: "3", name: "Meera & Vikram", text: "Professional, creative, and incredibly talented. Our wedding album is something we'll cherish forever. Thank you for making our day unforgettable.", event: "Wedding, Mumbai", category: "Wedding", rating: 5 },
  { id: "4", name: "Divya Mishra", text: "Our engagement photos are literally perfect! Rudra's ability to capture genuine emotions is unmatched. We got so many compliments from friends and family.", event: "Engagement, Bangalore", category: "Engagement", rating: 4 },
  { id: "5", name: "Rajesh & Sneha", text: "The pre-wedding shoot in Goa was the best decision. Rudra was so professional yet made us laugh and be ourselves. The photos are straight out of a magazine!", event: "Pre-Wedding, Goa", category: "Pre-Wedding", rating: 5 },
  { id: "6", name: "Aisha Khan", text: "Rudra photographed my sister's birthday party and captured all the candid laughter and joy. Every shot was perfectly composed. Highly recommended!", event: "Birthday Party, Delhi", category: "Birthday", rating: 4.5 },
  { id: "7", name: "Sharma & Co. Marketing", text: "We hired Rudra for our product photoshoot and he delivered stunning imagery that elevated our brand. Professional, punctual, and incredibly creative.", event: "Ad Campaign, Mumbai", category: "Ad Shoot", rating: 4 },
  { id: "8", name: "Sarah & Michael", text: "Our wedding day was made even more special by Rudra's photography. He has an incredible eye for those unscripted moments that we'll treasure forever.", event: "Wedding, Kolkata", category: "Wedding", rating: 5 },
  { id: "9", name: "Neha Kapoor", text: "The engagement shoot was so much fun! Rudra made us feel relaxed and natural. We got the most beautiful pictures that exceeded our expectations completely.", event: "Engagement, Pune", category: "Engagement", rating: 4.5 },
  { id: "10", name: "Ravi & Anjali", text: "Pre-wedding coverage in Jaipur was absolutely phenomenal. Every frame tells our love story. We couldn't stop crying when we saw the final album!", event: "Pre-Wedding, Jaipur", category: "Pre-Wedding", rating: 5 },
  { id: "11", name: "Luxury Brands India", text: "Working with Rudra on our fashion photography was a game-changer. His technical expertise and artistic vision transformed our vision into reality perfectly.", event: "Fashion Shoot", category: "Ad Shoot", rating: 4 },
  { id: "12", name: "Tanvi's Birthday Bash", text: "The birthday party photos captured all the fun and celebration in such a beautiful way. Every frame sparkles with joy. Thank you, Rudra!", event: "Birthday Celebration, Hyderabad", category: "Birthday", rating: 4.5 },
];

export const galleryCategories: GalleryCategory[] = ["All", "Wedding", "Pre-Wedding", "Engagement", "Candid", "Traditional", "Reception"];
