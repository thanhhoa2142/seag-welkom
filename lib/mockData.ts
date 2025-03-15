import { GetLocationByIdReturnType } from "@/app/actions/challenges";

export const mockLocationData = [
  {
    id: "state-library-victoria",
    name: "State Library Victoria",
    description:
      "The State Library Victoria is the central library of the state of Victoria, Australia, located in Melbourne. It is on the block bounded by Swanston, La Trobe, Russell, and Little Lonsdale streets, in the northern centre of the central business district.",
    latitude: -37.809962798356516,
    longitude: 144.964566044394,
    hasArHiddenReward: Math.random() > 0.7,
    photoUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
    tags: ["Historical", "Cultural", "Art"],
    _count: { tasks: 3 },
    tasks: [
      { id: "task-1", title: "Find a rare book" },
      {
        id: "task-2",
        title: "Take a photo in front of the domed reading room",
      },
      { id: "task-3", title: "Locate the Ned Kelly exhibit" },
    ],
    time: "1h 30m",
    difficulty: "Easy",
    distance: 0.5,
    reward: 100,
  },
  {
    id: "shrine-of-remembrance",
    name: "Shrine of Remembrance",
    description:
      "The Shrine of Remembrance, located in Kings Domain on St Kilda Road, Melbourne, Australia was built as a memorial to the...",
    latitude: -37.830372314962794,
    longitude: 144.97344262483904,
    hasArHiddenReward: Math.random() > 0.7,
    photoUrl:
      "https://lh5.googleusercontent.com/p/AF1QipM8htf0oBRNqgvM83Msp7WUr3TjFIgE6SA8ed2S=w408-h306-k-no",
    tags: ["Historical", "Cultural"],
    _count: { tasks: 2 },
    tasks: [
      { id: "task-1", title: "Find the Eternal Flame" },
      { id: "task-2", title: "Read an inscription inside the shrine" },
    ],
    time: "45m",
    difficulty: "Medium",
    distance: 1.2,
    reward: 150,
  },
  {
    id: "royal-botanic-gardens",
    name: "Royal Botanic Gardens Victoria",
    description:
      "The Royal Botanic Gardens Victoria are botanic gardens across two sites - Melbourne and Cranbourne. Melbourne Gardens was founded in 1846 when land was reserved on the south side of the Yarra River for a new botanic garden.",
    latitude: -37.830372314962794,
    longitude: 144.97344262483904,
    hasArHiddenReward: Math.random() > 0.7,
    photoUrl:
      "https://lh5.googleusercontent.com/p/AF1QipNr16xQjl9PqqLfiXee9kHtLv7xu-kvjiBPdeWw=w408-h306-k-no",
    tags: ["Nature", "Historical"],
    _count: { tasks: 3 },
    tasks: [
      { id: "task-1", title: "Find a rare plant species" },
      { id: "task-2", title: "Take a photo of the lake" },
      { id: "task-3", title: "Spot a native bird" },
    ],
    time: "2h",
    difficulty: "Easy",
    distance: 2.0,
    reward: 200,
  },
  {
    id: "national-gallery-victoria",
    name: "National Gallery of Victoria",
    description:
      "The National Gallery of Victoria, popularly known as the NGV, is an art museum in Melbourne, Victoria, Australia. Founded in 1861, it is Australia's oldest, largest and most visited art museum.",
    latitude: -37.821891941272625,
    longitude: 144.9698528737019,
    hasArHiddenReward: Math.random() > 0.7,
    photoUrl:
      "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
    tags: ["Cultural", "Historical", "Art"],
    _count: { tasks: 2 },
    tasks: [
      { id: "task-1", title: "Find the most famous artwork on display" },
      { id: "task-2", title: "Take a photo in the Great Hall" },
    ],
    time: "1h 15m",
    difficulty: "Medium",
    distance: 0.8,
    reward: 120,
  },
];

// Mock location is now the first entry of the data array
export const mockLocation = mockLocationData[0];

export async function getMockPopularLocations() {
  return {
    success: true,
    data: mockLocationData,
  };
}

export async function getMockLocationById(
  id: string
): Promise<NonNullable<GetLocationByIdReturnType>> {
  return (
    mockLocationData.find((location) => location.id === id) || mockLocation
  );
}
