import { FunctionComponent, useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { SurvivalChance } from './types'
import { formatPercent } from './utils/formatPercent'

type Props = {
  survivalChances: SurvivalChance[]
  width?: number
  height?: number
}

export const ProbabilityDiagram: FunctionComponent<Props> = ({
  survivalChances,
  width = 800,
  height = 600,
}) => {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (ref.current) {
      // Setup the SVG
      const svg = d3.select(ref.current)

      // Draw the diagram
      drawDiagram(svg, survivalChances)
    }
  }, [survivalChances])

  return <svg width={width} height={height} ref={ref} />
}

const drawDiagram = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: Props['survivalChances']
) => {
  // Remove all previous contents of the svg
  svg.selectAll('*').remove()

  // Set up scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, 700])
    .padding(0.2)

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)] as [number, number])
    .range([300, 0])

  // Create bars
  svg
    .append('g')
    .attr('transform', 'translate(50, 50)') // Adjust position
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d.label) ?? 0)
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => 300 - yScale(d.value))
    .attr('fill', (d) => (d.side === 'attack' ? 'blue' : 'red'))

  // Add text labels
  svg
    .append('g')
    .attr('transform', 'translate(50, 50)')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => formatPercent(d.value)) // Format value as percentage
    .attr('x', (d) => xScale(d.label)! + xScale.bandwidth() / 2) // Center text in bar
    .attr('y', (d) => yScale(d.value) + 20) // Position text slightly above top of bar
    .attr('text-anchor', 'middle') // Center text horizontally
    .attr('fill', 'white') // Text color
    .attr('font-size', '12px')

  // Add x-axis
  svg
    .append('g')
    .attr('transform', 'translate(50, 350)')
    .call(d3.axisBottom(xScale))
    .selectAll('.tick text')
    .call(wrap, xScale.bandwidth())

  // Add y-axis
  svg.append('g').attr('transform', 'translate(50, 50)').call(d3.axisLeft(yScale))
}

function wrap(text: d3.Selection<d3.BaseType, unknown, SVGGElement, unknown>, width: number) {
  text.each(function () {
    const text = d3.select(this)
    const words = text.text().split(/\s+/).reverse()
    let word
    let line = [] as string[]
    let lineNumber = 0
    const lineHeight = 1.1 // ems
    const y = text.attr('y')
    const dy = parseFloat(text.attr('dy'))
    let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', `${dy}em`)

    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(' '))

      const node = tspan.node()
      if (node && node.getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', `${++lineNumber * lineHeight + dy}em`)
          .text(word)
      }
    }
  })
}
