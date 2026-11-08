/* Product catalogue — edit names, prices and images here.
   Images are from Unsplash (free to use); swap for the client's own product photos. */
const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70`;

const PRODUCTS = [
  // ----- Men -----
  { id: 1, name: "Core Training Tee", color: "Jet Black", price: 38, cat: "men", tags: ["best", "new"], badge: "New",
    img: IMG("1583743814966-8936f5b7be1a"), img2: IMG("1503341455253-b2e723bb3dbb") },
  { id: 2, name: "Essential Crew Tee", color: "Chalk", price: 34, cat: "men", tags: ["best"],
    img: IMG("1521572163474-6864f9cf17ab"), img2: IMG("1622445275463-afa2ab738c34") },
  { id: 3, name: "Iron Heavyweight Hoodie", color: "Storm Grey", price: 78, cat: "men", tags: ["best", "iron"], badge: "Best Seller",
    img: IMG("1556821840-3a63f95609a7"), img2: IMG("1517836357463-d25dfeac3438") },
  { id: 4, name: "Iron Fleece Crewneck", color: "Bone", price: 68, cat: "men", tags: ["iron"],
    img: IMG("1620799140408-edc6dcb6d633"), img2: IMG("1541534741688-6078c6bfb5c5") },
  { id: 5, name: "Iron Graphic Hoodie", color: "Gold", price: 82, cat: "men", tags: ["iron", "drop"], badge: "Limited",
    img: IMG("1609873814058-a8928924184a"), img2: IMG("1605296867304-46d5465a13f1") },
  { id: 6, name: "Emblem Pump Cover Tee", color: "Black", price: 42, cat: "men", tags: ["iron", "drop"], badge: "Limited",
    img: IMG("1618354691373-d851c5c3a990"), img2: IMG("1581009146145-b5ef050c2e1e") },
  { id: 7, name: "Everyday Sweatpant", color: "Slate", price: 64, cat: "men", tags: ["best", "new"],
    img: IMG("1506629082955-511b1aa562c8"), img2: IMG("1549060279-7e168fcee0c2") },
  { id: 8, name: "Oversized Lift Tee", color: "Heather", price: 40, cat: "men", tags: ["new"], badge: "New",
    img: IMG("1622445275463-afa2ab738c34"), img2: IMG("1521572163474-6864f9cf17ab") },

  // ----- Women -----
  { id: 11, name: "Sculpt Seamless Legging", color: "Deep Teal", price: 68, cat: "women", tags: ["best", "sets", "leggings"], badge: "Best Seller",
    img: IMG("1538805060514-97d9cc17730c"), img2: IMG("1571019613454-1cb2f99b2d8b") },
  { id: 12, name: "Sculpt Support Bra", color: "Black", price: 48, cat: "women", tags: ["best", "sets", "bras"],
    img: IMG("1594381898411-846e7d193883"), img2: IMG("1550345332-09e3ac987658") },
  { id: 13, name: "Lounge Crop Set", color: "Sunflower", price: 96, cat: "women", tags: ["best", "new"], badge: "New",
    img: IMG("1515886657613-9f3515b0c78f"), img2: IMG("1518611012118-696072aa579a") },
  { id: 14, name: "Utility Cargo Jogger", color: "Olive", price: 72, cat: "women", tags: ["best", "new"],
    img: IMG("1552902865-b72c031ac5ea"), img2: IMG("1594633312681-425c7b97ccd1") },
  { id: 15, name: "Power Lift Bra", color: "Onyx", price: 46, cat: "women", tags: ["sets", "bras"],
    img: IMG("1574680096145-d05b474e2155"), img2: IMG("1594381898411-846e7d193883") },
  { id: 16, name: "Flow Studio Legging", color: "Coral", price: 64, cat: "women", tags: ["sets", "leggings"],
    img: IMG("1571019613454-1cb2f99b2d8b"), img2: IMG("1538805060514-97d9cc17730c") },

  // ----- Accessories -----
  { id: 21, name: "Signature Trucker Cap", color: "White", price: 32, cat: "acc", tags: ["best", "new"],
    img: IMG("1588850561407-ed78c282e89b"), img2: IMG("1588850561407-ed78c282e89b") },
  { id: 22, name: "Court Classic Sneaker", color: "Bred", price: 120, cat: "acc", tags: ["best"],
    img: IMG("1556906781-9a412961c28c"), img2: IMG("1556906781-9a412961c28c") },
  { id: 23, name: "Tee 3-Pack Bundle", color: "Multi", price: 96, cat: "acc", tags: ["best"], badge: "Save 20%",
    img: IMG("1562157873-818bc0726f68"), img2: IMG("1562157873-818bc0726f68") },
  { id: 24, name: "Everyday Denim Short", color: "Light Wash", price: 54, cat: "acc", tags: ["best"],
    img: IMG("1591195853828-11db59a44f6b"), img2: IMG("1591195853828-11db59a44f6b") },
];

const REVIEWS = [
  { name: "Marcus T.", product: "Iron Heavyweight Hoodie", title: "Best hoodie I own", text: "Heavy, warm and the fit is perfect. Survived 30+ washes and still looks brand new. Already ordered a second color." },
  { name: "Jess R.", product: "Sculpt Seamless Legging", title: "Squat-proof for real", text: "No see-through, no rolling waistband, no sliding down mid-set. These are now the only leggings I train in." },
  { name: "Andre L.", product: "Core Training Tee", title: "Fits like it was made for me", text: "Slightly tapered, breathable, and doesn't cling when you sweat. Bought the 3-pack after the first one." },
  { name: "Priya K.", product: "Lounge Crop Set", title: "Gym to brunch", text: "So soft. I wear it to class and straight out after. Got so many compliments on the color." },
  { name: "Daniel M.", product: "Everyday Sweatpant", title: "Lives on my legs", text: "Tapered ankle, deep pockets and a waistband that actually holds. Easily the comfiest pants I have." },
];
