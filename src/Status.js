import React from 'react'
import Page from './Layout/Page'
const Status = () => {
  return (
    <Page pageContent={(
      <>
    
      <div class="flex flex-col justify-center items-center align-middle">
 
    <div class="inline-block w-full py-2  lg:px-8 ">
      <div class="overflow-hidden">
        <table class=" text-center text-sm font-light bg-purple-50 mx-auto w-full">
          <thead
            class="border-b bg-purple-100 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" class=" px-6 py-4">Request ID</th>
              <th scope="col" class=" px-6 py-4">Date</th>
              <th scope="col" class=" px-6 py-4">Time</th>
              <th scope="col" class=" px-6 py-4">Status</th>
              <th scope="col" class=" px-6 py-4">Comments</th>

            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium">1</td>
              <td class="whitespace-nowrap  px-6 py-4">Mark</td>
              <td class="whitespace-nowrap  px-6 py-4">Otto</td>
              <td class="whitespace-nowrap  px-6 py-4">@mdo</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium">2</td>
              <td class="whitespace-nowrap  px-6 py-4 ">Jacob</td>
              <td class="whitespace-nowrap  px-6 py-4">Thornton</td>
              <td class="whitespace-nowrap  px-6 py-4">@fat</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium">3</td>
              <td colspan="2" class="whitespace-nowrap  px-6 py-4">
                Larry the Bird
              </td>
              <td class="whitespace-nowrap  px-6 py-4">@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    
  </div>
</div>
   
    </>)}/>
  )
}

export default Status
