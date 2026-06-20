import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soul Scroll — Order a Prayer',
  description: 'Soul Scroll: an on-chain NFT prayer machine by Bård Ionson.',
};

export default function SoulScrollPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0f172a',
      }}
    >
      <iframe
        src="https://soul-scroll.vie.live/"
        title="Soul Scroll — Order a Prayer"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
