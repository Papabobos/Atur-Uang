# 💰 Financial Planner

Aplikasi web perencanaan keuangan pribadi berbasis Next.js 14 + Tailwind CSS.

## ✨ Fitur

- Kalkulasi kebutuhan tabungan per bulan berdasarkan target & waktu
- Status realistis/ketat/tidak realistis secara otomatis
- Rekomendasi cerdas berdasarkan kondisi keuangan
- Visualisasi alokasi penghasilan (cashflow bar)
- UI modern dark mode dengan animasi halus

## 📁 Struktur Folder

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Halaman utama
│   └── globals.css       # Global styles + font
├── components/
│   ├── CurrencyInput.tsx  # Input mata uang Rupiah
│   ├── PlannerForm.tsx    # Form input lengkap
│   ├── PlannerResult.tsx  # Tampilan hasil & rekomendasi
│   └── StatusBadge.tsx    # Badge status (realistis/ketat/tidak)
├── hooks/
│   └── usePlanner.ts     # Custom hook state management
├── lib/
│   └── calculations.ts   # Logic perhitungan (murni, tanpa UI)
└── types/
    └── planner.ts        # TypeScript type definitions
```

## 🚀 Cara Menjalankan

### 1. Clone / Download project

```bash
# Jika dari git
git clone <repo-url>
cd financial-planner
```

### 2. Install dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build untuk production

```bash
npm run build
npm start
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: DM Serif Display, DM Sans, JetBrains Mono

## 📐 Logic Perhitungan

Semua kalkulasi ada di `src/lib/calculations.ts`:

| Formula | Keterangan |
|---------|-----------|
| `totalMonths = timeValue × 12` (jika tahun) | Konversi waktu ke bulan |
| `remainingTarget = target - currentSavings` | Sisa yang perlu ditabung |
| `monthlySavingNeeded = remaining / totalMonths` | Tabungan per bulan yang dibutuhkan |
| `savingRatio = (needed / income) × 100` | Persentase dari penghasilan |
| Status ≤30% → Realistis, ≤50% → Ketat, >50% → Tidak Realistis | Threshold status |

## 🎨 Customisasi

Ubah warna tema di `tailwind.config.ts`. Ubah threshold status di `src/lib/calculations.ts` pada fungsi `determineStatus()`.
