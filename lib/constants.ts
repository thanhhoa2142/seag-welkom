/** @format */

export const countryOptions = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AX', label: 'Åland Islands' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
];

export const universityInMelbourne = [
  { value: 'Monash University', label: 'Monash University' },
  { value: 'University of Melbourne', label: 'University of Melbourne' },
  { value: 'RMIT University', label: 'RMIT University' },
  { value: 'Deakin University', label: 'Deakin University' },
  { value: 'La Trobe University', label: 'La Trobe University' },
  {
    value: 'Swinburne University of Technology',
    label: 'Swinburne University of Technology',
  },
  { value: 'Victoria University', label: 'Victoria University' },
  {
    value: 'Australian Catholic University',
    label: 'Australian Catholic University',
  },
  {
    value: 'Federation University Australia',
    label: 'Federation University Australia',
  },
  {
    value: 'Torrens University Australia',
    label: 'Torrens University Australia',
  },
  { value: 'Holmesglen Institute', label: 'Holmesglen Institute' },
  { value: 'Melbourne Polytechnic', label: 'Melbourne Polytechnic' },
  { value: 'William Angliss Institute', label: 'William Angliss Institute' },
  { value: 'Box Hill Institute', label: 'Box Hill Institute' },
  { value: 'Chisholm Institute', label: 'Chisholm Institute' },
  { value: 'Kangan Institute', label: 'Kangan Institute' },
  {
    value: 'Melbourne Institute of Technology',
    label: 'Melbourne Institute of Technology',
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
  name: 'Vatana Chhorn',
  email: 'Onlyvatana23@gmail.com',
  avatarUrl:
    'https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no',
  aboutMe:
    "Hello, My name is Vatana Chhorn. I'm a UI/UX designer passionate about creating user-friendly interfaces. I believe that great design can transform user experiences and drive business success.",
  badges: [
    { label: 'Historical Expert', color: 'bg-yellow-100', icon: '🏛️' },
    { label: 'Culture Guru', color: 'bg-green-100', icon: '👤' },
  ],
  points: 300,
};

export const mockStoreItems: StoreItem = [
  {
    id: '1',
    name: 'Lamborghini Urus',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no', // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
  {
    id: '2',
    name: 'Luxury Armchair',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no', // Placeholder image URL
    price: 400,
    exchanged: 128,
  },
];
