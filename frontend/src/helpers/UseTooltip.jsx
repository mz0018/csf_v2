import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
export const UseTooltip = ({ children, content }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}