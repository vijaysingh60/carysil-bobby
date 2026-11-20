/**
 * Templates remount on every navigation, so this red panel sweeps up off the
 * new page each time you move between the homepage and the promo page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="route-wipe" aria-hidden="true" />
      {children}
    </>
  );
}
