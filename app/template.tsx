/** Re-mounts on every route change, so switching between the studio and the portfolio gets a short fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-fade">{children}</div>
}
