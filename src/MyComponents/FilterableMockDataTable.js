import React, { useState } from 'react';
import MockAPITable from './MockAPITable';
import SearchBar from './SearchBar';
import { useEffect } from 'react';

var numofPages = 20;
var nn = 0;

function FilterableMockDataTable({ api_data, errload }) {
  const originaldata = api_data
  const [filterData, setFilterData] = useState(originaldata);
  const [isAscending, setAscending] = useState(false);
  const [isAscendingText, setAscendingText] = useState(false);
  const [selected, setSelected] = useState(false);
  const [pageNo, setPageNo] = useState(1)

  const ArrowUp = () => <span>&#9650;</span>; // Unicode character for arrow up
  const ArrowDown = () => <span>&#9660;</span>;

  const handleSearch = (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredData = api_data.filter(item => item.title.slice(0, e.target.value.length).toLowerCase()===(searchValue)); 

    if (!filteredData.length){
      setFilterData(api_data);
      setSelected(false);
    }else{
      setFilterData(filteredData);
      if (searchValue.length<=0){
        setSelected(false)
      }else
      {setSelected(true)};
    }


  };

  function sorting(param){
    setAscending(!isAscending)
    const ascendingsort = filterData.slice().sort((a,b)=>{return isAscending? (a[param] - b[param]) : (b[param] - a[param])});
    setFilterData(ascendingsort)
    console.log(ascendingsort)
  }

  function sortingtext(param){
    setAscendingText(!isAscendingText)
    const ascendingsorttext = filterData.slice().sort((a,b)=>{return isAscendingText? (a[param].toLowerCase().localeCompare(b[param].toLowerCase()))
    : (b[param].toLowerCase().localeCompare(a[param].toLowerCase()))});
    setFilterData(ascendingsorttext)
    console.log(ascendingsorttext)
  }

  function Paginate(numofPages, pageno){
    
    
    let noofItems = (api_data.length/numofPages)
    
    if (pageNo <= numofPages){ 
      var slicedItems = api_data.slice(((pageNo-1) * noofItems), (pageNo * noofItems));
      if (!slicedItems.length){
        setFilterData(api_data)
      }else{
        setFilterData(slicedItems)
        setPageNo(pageno)
      }
    }
  }

  const Myvalue = () =>{
    return (
      <h3>There are {api_data.length} items in total</h3>
    );
  }

  useEffect(() => {
    Paginate(numofPages, pageNo)
  },[pageNo])

  return (
    <div className='container'>
      <div className='containerTable'>
        {/* <p>{errload}</p> */}
        <h2 className='title'>MockAPITable: Filter, Sort & Pagination</h2>
        <Myvalue />
        <SearchBar searchdata={api_data} onSearchdata={handleSearch} max_number={numofPages} onPaginate={Paginate} pagecount={pageNo}/>
      </div>
      
     
      <table>
      
      {/* <div className='dataheader'> */}
        <thead>
            <tr className='gridheader'>
              <th  onClick={()=>sorting(`id`)}>ID{isAscending ? <ArrowUp /> : <ArrowDown />}</th>
              <th  onClick={()=>sorting(`userId`)}>UserID{isAscending ? <ArrowUp /> : <ArrowDown />}</th>
              <th  onClick={()=>sortingtext(`title`)}>Title{isAscendingText ? <ArrowUp /> : <ArrowDown />}</th>
              <th  onClick={()=>sortingtext(`body`)}>Body{isAscendingText ? <ArrowUp /> : <ArrowDown />}</th>
            </tr>
        </thead>
      {/* </div> */}
        
      <div className='datatable'> 
      {/* <div className='datarow'> */}
        <tbody>
          {console.log(api_data)}
          {filterData.map(item => (
            <MockAPITable
              key={item.id}
              id={item.id}
              userid={item.userId}
              title={item.title}
              body={item.body}
              isselected = {selected}
            />
          ))}
        </tbody>
      {/* </div> */}
      </div>
      </table>
      </div>
      
    
  );
}

export default FilterableMockDataTable;