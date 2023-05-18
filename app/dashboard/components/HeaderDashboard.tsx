"use client"

import { IconPigMoney, IconUser, IconLogout } from "@tabler/icons-react"
import { Title, Text } from "@tremor/react"
import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"


const HeaderDashboard = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status !== "authenticated") {
      console.log("Authenticated")
      router.push("/")
    }
  }, [session?.status, router])

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex-col items-start">
        <Title className="flex gap-2 items-center">
          <IconPigMoney />
          <span>PiggyBanker</span>
        </Title>
        <Text className="text-xs mt-2">CONTROLA TUS GASTOS MENSUALES</Text>
      </div>

      <div>
        <IconUser />
        <span>{session.data?.user?.name}</span>
        <IconLogout
          onClick={() => signOut()}
          className="cursor-pointer rounded p-1 
            hover:bg-white"
          size={32}
        />
      </div>
    </header>
  )
}

export default HeaderDashboard
