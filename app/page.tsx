'use client';

import { LoadingScreen } from '@/components/sections/loading-screen';
import { RaghukulHero } from '@/components/sections/raghukul-hero';
import { DroneSequence } from '@/components/sections/drone-sequence';
import { TransitionShowcase } from '@/components/sections/transition-showcase';
import { StoryChapters } from '@/components/sections/story-chapters';
import { ImpactSection } from '@/components/sections/impact-section';
import { OurAllies } from '@/components/sections/our-allies';
import { VolunteerSection } from '@/components/sections/volunteer-section';
import { DonationSection } from '@/components/sections/donation-section';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <RaghukulHero />
      <DroneSequence />
      <TransitionShowcase />
      <StoryChapters />
      <ImpactSection />
      <OurAllies />
      <VolunteerSection />
      <DonationSection />
    </>
  );
}
