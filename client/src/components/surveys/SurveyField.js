import React from 'react'

export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...input} />
    </div>
  )
}
