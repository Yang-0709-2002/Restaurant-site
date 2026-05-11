type Props = {
  query: string;
  title: string;
};

export function GoogleMapEmbed({ query, title }: Props) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-lg shadow-black/40">
      <iframe
        title={title}
        src={src}
        className="aspect-[16/10] h-[320px] w-full sm:h-[380px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
