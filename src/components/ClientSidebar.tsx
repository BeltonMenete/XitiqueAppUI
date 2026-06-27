// #/components/ClientSidebar.tsx

export function ClientSidebar() {
  return (
    <section className="hidden md:flex md:w-3/5 relative items-center justify-center overflow-hidden bg-emerald-950">
      {/* Imagem de Fundo (URL extraída diretamente do code.html) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida/AP1WRLsWiNGlOVTgJw_h33qylhC3Fbboven9zAUumIyd6dvGcpGjzoxakshZKonWzy0lftUH9DX3u0ZI8byTk9OhLxC6t9V43JZtnO4IknVn9Sjcoinbaoz7vh8NTvM5ZmH90nXAtRM7qbarfjIugMcT59uJ6zik7C07enVAKVyCUInVhISXn2gqta8LPG72nwIJBQXxvsz4BfdpjN8arlDXTuAhmsJYPB5_4YeiTDmG_5eD4y1JnMXEMam0ZJ-o')",
        }}
      />

      {/* Gradiente de Mascaramento do code.html */}
      <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-transparent z-10" />
    </section>
  );
}
