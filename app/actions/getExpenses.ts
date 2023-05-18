import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentSesion"

export async function getExpenses() {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error("User not authenticated")
        }

        const expenses = await prisma.expense.findMany({
            where: { userId: currentUser?.id},
            include: { user: true}
        })

        return expenses
    } catch (error) {
        console.log(error)
    }
}