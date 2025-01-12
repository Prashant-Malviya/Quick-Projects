import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSearch } from "../context/searchContext";

function Items() {
  const [items, setItems] = useState([]);

  const { searchTerm, setSearchTerm } = useSearch();

  const [filteredItems, setFilteredItems] = useState([]);

  const [SelectedOption,setSelectedOption] = useState("");

  const [currentPage,setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredItems.length/itemsPerPage);

  const fetchItems = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const responseData = response.data;
    setItems(responseData);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    let filterItems = items;
    console.log("searchterm",searchTerm);
    
    if (searchTerm) {
      filterItems = filterItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if(SelectedOption){
        filterItems = filterItems.filter((item)=>
            item.title.charAt(0).toUpperCase() === SelectedOption
        );
    }

    setFilteredItems(filterItems);
    setCurrentPage(1);
  }, [items, searchTerm,SelectedOption]);

//   const currentItems = filteredItems.slice(0, 10);

  const uniqueFirstChar = Array.from(new Set(items.map((item)=>item.title.charAt(0).toUpperCase()))).sort()

  console.log("slelcted option",SelectedOption);

  const handlePageChange = (newPage)=>{
    if(newPage>=1 && newPage<=totalPages){
        setCurrentPage(newPage)
    }
  }

  const currentItems = filteredItems.slice(
    (currentPage-1)*itemsPerPage,
    currentPage*itemsPerPage
  )
  
  
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center space-y-10 w-1/2 mx-auto">
        <div className="my-10">
          <input
            type="text"
            placeholder="search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-gray-500 w-72 font-bold rounded-full px-4 py-4"
          />
        </div>

        <div className="my-4 space-y-2">

        <label htmlFor="selectOptions" className="font-bold">Select an option</label>

        <select 
         id="selectOptions"
         value={SelectedOption}
         onChange={(e)=> setSelectedOption(e.target.value)}
         className="w-full p-4 border-2 border-amber-400"
         >
         {
            uniqueFirstChar.map((item,index)=>
                <option value={item} key={index}>{item}</option>
            )
         }

       
        
        </select>
        </div>

        <div className="flex flex-col items-center justify-center space-y-5">
          {currentItems.map((item) => (
            <div
              className="font-bold px-10 py-5 border-2 border-yellow-100 shadow-md"
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="flex flex-row space-x-3 relative bottom-5">
          <button 
          className="px-56 py-2 bg-amber-100 rounded-lg" 
          onClick={()=>handlePageChange(currentPage-1)}
          disabled={currentPage === 1}
          >prev</button>
          <p>{currentPage}</p>
          <button 
          onClick={()=>handlePageChange(currentPage+1)}
          disabled={currentPage === totalPages}
          className="px-56 py-2 bg-amber-100 rounded-lg"
          >next</button>
        </div>
      </div>
    </div>
  );
}

export default Items;
