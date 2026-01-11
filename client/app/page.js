import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full flex flex-col justify-center items-center">
          <div>
            <h1 className="text-5xl py-10 font-extrabold tracking-tight">Welcome Guys</h1>
          </div>
          <div className="flex gap-6">
              <Link className="border p-4 rounded bg-neutral-500 text-white text-xl font-semibold hover:bg-neutral-600 hover:text-gray-300" href={'/common'} >Common</Link>
              <Link className="border p-4 rounded bg-neutral-500 text-white text-xl font-semibold hover:bg-neutral-600 hover:text-gray-300" href={'/group'} >Group</Link>
          </div>
      </section>
    </>
  );
}
