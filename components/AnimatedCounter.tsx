"use client"
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div className='w-full total-balance-amount flex-center gap-2'>
        <CountUp
        decimal=','
        prefix='$'
        duration={2}
        decimals={2}
        end={amount}
        
        />
    </div>
  )
}

export default AnimatedCounter
