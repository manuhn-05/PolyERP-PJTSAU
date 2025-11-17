import { Input } from '@chakra-ui/react';
import React from 'react';
type SearchBarComponentProps = {
    placeholder?: string;
    value : string;
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBarComponent : React.FC<SearchBarComponentProps> = ({placeholder = 'Search Bar', value, onChange}: SearchBarComponentProps) => {

  return (
    <div className='w-full md:mx-[2%] '>
        <Input placeholder={placeholder} _dark={{border : 'none', outline : 'none'}} value={value} 
        onChange={onChange}
        _focus={{border : 'none', outline : 'none'}} className='w-full border-b' 
        ring={'none'} border={'none'} outline={'none'} borderBottom={'1px solid #D1D5DB'} rounded={'none'}
        _placeholder={{textTransform : 'capitalize', color : 'gray.400'}}
        />
    </div>
  )
}

export default SearchBarComponent;