import SafeConnect from "../components/SafeConnect";
import SignInBanner from "../public/images/accounts/sign-in-banner.jpg"
import Loader from '../components/basic/loader/Loader';

// export default function Test() {
//     return (
//       <div>
//         <SafeConnect />
//       </div>
//     );
//   }

import React from 'react';


const page = () => {
    return (
        <div className='w-full bg-plain bg-cover h-screen'>
            <div className='flex justify-between'>
                <img src='/images/accounts/sign-in-banner.jpg' className='h-screen' />
                <div className='m-auto gap-y-6'>
                    <h1 className='text-6xl text-secondary font-primary text-[58px] font-extrabold'>
                        LOG IN 
                    </h1>
                        
                        <h1 style={{color: '#212429'}} className='text-[#212429]'>Sydney
                         <span style={{color: '#00B8B9'}} className="text-[#00B8B9]">Verse</span>
                        </h1>
                    
                    {/* buttons */}
                    <div className='mt-10 flex justify-start'>
                        <SafeConnect />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page