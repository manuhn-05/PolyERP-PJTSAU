import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {}

const MapPreviewComponent = (props: Props) => {
  return (
    <div className={`w-full`}>
      <Card className="border-border/60 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Find us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg">
        <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7989861485726!2d77.594623275506!3d12.984705014589965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16660f63ffff%3A0xad12cc4083c8d2ea!2sDemetrix%20Infotech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1760360671890!5m2!1sen!2sin" 
      width="100%" height="450"  allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </CardContent>
    </Card>
      
    </div>
  )
}

export default MapPreviewComponent