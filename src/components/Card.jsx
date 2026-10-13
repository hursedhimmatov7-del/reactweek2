import React from 'react'

const Card = ({id , name , age, email , settings , children}) => {
  return (
    <table>
      <thead>
        <tr className='uppercase'>
            <th>id</th>
            <th>name</th>
            <th>status</th>
            <th>age</th>
            <th>email</th>
            <th>settings</th>
        </tr>
      </thead>
      <tbody>
        
            {children}
        
      </tbody>
    </table>
  )
}
export default Card
