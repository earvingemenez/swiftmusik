import { createViewsWithCommonIncludes } from 'app/utils/index';

import { LandingComponent } from 'app/components/main/landing/landing.component';

const landingState = {
  name: 'landingState',
  url: '/',
  views: createViewsWithCommonIncludes(LandingComponent)
}

export const MAIN_STATES = [
  // Add states here
  landingState
]
