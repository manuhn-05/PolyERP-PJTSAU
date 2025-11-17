"use client";
import { Card } from "@/components/ui/card"
import { Box, } from "@chakra-ui/react"
import Image from "next/image"
import DummyPolyhouse from "@/images/assets/background/hero.jpg"
import dynamic from "next/dynamic"
import { useDeletePolyhouse } from "@/data-handling/queries/market-place-queries"
import { useQueryClient } from "@tanstack/react-query"
import { HTTP_RESPONSE_CODES } from "@/data-handling/endpoints/server-endpoints"

const DeletePolyhouseDynamic = dynamic(() => import('@/components/utils-ui/delete-item'));
const EditPolyhouseDetailsDynamic = dynamic(() => import('@/components/(owner)/market-place/polyhouse/_components/edit-polyhouse'));

type PolyhouseCardProps = {
    polyhouse: any
}

export function PolyhouseCard({ polyhouse }: PolyhouseCardProps) {
    const branch_manager = polyhouse?.branch_admin?.label;
    const queryClient = useQueryClient();
    const { mutateAsync: deletePolyhouse } = useDeletePolyhouse();

    async function handleDeletePolyhouse(polyhouse_id: string) {
        try {
            const results = await deletePolyhouse(polyhouse_id);

            if (results?.status === HTTP_RESPONSE_CODES.OK) {
                queryClient.invalidateQueries({ queryKey: ['polyhouses_list'] });
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card className="overflow-hidden rounded-lg border text-card-foreground shadow-sm dark:shadow-white transition-shadow hover:shadow-md">
            <div className="aspect-[16/9] w-full overflow-hidden">
                <Image src={DummyPolyhouse || "/placeholder.svg"} alt={`Polyhouse ${name}`} className="h-full w-full object-cover" />
            </div>

            <div className="py-[0.15em] px-[5%] ">
                <h3 className="text-pretty text-lg font-semibold">{polyhouse.polyHouseName ?? polyhouse?.polyhouse_name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Admin: {branch_manager ?? polyhouse.contact_person}</p>
            </div>

            <Box className='flex items-center justify-between md:text-[0.5em] w-[80%] mx-auto py-[1.5%] border-t'>
            {/*  todo :  Enable both Edit and Delete Component for PolyERP - isDisabled = false */}
                <EditPolyhouseDetailsDynamic isDisabled={true} polyhouse={polyhouse} />
                <DeletePolyhouseDynamic isDisabled={true} handleDeleteItem={(polyhouse_id: string) => handleDeletePolyhouse(polyhouse_id)} item_id={polyhouse._id} />
            </Box>
        </Card>
    )
}