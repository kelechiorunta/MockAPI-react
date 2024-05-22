import React from 'react'

function SearchBar({searchdata, onSearchdata, max_number, onPaginate, pagecount}) {
  return (
      <div>
        <form>
            {/* <label > */}
                <input type='text' placeholder='Search Title' onChange={onSearchdata}/>
                <span><b>Pages:</b></span><input type='number' value={pagecount} min={1} max={max_number} onChange={(e)=>{onPaginate(max_number, e.target.value)}}/>
            {/* </label> */}
            
        </form>
      </div>
  )
}

export default SearchBar