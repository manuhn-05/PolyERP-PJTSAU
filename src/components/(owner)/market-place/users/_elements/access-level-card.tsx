import { Box, Text, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';

type AccessLevelCardProps = {
    accessLevelGiven : boolean;
    moduleIndex : number;
    path : string;
    handleUserLevelAccess : (moduleIndex : number, subAccessId ?: string) => void;
    id : string;
    subAccessLevel : {
        [key: string]: boolean;
    };
    mod_id : string;
}
const AccessLevelCard : React.FC<AccessLevelCardProps> = (props) => {
    const {accessLevelGiven, moduleIndex, path, handleUserLevelAccess, id, subAccessLevel, mod_id}=props;


      return (
        <Box border="1px solid #ccc" borderRadius="8px" className='p-[3.5%]'>
            <Box>
                <Text fontWeight="bold">{path?.charAt(0).toUpperCase() + path?.slice(1)}</Text>
                <FormControl display="flex" alignItems="center" mt="2">
                    <FormLabel mb="0">Main Access</FormLabel>
                    <Switch
                        isChecked={accessLevelGiven}
                        onChange={() => handleUserLevelAccess(moduleIndex)}
                    />
                </FormControl>
            </Box>
            <Box mt="4">
                <Text fontSize="sm" mb="2">Sub Access Levels:</Text>
                {
                    !subAccessLevel ? null : (
                        <Box className="md:grid grid-cols-2 gap-4">
                    {Object?.entries(subAccessLevel)?.map(([key, value], index) => {
                        const isSelected = Boolean(value);
                        return (
                            <FormControl key={key + index} display="flex" alignItems="center">
                       
                                <FormLabel mb="0" fontSize="sm">
                                    {key.charAt(0).toUpperCase() + key.slice(1)} 
                                </FormLabel>
                                <Switch

                                    isChecked={isSelected}
                                    onChange={() => handleUserLevelAccess(moduleIndex, key)}
                                />
                            </FormControl>
                        )
                    })}
                </Box>
                    )
                }
            </Box>
        </Box>
    );
};

export default AccessLevelCard;
