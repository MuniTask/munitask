import React from 'react'

export default function AskAQuestion() {
  return (
    <div className='ask-a-question-container '>
      <form className='d-flex flex-column mx-auto'>
      <label for="question">Ask a question</label>

      <textarea className='w-75' id="question" name="question" rows="4" cols="50"/>
      <button className='w-25' type='submit'>Submit</button>
      </form>
     
      
    </div>
  )
}
