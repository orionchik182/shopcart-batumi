import { Product } from '@/sanity.types'
import { getBrand } from '@/sanity/queries'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import React from 'react'

const ProductCharacteristics = async({product}: {product:Product | null | undefined}) => {
    const brand = await getBrand(product?.slug?.current as string);
    console.log(brand)
  return (
    <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
            <AccordionTrigger>
                {product?.name}: Characteristics
            </AccordionTrigger>
            <AccordionContent>
                <p className='flex items-center justify-between'>Brand: {brand && <span className='font-semibold tracking-wide'>{brand[0]?.brandName}</span>}</p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics