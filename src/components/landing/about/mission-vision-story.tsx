
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OUR_MISSION_VISION_STORY } from '@/components/landing/landing-page-constants'

const MissionVisionStory = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:w-[80%] mx-auto">
      {
        OUR_MISSION_VISION_STORY?.map(({ test_id, title, description }) => (
          <Card data-testid={test_id} key={test_id} className="rounded-2xl border-border/60">
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {description}
            </CardContent>
          </Card>

        ))
      }

    </div>
  )
}

export default MissionVisionStory;