import { AdminProduct } from '../../models/Products'
import { convertStringToSlug } from '../utils/convertStringToSlug'
import { assignRandomStocks } from '../utils/generateRandomNumber'
import { lowStockThreshold } from './lowStockThreshold'
import { baseURL } from '../../baseUrl'

const products: AdminProduct[] = [
  {
    id: 1,
    name: 'Pearl Milk Tea',
    slug: '',
    image: `${baseURL}/images/pearl-milk-tea.svg`,
    price: 7.5,
    description:
      'Pearl milk tea is a delightful and refreshing beverage blending black tea, milk, and chewy tapioca pearls, creating a creamy and enjoyable experience with every sip.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 2,
    name: 'Original Milk Tea',
    slug: '',
    image: `${baseURL}/images/original-milk-tea.svg`,
    price: 7,
    description:
      'Milk tea is a delightful and comforting beverage that combines the richness of black tea with the smoothness of milk, creating a harmonious blend that offers a soothing and enjoyable experience with every sip.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 3,
    name: 'Oolong Milk Tea',
    slug: '',
    image: `${baseURL}/images/oolong-milk-tea.svg`,
    price: 6.5,
    description:
      'Oolong milk tea is a delightful beverage that combines the intricate taste of oolong tea with creamy milk, creating a harmonious and satisfying drink.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.25,
  },
  {
    id: 4,
    name: 'Earl Grey Milk Tea',
    slug: '',
    image: `${baseURL}/images/earl-grey-milk-tea.svg`,
    price: 6.5,
    description:
      'Earl Grey milk tea is a delightful beverage that blends the distinctive flavor of Earl Grey tea with creamy milk, creating a harmonious and comforting drink.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 5,
    name: 'Brown Sugar Milk Tea with Pearls',
    slug: '',
    image: `${baseURL}/images/brown-sugar-milk-tea-and-pearls.svg`,
    price: 8.9,
    description:
      'Brown sugar milk tea is a delectable beverage made by combining aromatic black tea with rich brown sugar, creamy milk, and chewy tapioca pearls, resulting in a lusciously sweet and indulgent drink with delightful textural elements.',
    stock: 0,
    isEnabled: true,
    averageRating: 4,
  },
  {
    id: 6,
    name: 'Matcha Milk Tea',
    slug: '',
    image: `${baseURL}/images/matcha-milk-tea.svg`,
    price: 8,
    description:
      'A creamy fusion of Japanese matcha green tea and milk, offering a harmonious balance of earthy and sweet flavors.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.25,
  },
  {
    id: 7,
    name: 'Taro Milk Tea with Pearls',
    slug: '',
    image: `${baseURL}/images/taro-milk-tea-and-pearls.svg`,
    price: 7.6,
    description:
      'Taro Milk Tea is a delightful blend of taro root, milk, and black tea, providing a unique and appealing purple-hued drink with a hint of nutty sweetness.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 8,
    name: 'Chocolate Milk Tea with Pearls',
    slug: '',
    image: `${baseURL}/images/chocolate-milk-tea-and-pearls.svg`,
    price: 6.4,
    description:
      'Chocolate Milk Tea is a rich and indulgent combination of chocolate and black tea, creating a satisfying beverage for chocolate lovers.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.25,
  },
  {
    id: 9,
    name: 'Coffee Milk Tea',
    slug: '',
    image: `${baseURL}/images/coffee-milk-tea.svg`,
    price: 6.4,
    description:
      'The perfect marriage of robust coffee and milk tea, giving a delightful caffeine-infused twist to the classic drink.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.25,
  },
  {
    id: 10,
    name: 'Lychee Tea',
    slug: '',
    image: `${baseURL}/images/lychee-tea.svg`,
    price: 7,
    description:
      "A refreshing blend of fragrant lychee fruit and tea, offering a sweet and floral taste that's perfect for warm days.",
    stock: 0,
    isEnabled: true,
    averageRating: 4,
  },
  {
    id: 11,
    name: 'Green Tea',
    slug: '',
    image: `${baseURL}/images/green-tea.svg`,
    price: 5.99,
    description:
      'A classic and wholesome drink made from steeping green tea leaves, known for its fresh and grassy flavor.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.5,
  },
  {
    id: 12,
    name: 'Jasmine Tea',
    slug: '',
    image: `${baseURL}/images/jasmine-tea.svg`,
    price: 5.5,
    description:
      'A delicate and aromatic beverage made by infusing jasmine flowers with tea leaves, resulting in a soothing and floral taste.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 13,
    name: 'Kiwifruit Tea',
    slug: '',
    image: `${baseURL}/images/kiwi-fruit-tea.svg`,
    price: 7,
    description:
      'A zesty and revitalizing combination of kiwifruit and tea, providing a tangy and invigorating drink experience.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 14,
    name: 'Wintermelon Drink',
    slug: '',
    image: `${baseURL}/images/wintermelon-drink.svg`,
    price: 7,
    description:
      'A cooling and lightly sweetened beverage made from wintermelon, delivering a refreshing choice for hot weather.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.5,
  },
  {
    id: 15,
    name: 'Honey Lemon Drink',
    slug: '',
    image: `${baseURL}/images/honey-lemon-drink.svg`,
    price: 7.5,
    description:
      'A revitalizing mix of honey and lemon in tea or water, offering a soothing and naturally sweet option.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 16,
    name: 'Red Dragon Fruit Juice',
    slug: '',
    image: `${baseURL}/images/red-dragon-fruit-juice.svg`,
    price: 8.6,
    description:
      'A vibrant and visually striking juice made from red dragon fruit, providing a refreshingly exotic and mildly sweet taste.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 17,
    name: 'Purple Rice Yogurt',
    slug: '',
    image: `${baseURL}/images/purple-rice-yogurt.svg`,
    price: 7.8,
    description:
      'A creamy and wholesome drink featuring purple rice blended with yogurt, offering a unique and nutritious treat.',
    stock: 0,
    isEnabled: true,
    averageRating: 4,
  },
  {
    id: 18,
    name: 'Oreo Chocolate Smoothie',
    slug: '',
    image: `${baseURL}/images/oreo-chocolate-smoothie.svg`,
    price: 8.5,
    description:
      'An indulgent and creamy smoothie combining Oreo cookies and chocolate, delivering a rich and satisfying dessert-like drink.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 19,
    name: 'Taro Smoothie',
    slug: '',
    image: `${baseURL}/images/taro-smoothie.svg`,
    price: 7.8,
    description:
      'A velvety smoothie crafted with taro root, resulting in a delightful and naturally purple beverage with a hint of sweetness.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.5,
  },
  {
    id: 20,
    name: 'Mango Smoothie',
    slug: '',
    image: `${baseURL}/images/mango-smoothie.svg`,
    price: 7.5,
    description:
      'A tropical and fruity delight made with ripe mangoes, presenting a lusciously sweet and refreshing option.',
    stock: 0,
    isEnabled: true,
    averageRating: 3.75,
  },
  {
    id: 21,
    name: 'Forbidden Liquid',
    slug: '',
    image: `${baseURL}/images/forbidden-liquid.svg`,
    price: 100,
    description:
      'This product is banned in all countries. If you are ever offered this product, do not drink it!',
    stock: 111,
    isEnabled: false,
    averageRating: 0.5,
  },
]

const productsWithRandomStocks = assignRandomStocks(
  products,
  lowStockThreshold,
  197,
  [21]
)

const productsWithSlugs = productsWithRandomStocks.map((product) => ({
  ...product,
  slug: convertStringToSlug(product.name),
}))

export default productsWithSlugs
