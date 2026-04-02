import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = process.env.NODE_ENV === 'production' ? '/var/data' : __dirname;
const db = new Database(path.join(dbDir, 'cafe.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    is_popular INTEGER DEFAULT 0,
    is_new INTEGER DEFAULT 0,
    calories INTEGER,
    tags TEXT,
    available INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    customer_name TEXT,
    customer_phone TEXT,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    occasion TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get();
if (categoryCount.count === 0) {
  const insertCategory = db.prepare('INSERT INTO categories (name, slug, icon, sort_order) VALUES (?, ?, ?, ?)');
  const insertItem = db.prepare('INSERT INTO menu_items (category_id, name, description, price, image, is_popular, is_new, calories, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

  const seed = db.transaction(() => {
    insertCategory.run('Coffee', 'coffee', '☕', 1);
    insertCategory.run('Tea & Matcha', 'tea', '🍵', 2);
    insertCategory.run('Pastries', 'pastries', '🥐', 3);
    insertCategory.run('Brunch', 'brunch', '🍳', 4);
    insertCategory.run('Desserts', 'desserts', '🍰', 5);
    insertCategory.run('Smoothies', 'smoothies', '🥤', 6);

    insertItem.run(1, 'Vanilla Oat Latte', 'Silky oat milk with Madagascar vanilla and double espresso', 6.50, '/images/vanilla-latte.jpg', 1, 0, 180, 'vegetarian,gluten-free');
    insertItem.run(1, 'Lavender Honey Latte', 'Espresso with house-made lavender syrup and wildflower honey', 7.00, '/images/lavender-latte.jpg', 1, 1, 195, 'vegetarian');
    insertItem.run(1, 'Rose Cappuccino', 'Delicate rose-infused cappuccino with edible petals', 6.00, '/images/rose-cappuccino.jpg', 0, 1, 150, 'vegetarian');
    insertItem.run(1, 'Classic Americano', 'Bold double espresso with filtered hot water', 4.50, '/images/americano.jpg', 0, 0, 10, 'vegetarian,vegan');
    insertItem.run(1, 'Iced Caramel Macchiato', 'Cold milk layered with espresso and caramel drizzle', 6.75, '/images/caramel-macchiato.jpg', 1, 0, 250, 'vegetarian');

    insertItem.run(2, 'Ceremonial Matcha', 'Premium Japanese matcha whisked to perfection', 7.50, '/images/matcha.jpg', 1, 0, 120, 'vegetarian,vegan');
    insertItem.run(2, 'Sakura Matcha Latte', 'Cherry blossom matcha with oat milk and rose cream', 8.00, '/images/sakura-matcha.jpg', 1, 1, 185, 'vegetarian');
    insertItem.run(2, 'Chamomile Dream', 'Organic chamomile with honey and dried lavender', 5.00, '/images/chamomile.jpg', 0, 0, 5, 'vegetarian,vegan');
    insertItem.run(2, 'Earl Grey Cream', 'Classic bergamot tea with vanilla cream', 5.50, '/images/earl-grey.jpg', 0, 0, 80, 'vegetarian');

    insertItem.run(3, 'Almond Croissant', 'Buttery croissant filled with almond frangipane', 5.50, '/images/almond-croissant.jpg', 1, 0, 380, 'vegetarian');
    insertItem.run(3, 'Pistachio Danish', 'Flaky pastry with pistachio cream and rose glaze', 6.00, '/images/pistachio-danish.jpg', 1, 1, 340, 'vegetarian');
    insertItem.run(3, 'Cinnamon Swirl Brioche', 'Soft brioche with cinnamon sugar and vanilla glaze', 5.00, '/images/cinnamon-brioche.jpg', 0, 0, 420, 'vegetarian');
    insertItem.run(3, 'Matcha Mochi Muffin', 'Chewy mochi muffin with matcha and white chocolate', 4.75, '/images/matcha-muffin.jpg', 0, 1, 290, 'vegetarian,gluten-free');

    insertItem.run(4, 'Avocado Toast', 'Sourdough with smashed avo, poached eggs, chili flakes', 12.00, '/images/avocado-toast.jpg', 1, 0, 450, 'vegetarian');
    insertItem.run(4, 'Ricotta Pancakes', 'Fluffy pancakes with lemon ricotta, berries, maple syrup', 14.00, '/images/ricotta-pancakes.jpg', 1, 0, 580, 'vegetarian');
    insertItem.run(4, 'Shakshuka', 'Eggs poached in spiced tomato sauce with za\'atar bread', 13.50, '/images/shakshuka.jpg', 0, 0, 520, 'vegetarian');
    insertItem.run(4, 'Açaí Bowl', 'Thick açaí blend topped with granola, coconut, fresh fruit', 11.00, '/images/acai-bowl.jpg', 1, 0, 380, 'vegetarian,vegan,gluten-free');

    insertItem.run(5, 'Burnt Basque Cheesecake', 'Caramelized creamy cheesecake with berry compote', 8.50, '/images/basque-cheesecake.jpg', 1, 0, 420, 'vegetarian');
    insertItem.run(5, 'Tiramisu', 'Classic Italian layers of mascarpone, espresso, cocoa', 9.00, '/images/tiramisu.jpg', 1, 0, 460, 'vegetarian');
    insertItem.run(5, 'Matcha Panna Cotta', 'Silky matcha custard with black sesame crumble', 7.50, '/images/matcha-panna-cotta.jpg', 0, 1, 280, 'vegetarian,gluten-free');
    insertItem.run(5, 'Rose Macaron Box', 'Six delicate rose-flavored macarons with raspberry filling', 12.00, '/images/macarons.jpg', 0, 0, 480, 'vegetarian,gluten-free');

    insertItem.run(6, 'Berry Bliss', 'Strawberry, blueberry, banana, oat milk, agave', 8.00, '/images/berry-bliss.jpg', 1, 0, 220, 'vegetarian,vegan,gluten-free');
    insertItem.run(6, 'Tropical Sunrise', 'Mango, passion fruit, coconut, turmeric', 8.50, '/images/tropical-smoothie.jpg', 0, 0, 240, 'vegetarian,vegan,gluten-free');
    insertItem.run(6, 'Green Goddess', 'Spinach, avocado, banana, matcha, almond milk', 8.50, '/images/green-goddess.jpg', 0, 1, 190, 'vegetarian,vegan,gluten-free');
  });

  seed();
  console.log('Database seeded successfully!');
}

export default db;