import { CardComponentProps } from '@/types'
import React from 'react'

type Props = CardComponentProps & { row : any, id_type : any }

const DynamicCardComponent = ({cardHeaders, endpoint, components, row, id_type}: Props) => {
  return (
   <>
    <div className="p-4 rounded-2xl shadow-xl bg-gray-100 border dark:bg-gray-800 flex justify-between flex-col">
            
            <div className="grid grid-cols-2 gap-4">
              {cardHeaders?.map(({ key }) =>{
                // Checks if the value is number or not if it is not a number then spit it by _ and joins with a space
                const key_value = isNaN(row?.[key]) ? row?.[key]?.split("_").join(" ") : Number(row?.[key])
                return  (
                  <div key={key} className="flex flex-col flex-wrap w-full">
                    <span className="text-sm text-gray-500 capitalize">
                      {`${key}`.split("_").join(" ")}
                    </span>
                    <span className="text-base font-medium text-gray-800 dark:text-white capitalize">
  
                      {`${key_value ?? "--"}` }
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="border-t flex justify-center items-center gap-[3%] py-[2%]">
              {/* <EditDetailsDynamic endpoint={endpoint} item={row} />
              <DeleteDetailsDynamic endpoint={endpoint} item={row} /> */}
              {components!.length > 0 && (
                        <>

                          <div
                            className="grid grid-cols-2"
                          >
                            {components?.map((Component, idx) => (
                              <Component
                                key={idx}
                                endpoint={endpoint}
                                id_type={id_type}
                                item={row}

                                />
                            ))}
                          </div>
                        </>
                      )}
            </div>
          </div>
   </>
  )
}

export default DynamicCardComponent;