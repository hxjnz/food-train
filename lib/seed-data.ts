// Auckland CBD Restaurant Seed Data
// Based on Queen St, Lorne St, High St, and Shortland St

export interface RestaurantSeedData {
  name: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$';
  distance: string;
  address: string;
  notes: string;
}

export const aucklandRestaurants: RestaurantSeedData[] = [
  // Queen Street Restaurants
  {
    name: 'Burger Burger',
    cuisine_type: 'American',
    price_range: '$$',
    distance: '2 min walk',
    address: '91 Queen Street, Auckland CBD',
    notes: 'Popular burger joint, great for quick lunch. Known for their signature beef burgers and loaded fries.',
  },
  {
    name: 'Mezze Bar',
    cuisine_type: 'Mediterranean',
    price_range: '$$',
    distance: '3 min walk',
    address: '72 Queen Street, Auckland CBD',
    notes: 'Mediterranean cuisine, healthy options. Fresh salads, wraps, and mezze platters.',
  },
  {
    name: 'Tanuki\'s Cave',
    cuisine_type: 'Japanese',
    price_range: '$$',
    distance: '2 min walk',
    address: '319 Queen Street, Auckland CBD',
    notes: 'Authentic Japanese izakaya, great ramen and yakitori. Popular lunch sets available.',
  },
  {
    name: 'Federal Delicatessen',
    cuisine_type: 'American Deli',
    price_range: '$$',
    distance: '5 min walk',
    address: '86 Federal Street (near Queen St), Auckland CBD',
    notes: 'New York-style deli, pastrami sandwiches, bagels. Busy during lunch hours.',
  },
  {
    name: 'Ima Cuisine',
    cuisine_type: 'Middle Eastern',
    price_range: '$$',
    distance: '4 min walk',
    address: '53 Fort Street (off Queen St), Auckland CBD',
    notes: 'Modern Middle Eastern, excellent hummus and falafel. Great vegetarian options.',
  },
  
  // Lorne Street Restaurants
  {
    name: 'Amano',
    cuisine_type: 'Italian',
    price_range: '$$$',
    distance: '3 min walk',
    address: '66-68 Tyler Street (near Lorne St), Auckland CBD',
    notes: 'Upscale Italian restaurant and bakery. Beautiful interior, excellent pasta and pizza.',
  },
  {
    name: 'Cafe Hanoi',
    cuisine_type: 'Vietnamese',
    price_range: '$$',
    distance: '4 min walk',
    address: '2 Galway Street (near Lorne St), Auckland CBD',
    notes: 'Popular Vietnamese restaurant, pho and banh mi. Often busy, recommend booking.',
  },
  {
    name: 'Scarecrow',
    cuisine_type: 'Korean',
    price_range: '$$',
    distance: '5 min walk',
    address: '1 Lorne Street, Auckland CBD',
    notes: 'Modern Korean fusion, bibimbap and fried chicken. Trendy atmosphere.',
  },
  {
    name: 'Giraffe',
    cuisine_type: 'Contemporary',
    price_range: '$$',
    distance: '3 min walk',
    address: 'Lorne Street, Auckland CBD',
    notes: 'All-day dining, brunch and lunch options. Known for their eggs benedict and coffee.',
  },
  
  // High Street Restaurants
  {
    name: 'Masu',
    cuisine_type: 'Japanese',
    price_range: '$$$',
    distance: '6 min walk',
    address: '90 Federal Street (near High St), Auckland CBD',
    notes: 'High-end Japanese robata grill. Fresh sushi and premium ingredients.',
  },
  {
    name: 'Depot Eatery',
    cuisine_type: 'Contemporary NZ',
    price_range: '$$',
    distance: '5 min walk',
    address: '86 Federal Street (near High St), Auckland CBD',
    notes: 'Al Brown\'s casual eatery, oysters and seafood. Great for sharing plates.',
  },
  {
    name: 'Chuffed Coffee + Food',
    cuisine_type: 'Cafe',
    price_range: '$',
    distance: '4 min walk',
    address: 'High Street, Auckland CBD',
    notes: 'Trendy cafe, excellent coffee and cabinet food. Perfect for quick lunch.',
  },
  {
    name: 'Xuxu Dumpling Bar',
    cuisine_type: 'Chinese',
    price_range: '$',
    distance: '5 min walk',
    address: 'Level 1, 2 High Street, Auckland CBD',
    notes: 'Authentic dumplings and noodles. Affordable and filling, great value.',
  },
  {
    name: 'Ebisu',
    cuisine_type: 'Japanese',
    price_range: '$$',
    distance: '6 min walk',
    address: '116-118 Quay Street (near High St), Auckland CBD',
    notes: 'Traditional Japanese restaurant, sushi and bento boxes. Fresh fish daily.',
  },
  
  // Shortland Street Restaurants
  {
    name: 'The Store',
    cuisine_type: 'Cafe',
    price_range: '$',
    distance: '2 min walk',
    address: 'Shortland Street, Auckland CBD',
    notes: 'Popular office workers cafe, sandwiches and salads. Quick service.',
  },
  {
    name: 'Ima',
    cuisine_type: 'Middle Eastern',
    price_range: '$$',
    distance: '3 min walk',
    address: 'Fort Street (between Queen and Shortland), Auckland CBD',
    notes: 'Israeli-inspired cuisine, shakshuka and pita. Fresh ingredients.',
  },
  {
    name: 'Poke Bar',
    cuisine_type: 'Hawaiian',
    price_range: '$',
    distance: '3 min walk',
    address: 'Shortland Street, Auckland CBD',
    notes: 'Build-your-own poke bowls, healthy and fresh. Quick lunch option.',
  },
  {
    name: 'Sal\'s Pizza',
    cuisine_type: 'Italian Pizza',
    price_range: '$',
    distance: '4 min walk',
    address: 'Queen Street (near Shortland), Auckland CBD',
    notes: 'New York-style pizza by the slice. Fast service, good value.',
  },
  {
    name: 'Farina',
    cuisine_type: 'Italian',
    price_range: '$$',
    distance: '5 min walk',
    address: 'Lorne Street, Auckland CBD',
    notes: 'Contemporary Italian, handmade pasta. Great lunch specials.',
  },
  {
    name: 'Ortolana',
    cuisine_type: 'Mediterranean',
    price_range: '$$$',
    distance: '7 min walk',
    address: '33 Tyler Street (Britomart, near CBD), Auckland CBD',
    notes: 'Farm-to-table dining, seasonal menu. Beautiful garden setting.',
  },
  
  // Additional Popular CBD Options
  {
    name: 'Wagamama',
    cuisine_type: 'Asian Fusion',
    price_range: '$$',
    distance: '3 min walk',
    address: 'Queen Street, Auckland CBD',
    notes: 'Chain restaurant, ramen and curry. Consistent quality, good portions.',
  },
  {
    name: 'Sushi Train',
    cuisine_type: 'Japanese',
    price_range: '$',
    distance: '2 min walk',
    address: 'Queen Street, Auckland CBD',
    notes: 'Conveyor belt sushi, fun dining experience. Affordable and quick.',
  },
  {
    name: 'Mekong Baby',
    cuisine_type: 'Vietnamese',
    price_range: '$$',
    distance: '5 min walk',
    address: 'Lorne Street, Auckland CBD',
    notes: 'Modern Vietnamese street food, bánh mì and rice paper rolls. Vibrant atmosphere.',
  },
  {
    name: 'Mexico',
    cuisine_type: 'Mexican',
    price_range: '$$',
    distance: '6 min walk',
    address: 'Victoria Street West (near Queen St), Auckland CBD',
    notes: 'Authentic Mexican, tacos and quesadillas. Great margaritas.',
  },
  {
    name: 'Chop Chop',
    cuisine_type: 'Asian Fusion',
    price_range: '$',
    distance: '4 min walk',
    address: 'Queen Street, Auckland CBD',
    notes: 'Fast Asian food, noodles and rice dishes. Budget-friendly.',
  },
  {
    name: 'Gourmet Burger Kitchen',
    cuisine_type: 'Burgers',
    price_range: '$$',
    distance: '3 min walk',
    address: 'High Street, Auckland CBD',
    notes: 'Premium burgers, craft beers. Casual dining environment.',
  },
  {
    name: 'Pita Pit',
    cuisine_type: 'Mediterranean',
    price_range: '$',
    distance: '2 min walk',
    address: 'Queen Street, Auckland CBD',
    notes: 'Quick pitas and wraps, healthy options. Build your own.',
  },
  {
    name: 'Elliott Stables Food Court',
    cuisine_type: 'Food Court',
    price_range: '$',
    distance: '5 min walk',
    address: 'Elliott Street (near Queen St), Auckland CBD',
    notes: 'Multiple food vendors, Asian and Western options. Variety of choices.',
  },
  {
    name: 'Soul Bar',
    cuisine_type: 'Seafood',
    price_range: '$$$',
    distance: '8 min walk',
    address: 'Viaduct Harbour (walkable from CBD), Auckland',
    notes: 'Premium seafood, harbour views. Special occasion dining.',
  },
  {
    name: 'Ima Korean',
    cuisine_type: 'Korean',
    price_range: '$$',
    distance: '4 min walk',
    address: 'High Street, Auckland CBD',
    notes: 'Korean BBQ and hotpot, authentic flavors. Popular lunch sets.',
  },
];

