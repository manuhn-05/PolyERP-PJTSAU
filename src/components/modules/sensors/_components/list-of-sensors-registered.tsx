import { DUMMY_SENSORS_VALUES } from '@/constants/dummy-modules'
import React from 'react'
import SensorViewCard from '@/components/modules/sensors/_components/sensors-card'


const ListOfSensorsRegistered = () => {
  return (
    <section className={`grid md:grid-cols-4 gap-[2%] md:text-[0.45em]`}>
        {
            DUMMY_SENSORS_VALUES?.map((sensor : any, idx : number) => (
                <div key={idx}>
                
                <SensorViewCard 
                sensor_name={sensor.sensor_name}
                unit={sensor?.unit} 
                absolute_minimum={Number(sensor?.absolute_minimum)} 
                absolute_maximum={Number(sensor?.absolute_maximum)} 
                actual={Number(sensor?.actual_value)} 
                thresholdMax={Number(sensor?.threshold_maximum)}
                thresholdMin={Number(sensor?.threshold_minimum)}
                />

                </div>
            ))
        }
    </section>
  )
}

export default ListOfSensorsRegistered