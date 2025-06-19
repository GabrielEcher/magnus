import { cn } from "@/lib/utils";
import { planet } from "@lucide/lab";
import { Icon } from 'lucide-react';

export function SuspenseLoader() {
    return (
        <div className={cn("min-h-screen flex items-center justify-center")}>
            <div className="relative">
                <Icon iconNode={planet} size={128} className={cn(" animate-pulse relative z-10")} />

                {/* <div className={cn("absolute inset-0 w-12 h-12 bg-muted-foreground rounded-full  animate-ping")} /> */}
            </div>
        </div>
    )
}