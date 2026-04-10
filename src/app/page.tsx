// src/app/page.tsx
"use client";

import { usePlanner } from "@/hooks/usePlanner";
import PlannerForm from "@/components/PlannerForm";
import PlannerResultView from "@/components/PlannerResult";

export default function Home() {
  const { input, result, hasCalculated, isValid, updateField, calculate, reset } =
    usePlanner();

  return (
    <main className="min-h-screen bg-ink-950 px-4 py-12 md:py-16">
      {/* Background grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-12 animate-fade-up">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1.5 w-6 rounded-full bg-amber-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Yuk Atur Duitnya
            </span>
          </div>
          <h1 className="font-display text-4xl font-normal text-slate-100 md:text-5xl">
            Atur
            <em className="ml-3 text-amber-400 not-italic">Duitnya</em>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
            Kasih tau mau nyimpen duit berapa, ntar diitungin — lengkap pake rekomendasi.
          </p>
        </header>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] lg:grid-cols-[5fr_6fr]">
          {/* Form Card */}
          <div
            className="h-fit rounded-2xl border border-ink-700 bg-ink-900 p-6 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <PlannerForm
              input={input}
              isValid={isValid}
              onUpdate={updateField}
              onCalculate={calculate}
              onReset={reset}
              hasCalculated={hasCalculated}
            />
          </div>

          {/* Result */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {result ? (
              <PlannerResultView result={result} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-700">
          Itungannya perkiraan doang ya · Kalau mau serius, coba konsultasi ke perencana keuangan beneran · Dibuat dengan ❤️ oleh{" "}
        </footer>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-ink-700 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-700 bg-ink-800">
        <span className="font-display text-2xl text-amber-400/50">₫</span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">Hasil analisis akan muncul di sini</p>
        <p className="mt-1 text-xs text-slate-600">
          Isi form di kiri dan klik &quot;Hitung Rencana&quot;
        </p>
      </div>
      <div className="flex flex-col gap-2 text-left w-full max-w-xs">
        {["Target keuangan Anda", "Jangka waktu pencapaian", "Kondisi keuangan saat ini"].map(
          (item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
              <div className="h-px w-3 bg-ink-700" />
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}
