import { Link, useLocation } from "wouter";

export function TopNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
      <div className="glass-panel px-4 py-2 pointer-events-auto">
        <span className="font-bold text-white tracking-wider text-sm">BOUNDIER</span>
      </div>
      
      <div className="flex gap-2 pointer-events-auto">
        <Link href="/">
          <button className={`glass-panel px-4 py-2 text-xs text-white font-bold transition-colors ${location === '/' ? 'bg-white/20' : ''}`}>
            HOME
          </button>
        </Link>
        <Link href="/dashboard">
          <button className={`glass-panel px-4 py-2 text-xs text-white font-bold transition-colors ${location === '/dashboard' ? 'bg-white/20' : ''}`}>
            DASHBOARD
          </button>
        </Link>
      </div>
    </nav>
  );
}
