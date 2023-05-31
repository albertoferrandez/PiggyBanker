import getCurrentUser from "@/app/actions/getCurrentSesion"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { description, amount } = body

    const amountNumber = parseFloat(amount)
    
    if (isNaN(amountNumber)) {
      return new NextResponse("Invalid amount", { status: 400 })
    }
    if (!description || !amount) {
      return new NextResponse("Missing info", { status: 400 })
    }

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

  const expend = await prisma.expense.create({
    data: {
      description,
      amount: amountNumber,
      userId: currentUser.id
    },
  })

    return NextResponse.json(expend)
  } catch (error: any) {
    return new NextResponse(error, { status: 500 })
  }
}
