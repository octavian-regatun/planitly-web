export default async function Navbar() {
  return (
    <nav className="fixed flex h-20 lg:h-24 w-screen items-center gap-4 bg-white/50 px-4 drop-shadow-lg backdrop-blur lg:px-16">
      <p className="text-2xl lg:text-4xl font-bold hover:underline text-teal-600">PlanITLY</p>
    </nav>
  );
}
