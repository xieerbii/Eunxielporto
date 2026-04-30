# EUNXIEL — Luxury Cupcakes Website
> E-commerce website premium bergaya Swarovski

---

## Struktur File

```
eunxiel/
├── index.html
├── style.css
├── script.js
├── README.md
└── image/
    ├── cupcake1.jpg
    ├── cupcake2.jpg
    ├── cupcake3.jpg
    ├── cupcake4.jpg
    ├── cupcake5.jpg
    ├── cupcake6.jpg
    ├── cupcake7.jpg
    ├── cupcake8.jpg
    └── cupcake9.jpg
```

---

## Cara Menjalankan

Cukup buka `index.html` di browser. Tidak perlu server atau build tools.

```
Klik 2x → index.html
```

---

## Struktur Halaman (index.html)

| Section          | ID / Tag         | Keterangan                                 |
|------------------|------------------|--------------------------------------------|
| Loading Screen   | `#loader`        | Muncul saat halaman pertama dibuka         |
| Cart Drawer      | `#cartDrawer`    | Slide-in dari kanan saat ikon cart diklik  |
| Navbar           | `#navbar`        | Fixed, transparan → putih cream saat scroll|
| Hero             | `#hero`          | Full viewport, animasi fade-in bertahap    |
| Products         | `#products`      | Grid 3×3, diisi oleh JavaScript            |
| About            | `#about`         | Dark background, stats, reveal on scroll   |
| Featured         | `#featured`      | Layout asimetris, 3 cupcake unggulan       |
| Testimonials     | `#testimonials`  | Auto-sliding quotes dengan dot navigation  |
| Footer           | `<footer>`       | 4 kolom: brand, nav, kontak, newsletter    |

---

## Styling (style.css)

### Design Tokens (CSS Variables)
```css
:root {
  --cream:      #FAF7F2;   /* Background utama */
  --ivory:      #F5EFE4;   /* Background sekunder */
  --gold:       #C9A84C;   /* Aksen utama */
  --gold-light: #E8D5A3;   /* Gold muda (teks di bg gelap) */
  --gold-dark:  #9A7A2E;   /* Gold tua (harga, link) */
  --blush:      #F2E8E4;   /* Soft pastel merah muda */
  --charcoal:   #2C2420;   /* Warna gelap utama */
  --warm-gray:  #8A7B72;   /* Teks sekunder */
  --border:     rgba(201,168,76,0.2);  /* Garis gold transparan */
}
```

### Font yang Digunakan
| Font                | Kegunaan                          |
|---------------------|-----------------------------------|
| Playfair Display    | Heading, judul section, nama produk |
| Cormorant Garamond  | Subtitle italic, body about       |
| Jost                | Navigasi, tombol, label uppercase |

---

## JavaScript (script.js)

### Data Produk
Edit array `products` di bagian atas `script.js` untuk menambah / mengubah produk:
```js
{
  id: 1,
  name: "Nama Cupcake",
  desc: "Deskripsi singkat bahan",
  price: 85000,       // dalam Rupiah (tanpa titik)
  emoji: "🧁"         // emoji placeholder (ganti dengan <img> jika ada foto)
}
```

### Fungsi Utama
| Fungsi             | Keterangan                                          |
|--------------------|-----------------------------------------------------|
| `renderProducts()` | Render semua kartu produk ke `#productGrid`         |
| `addToCart(id)`    | Tambah produk ke cart, update badge                 |
| `removeFromCart(id)`| Hapus produk dari cart                             |
| `toggleCart()`     | Buka / tutup cart drawer                            |
| `goToSlide(n)`     | Pindah ke slide testimonial tertentu                |
| `initScrollReveal()` | Aktifkan animasi fade-in saat elemen masuk viewport |

---

## Mengganti Emoji dengan Foto Produk

Di `script.js`, ubah field `emoji` menjadi path gambar, lalu di fungsi `renderProducts()` ubah:

```js
// Sebelum (emoji):
<div class="product-img-canvas">${product.emoji}</div>

// Sesudah (gambar):
<img
  src="${product.images}"
  alt="${product.name}"
  style="width:100%;height:100%;object-fit:cover;"
>
```

---

## Responsive Breakpoints

| Breakpoint   | Perubahan Layout                                        |
|--------------|---------------------------------------------------------|
| ≤ 900px      | Nav links hilang, produk 2 kolom, about 1 kolom         |
| ≤ 600px      | Produk 1 kolom, footer 1 kolom, footer-bottom vertikal  |

---

## Kredit Font
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — Google Fonts
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Google Fonts
- [Jost](https://fonts.google.com/specimen/Jost) — Google Fonts
