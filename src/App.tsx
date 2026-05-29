import { Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl">
        📅
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
        Absence Calendar
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        A shared calendar for the team to log vacation, sick, remote and other
        days — so we can coordinate coverage at a glance.
      </p>
      <p className="mt-8 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-500">
        Scaffold live · CP1
      </p>
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
