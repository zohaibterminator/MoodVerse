import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Landingpage(){
    return(
        <div>Landinggg
            <div>
            <Link href="/sign-in"><Button>login</Button></Link>
            </div>
            <div>
            <Link href="/sign-up"><Button>signup</Button></Link>
            </div>
        </div>
    )
}