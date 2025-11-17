"use client";
import React from 'react'
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import { LANGUAGE_SELECTOR } from '@/constants/language-consts';
import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useAppDispatch, useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { setLanguage } from '@/data-handling/store/slices/user-slice';
import { USER_LANGUAGE } from '@/types/redux-types';



const LanguageSelctor = () => {
    const {language} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const {  i18n } = useTranslation("common");
    const handleChange = (selectedOption: any) => {
        i18n.changeLanguage(selectedOption.value);
        dispatch(setLanguage({
            id : selectedOption.value,
            label: selectedOption.label,
            value: selectedOption.value
        }));
      };

  return (
    <div>
        <Select value={language}  onChange={handleChange} options={LANGUAGE_SELECTOR as Array<USER_LANGUAGE>}  styles={{...SELECT_COMPONENT_STYLES}} />
    </div>
  )
}

export default LanguageSelctor