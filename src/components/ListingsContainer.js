import React, {useEffect, useState} from "react";
import ListingCard from "./ListingCard";

function ListingsContainer( {search} ) {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/listings')
      .then(r => r.json())
      .then(listings => setListings(listings));
  }, [])

  function handleDeleteListing(id){
    const updatedListArray = listings.filter((listing) => listing.id !== id );
    setListings(updatedListArray)
  }

  const filteredListings = listings.filter((listing) => {
    return listing.description.toLowerCase().includes(search.toLowerCase());
  });

  const listingList = filteredListings.map((listing) => {
    return <ListingCard key={listing.id} listing={listing} onDeleteListing={handleDeleteListing} />
  })

  return (
    <main>
      <ul className="cards">
        {listingList}
      </ul>
    </main>
  );
}

export default ListingsContainer;
