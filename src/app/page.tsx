import { Hero }              from '@/components/sections/Hero'
import { VisibilityProblem } from '@/components/sections/VisibilityProblem'
import { IntelligenceWall }  from '@/components/sections/IntelligenceWall'
import { HowTendaThinks }    from '@/components/sections/HowTendaThinks'
import { SocialProof }       from '@/components/sections/SocialProof'
import { InsightsJournal }   from '@/components/sections/InsightsJournal'
import { FinalCTA }          from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <VisibilityProblem />
      <IntelligenceWall />
      <HowTendaThinks />
      <SocialProof />
      <InsightsJournal />
      <FinalCTA />
    </>
  )
}
