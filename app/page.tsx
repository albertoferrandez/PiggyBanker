"use client"

import NavBar from "@/app/components/NavBar"
import hero from "../public/hero.json"
import Lottie from "lottie-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavBar />
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 
          xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold 
            tracking-tight leading-none md:text-5xl xl:text-6xl"
            >
              Controla tus gastos del hogar con facilidad
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 
              lg:mb-8 md:text-lg lg:text-xl">
              Administra tu dinero de manera inteligente y alcanza tus metas financieras
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Lottie animationData={hero} />
          </div>
        </div>
      </section>
    </div>
  )
}
