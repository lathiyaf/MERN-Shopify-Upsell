import { DataTable, HorizontalStack, Icon, Select, Text } from '@shopify/polaris';
import React, { useCallback, useState } from 'react'
import PaginationCustom from '../Common/PaginationCustom';
import { ChevronDownMinor } from '@shopify/polaris-icons';

export default function PaymentHistoryTable({setSetting}) {
    const historyData = [
        // [
        //   'sara.cruz@example.com',
        //   '₹50,000',
        //   <span>05/06/2015</span>,
        // ],
        // [
        //   'sara.cruz@example.com',
        //   '₹50,000',
        //   <span>05/06/2015</span>,
        // ],
        // [
        //   'sara.cruz@example.com',
        //   '₹50,000',
        //   <span>05/06/2015</span>,
        // ],
      ]
      const NohistoryData = [
        [
          <div className='nodata_table'>
            <img src="/assets/images/blanktable.svg" alt="nodata" />
                <p>Oops, no payment history found</p>
          </div>
        ],
      ]
      
    const [selected, setSelected] = useState('enabled');

    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
      const Pageoptions = [
        {
            label: '1',
            value: '1',
            suffix: <Icon source={ChevronDownMinor} />
        },
        {
            label: '2',
            value: '2',
            suffix: <Icon source={ChevronDownMinor} />
        },
        {
            label: '3',
            value: '3',
            suffix: <Icon source={ChevronDownMinor} />
        },
        {
            label: '4',
            value: '4',
            suffix: <Icon source={ChevronDownMinor} />
        },
    ];

    const footerPayment =[
      <>
        <HorizontalStack gap='4' align="space-between">
            <HorizontalStack gap='4'>
                <Select
                    options={Pageoptions}
                    onChange={handleSelectChange}
                    value={selected}
                />
                Showing {historyData.length} of {historyData.length} results
            </HorizontalStack>
            <PaginationCustom />
        </HorizontalStack>
      </>
    ]
    const nofooter = [
      
    ]

  return (
    <>
      <div className='top_head'>
        <HorizontalStack align="space-between">
          <Text variant="headingLg" as="h5">
          Payment history
          </Text>
        </HorizontalStack>
        <div className='mt-3'>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'text',
          ]}
          headings={[
            'PayPal email',
            'Paid amount',
            'Date added',
          ]}
          rows={ historyData.length === 0 ?  NohistoryData : historyData}
          footerContent={historyData.length === 0 ? nofooter : footerPayment}
        />
        </div>
      </div>
    </>
  )
}
