export const pointToGetBadge = 60;

import { LocationTag } from "@prisma/client";
export const countryOptions = [
  { value: "AF", label: "Afghanistan" },
  { value: "AX", label: "Åland Islands" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AS", label: "American Samoa" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AI", label: "Anguilla" },
  { value: "AQ", label: "Antarctica" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AW", label: "Aruba" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbados" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BM", label: "Bermuda" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brazil" },
  { value: "IO", label: "British Indian Ocean Territory" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BG", label: "Bulgaria" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "CV", label: "Cabo Verde" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "KY", label: "Cayman Islands" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CX", label: "Christmas Island" },
  { value: "CC", label: "Cocos (Keeling) Islands" },
  { value: "CO", label: "Colombia" },
  { value: "KM", label: "Comoros" },
  { value: "CG", label: "Congo" },
  { value: "CD", label: "Congo (Democratic Republic of the)" },
  { value: "CR", label: "Costa Rica" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CW", label: "Curaçao" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czechia" },
  { value: "DK", label: "Denmark" },
  { value: "DJ", label: "Djibouti" },
  { value: "DM", label: "Dominica" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "EE", label: "Estonia" },
  { value: "SZ", label: "Eswatini" },
  { value: "ET", label: "Ethiopia" },
  { value: "FK", label: "Falkland Islands" },
  { value: "FO", label: "Faroe Islands" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "GF", label: "French Guiana" },
  { value: "PF", label: "French Polynesia" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GE", label: "Georgia" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "GD", label: "Grenada" },
  { value: "GT", label: "Guatemala" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "HT", label: "Haiti" },
  { value: "HN", label: "Honduras" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JM", label: "Jamaica" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KI", label: "Kiribati" },
  { value: "KR", label: "Korea (Republic of)" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LA", label: "Lao People's Democratic Republic" },
  { value: "LV", label: "Latvia" },
  { value: "LB", label: "Lebanon" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MG", label: "Madagascar" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "ML", label: "Mali" },
  { value: "MT", label: "Malta" },
  { value: "MX", label: "Mexico" },
  { value: "MA", label: "Morocco" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NG", label: "Nigeria" },
  { value: "NO", label: "Norway" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russia" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SG", label: "Singapore" },
  { value: "ZA", label: "South Africa" },
  { value: "ES", label: "Spain" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
];

export const universityInMelbourne = [
  { value: "Monash University", label: "Monash University" },
  { value: "University of Melbourne", label: "University of Melbourne" },
  { value: "RMIT University", label: "RMIT University" },
  { value: "Deakin University", label: "Deakin University" },
  { value: "La Trobe University", label: "La Trobe University" },
  {
    value: "Swinburne University of Technology",
    label: "Swinburne University of Technology",
  },
  { value: "Victoria University", label: "Victoria University" },
  {
    value: "Australian Catholic University",
    label: "Australian Catholic University",
  },
  {
    value: "Federation University Australia",
    label: "Federation University Australia",
  },
  {
    value: "Torrens University Australia",
    label: "Torrens University Australia",
  },
  { value: "Holmesglen Institute", label: "Holmesglen Institute" },
  { value: "Melbourne Polytechnic", label: "Melbourne Polytechnic" },
  { value: "William Angliss Institute", label: "William Angliss Institute" },
  { value: "Box Hill Institute", label: "Box Hill Institute" },
  { value: "Chisholm Institute", label: "Chisholm Institute" },
  { value: "Kangan Institute", label: "Kangan Institute" },
  {
    value: "Melbourne Institute of Technology",
    label: "Melbourne Institute of Technology",
  },
];

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  aboutMe: string;
  badges: { label: string; color: string; icon: string }[];
  points: number;
}

export interface StoreItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  exchanged: number;
}

export const mockUser: User = {
  name: "Vatana Chhorn",
  email: "Onlyvatana23@gmail.com",
  avatarUrl:
    "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
  aboutMe:
    "Hello, My name is Vatana Chhorn. I'm a UI/UX designer passionate about creating user-friendly interfaces. I believe that great design can transform user experiences and drive business success.",
  badges: [
    { label: "Historical Expert", color: "bg-yellow-100", icon: "🏛️" },
    { label: "Culture Guru", color: "bg-green-100", icon: "👤" },
  ],
  points: 300,
};

export const mockStoreItems: StoreItem[] = [
  {
    id: "1",
    name: "Lamborghini Urus",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no", // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
  {
    id: "2",
    name: "Luxury Armchair",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no", // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
  {
    id: "3",
    name: "Tshirt",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no", // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
  {
    id: "4",
    name: "Stickers",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no", // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
];

export const categoryTitleMap: Record<LocationTag, string> = {
  HISTORICAL: "🏛️ Historian",
  ART: "🎨 Artist",
  CULTURAL: "🥮 Aficionado",
  NATURE: "🍀 Ecologist",
};
export const categoryUiAttributeMap: Record<
  LocationTag,
  { color: string; description: string }
> = {
  HISTORICAL: {
    color: "#C23A2B",
    description:
      "Dive into the past and explore landmarks, monuments, and stories that shaped history.",
  },
  ART: {
    color: "#D07F1E",
    description:
      "Celebrate creativity by discovering galleries, murals, and artistic masterpieces.",
  },
  CULTURAL: {
    color: "#C435C0",
    description:
      "Immerse yourself in traditions, festivals, and cuisines that define diverse cultures.",
  },
  NATURE: {
    color: "#007B5D",
    description:
      "Reconnect with the outdoors through lush landscapes, wildlife, and serene natural beauty.",
  },
};

export const mockFriends = [
  {
    id: 1,
    name: "Gary Butcher",
    message: "Nathan is a hater, you can totes make that jump. Do it. Do it.",
    timestamp: "8:32 AM",
    avatar: "/api/placeholder/40/40",
    isActive: true,
  },
  {
    id: 2,
    name: "Dee McRobie",
    message:
      "There's no way you'll be able to jump your motorcycle over that bus.",
    timestamp: "8:35 AM",
    avatar: "/api/placeholder/40/40",
    isActive: false,
  },
  {
    id: 3,
    name: "Zach Friedman",
    message:
      "Tabs make way more sense than spaces. Convince me I'm wrong. LOL.",
    timestamp: "9:00 AM",
    avatar: "/api/placeholder/40/40",
    isActive: true,
  },
  {
    id: 4,
    name: "Daisy Tinsley",
    message: "Maybe email isn't the best form of communication.",
    timestamp: "9:20 AM",
    avatar: "/api/placeholder/40/40",
    isActive: false,
  },
  {
    id: 5,
    name: "Erin Steed",
    message:
      '(Sad fact: you cannot search for a gif of the word "gif", just gives you gifs.)',
    timestamp: "9:28 AM",
    avatar: "/api/placeholder/40/40",
    isActive: true,
  },
  {
    id: 6,
    name: "Stephen Yustiono",
    message:
      "Nice. I don't know why people get all worked up about hawaiian pizza. I ...",
    timestamp: "9:36 AM",
    avatar: "/api/placeholder/40/40",
    isActive: false,
  },
];

import BadgeHistorical from "../public/badges/HISTORICAL.svg";
import BadgeNature from "../public/badges/NATURE.svg";
import BadgeCultural from "../public/badges/CULTURAL.svg";
import BadgeArt from "../public/badges/ART.svg";
export const categoryBadges = {
  [LocationTag.HISTORICAL]: BadgeHistorical,
  [LocationTag.NATURE]: BadgeNature,
  [LocationTag.CULTURAL]: BadgeCultural,
  [LocationTag.ART]: BadgeArt,
};
