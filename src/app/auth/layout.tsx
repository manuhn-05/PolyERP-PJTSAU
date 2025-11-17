import React from 'react'

type Props = {}

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <article>
      <section className='md:w-[90%] mx-auto'>
      <div>

</div>
 {children}
      </section>
    </article>
  )
}

export default AuthLayout;