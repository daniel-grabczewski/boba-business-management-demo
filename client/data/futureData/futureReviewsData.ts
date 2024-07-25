import { Review } from '../../../models/Reviews'

const futureReviews : Review[] = [
  {
    id: 0,
    productId: 1,
    description: 'I quite liked the Pearl Milk Tea. The tapioca pearls are so chewy and the tea is perfectly balanced.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|abc65432',
    createdAt: ''
  },
  {
    id: 0,
    productId: 1,
    description: 'The Pearl Milk Tea was meh. The tea was too bitter and the pearls were too chewy.',
    rating: 4.5,
    isEnabled: true,
    userId: 'auth0|def12345',
    createdAt: ''
  },
  {
    id: 0,
    productId: 2,
    description: 'The Original Milk Tea did not dissapoint. It’s smooth, creamy, and delicious.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|jkl65432',
    createdAt: ''
  },
  {
    id: 0,
    productId: 2,
    description: 'Everyone hypes it up. But to be honest, it lacks the rich tea flavor I expected.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|mno98765',
    createdAt: ''
  },
  {
    id: 0,
    productId: 3,
    description: 'The oolong tea flavor is distinct and delightful.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|pqr34567',
    createdAt: ''
  },
  {
    id: 0,
    productId: 3,
    description: 'It’s not as creamy as I hoped.',
    rating: 2.5,
    isEnabled: true,
    userId: 'auth0|stu78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 4,
    description: 'Earl Grey Milk Tea is fantastic! The bergamot flavor is so fragrant and pairs well with the milk.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|vwx54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 4,
    description: 'I didn’t enjoy the Earl Grey Milk Tea. The bergamot flavor was too overpowering.',
    rating: 1.5,
    isEnabled: true,
    userId: 'auth0|yzx23456',
    createdAt: ''
  },
  {
    id: 0,
    productId: 5,
    description: 'Brown Sugar Milk Tea and Pearls is incredibly sweet and delicious. The brown sugar adds a rich flavor.',
    rating: 4.5,
    isEnabled: true,
    userId: 'auth0|abc87654',
    createdAt: ''
  },
  {
    id: 0,
    productId: 5,
    description: 'The Brown Sugar Milk Tea is overwhelming.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|def23456',
    createdAt: ''
  },
  {
    id: 0,
    productId: 6,
    description: 'Matcha Milk Tea is a perfect blend of earthy matcha and creamy milk. A real treat!',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|ghi87654',
    createdAt: ''
  },
  {
    id: 0,
    productId: 6,
    description: 'Matcha Milk Tea wasn’t for me. The matcha flavor was too strong.',
    rating: 2.5,
    isEnabled: true,
    userId: 'auth0|jkl54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 7,
    description: 'The taro flavor is perfectly mild and sweet.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|mno12345',
    createdAt: ''
  },
  {
    id: 0,
    productId: 7,
    description: 'Didn’t enjoy the Taro Milk Tea. The flavor was too bland.',
    rating: 1.5,
    isEnabled: true,
    userId: 'auth0|pqr78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 8,
    description: 'Chocolate Milk Tea and Pearls is a great drink for chocolate lovers. Rich and satisfying!',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|stu65432',
    createdAt: ''
  },
  {
    id: 0,
    productId: 8,
    description: 'The Chocolate Milk Tea was too sweet. Not my favorite.',
    rating: 3,
    isEnabled: true,
    userId: 'auth0|vwx34567',
    createdAt: ''
  },
  {
    id: 0,
    productId: 9,
    description: 'Perfect for a caffeine boost.',
    rating: 5,
    isEnabled: true,
    userId: 'auth0|yzx12345',
    createdAt: ''
  },
  {
    id: 0,
    productId: 9,
    description: 'The Coffee Milk Tea didn’t meet my expectations. The coffee flavor I expected was a mid at best.',
    rating: 3,
    isEnabled: true,
    userId: 'auth0|abc23456',
    createdAt: ''
  },
  {
    id: 0,
    productId: 10,
    description: 'Lychee Tea is a great drink for a hot day.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|def98765',
    createdAt: ''
  },
  {
    id: 0,
    productId: 10,
    description: 'I didn’t like the Lychee Tea. The floral taste is not my thing.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|ghi54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 11,
    description: 'Green Tea is a classic. Fresh and grassy flavor that I enjoy.',
    rating: 3.5,
    isEnabled: true,
    userId: 'auth0|jkl78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 11,
    description: 'The Green Tea was too bitter for my taste. Not enjoyable.',
    rating: 1.5,
    isEnabled: true,
    userId: 'auth0|uvw54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 12,
    description: 'This jasmine Tea is soooo soothing. Love it!',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|hij23456',
    createdAt: ''
  },
  {
    id: 0,
    productId: 12,
    description: 'Jasmine Tea wasn’t as good as I expected. The floral taste was too subtle.',
    rating: 3.5,
    isEnabled: true,
    userId: 'auth0|klm78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 13,
    description: 'Kiwifruit Tea is tangy and refreshing. A great pick-me-up drink!',
    rating: 4.5,
    isEnabled: true,
    userId: 'auth0|bcd34567',
    createdAt: ''
  },
  {
    id: 0,
    productId: 13,
    description: 'Too sour. Wayyyyy too sour.',
    rating: 2.5,
    isEnabled: true,
    userId: 'auth0|abc98765',
    createdAt: ''
  },
  {
    id: 0,
    productId: 14,
    description: 'Wintermelon Drink is a perfect choice to cool down in hot weather. Lightly sweet and cooling.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|def67890',
    createdAt: ''
  },
  {
    id: 0,
    productId: 14,
    description: 'The Wintermelon Drink didn’t taste as good as I hoped. It was too bland.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|ghi87654',
    createdAt: ''
  },
  {
    id: 0,
    productId: 15,
    description: 'Love the honey and lemon combo!',
    rating: 5,
    isEnabled: true,
    userId: 'auth0|jkl54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 15,
    description: 'Did they just dump in a bag of sugar?',
    rating: 1.5,
    isEnabled: true,
    userId: 'auth0|mno12345',
    createdAt: ''
  },
  {
    id: 0,
    productId: 16,
    description: 'Red Dragon Fruit Juice is colourful and visually stunning. A refreshing and mildly sweet drink.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|pqr78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 16,
    description: 'The Red Dragon Fruit Juice was not what I expected. The flavor was too weak.',
    rating: 3,
    isEnabled: true,
    userId: 'auth0|stu65432',
    createdAt: ''
  },
  {
    id: 0,
    productId: 17,
    description: 'Purple Rice Yogurt is a nutritious treat. Creamy and wholesome!',
    rating: 4.5,
    isEnabled: true,
    userId: 'auth0|vwx34567',
    createdAt: ''
  },
  {
    id: 0,
    productId: 17,
    description: 'The Purple Rice Yogurt was not to my liking. The texture was off-putting.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|yzx12345',
    createdAt: ''
  },
  {
    id: 0,
    productId: 18,
    description: 'Oreo Chocolate Smoothie is a rich and indulgent treat. Perfect for dessert lovers!',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|abc23456',
    createdAt: ''
  },
  {
    id: 0,
    productId: 18,
    description: 'The Oreo Chocolate Smoothie was too rich for me. Too much chocolate.',
    rating: 3,
    isEnabled: true,
    userId: 'auth0|def98765',
    createdAt: ''
  },
  {
    id: 0,
    productId: 19,
    description: 'Velvety and delicious! A unique purple drink with a hint of sweetness.',
    rating: 4,
    isEnabled: true,
    userId: 'auth0|ghi54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 19,
    description: 'Didn’t enjoy the Taro Smoothie. The flavor was barely there.',
    rating: 3,
    isEnabled: true,
    userId: 'auth0|jkl78901',
    createdAt: ''
  },
  {
    id: 0,
    productId: 20,
    description: 'Can’t go wrong with mango!!!',
    rating: 5,
    isEnabled: true,
    userId: 'auth0|uvw54321',
    createdAt: ''
  },
  {
    id: 0,
    productId: 20,
    description: 'Too sweet for my taste.',
    rating: 2,
    isEnabled: true,
    userId: 'auth0|hij23456',
    createdAt: ''
  }
]
