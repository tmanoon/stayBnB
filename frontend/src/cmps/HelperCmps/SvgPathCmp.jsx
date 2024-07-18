import { staySvgService } from '../../services/stay-svg.service'

export function SvgPathCmp({ name }) {
const svgString = staySvgService[name]

    return <div dangerouslySetInnerHTML={{ __html: svgString }} />
}
