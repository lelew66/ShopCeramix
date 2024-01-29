import React from 'react';
import './Promo.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Promo () {

  const{ t }=useTranslation(['promo']);
  return (
    <div className='promo'>
        <p>{t("promo")}</p>
    </div>
  )
}
