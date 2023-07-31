import { DataTable, HorizontalStack, Text } from '@shopify/polaris';
import React from 'react'

export default function ReferralStoreTable() {
    const referredStoreRow = [
        // [
        //   'Image with text',
        //   '10%',
        //   'Premium',
        //   'Premium',
        //   <span>12/05/2018</span>,
        //   <span>15%</span>,
        //   <span>15</span>,
        //   <span>15%</span>,
        //   <span>-</span>,
        // ],
        // [
        //   'Image with text',
        //   '10%',
        //   'Premium',
        //   'Premium',
        //   <span>12/05/2018</span>,
        //   <span>15%</span>,
        //   <span>15</span>,
        //   <span>15%</span>,
        //   <span>-</span>,
        // ],
        // [
        //   'Image with text',
        //   '10%',
        //   'Premium',
        //   'Premium',
        //   <span>12/05/2018</span>,
        //   <span>15%</span>,
        //   <span>15</span>,
        //   <span>15%</span>,
        //   <span>-</span>,
        // ],
      ]
      const NostoreData = [
        [
          <div className='nodata_table'>
            <img src="/assets/images/blank-store.svg" alt="nodata" />
                <p>Oops, no affiliates stores found</p>
          </div>
        ],
      ]

  return (
    <>
      <div className='top_head'>
        <HorizontalStack align="space-between">
          <Text variant="headingLg" as="h5">
            Referred stores
          </Text>
        </HorizontalStack>
        <div className='mt-3'>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'text',
            'text',
            'numeric',
            'numeric',
            'numeric',
            'text',
            'text',
          ]}
          headings={[
            'Store name',
            'Store commission',
            'Store plan',
            'Current plan',
            'Date registered',
            'Current commission',
            'Left reviews',
            'Total commission',
            'Actions',
          ]}
          rows={ referredStoreRow.length === 0 ?  NostoreData : referredStoreRow}
        />
        </div>
      </div>
    </>
  )
}
