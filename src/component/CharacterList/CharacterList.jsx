import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import "./CharacterList.css";
const placeholderImage = 'https://via.placeholder.com/150';

function CharacterList() {
  // Define state variables using useState hook
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lazyLoadingEnabled, setLazyLoadingEnabled] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (initialLoad || !lazyLoadingEnabled) {
          setCharacters(data.results);
          setTotalPages(data.info.pages); // Set total pages count
          setLoading(false);
          setInitialLoad(false);
        } else {
          // If lazy loading is enabled
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...data.results,
          ]);
          setTotalPages(data.info.pages);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message); // Set error message
        setLoading(false);
      }); // Log error if fetch fails
  }, [page, lazyLoadingEnabled, initialLoad]); // Run effect when page, lazyLoadingEnabled, or initialLoad changes

  useEffect(() => {
    if (lazyLoadingEnabled) {
      // If lazy loading is enabled
      observer.current = new IntersectionObserver(
        (entries) => {
          // Create intersection observer to observe last character card
          if (
            entries[0].isIntersecting &&
            !loading &&
            currentPage < totalPages
          ) {
            // If last character card is intersecting and not loading and current page is less than total pages
            setPage((prevPage) => prevPage + 1); // Increment page
            setCurrentPage((prevPage) => prevPage + 1); // Increment current page for display
          }
        },
        {
          threshold: 0.5, // Set threshold to 0.5
        },
      );

      if (observer.current) {
        observer.current.disconnect(); // Disconnect existing observer
      }

      const target = document.querySelector(
        ".character-grid .character-card:last-child",
      ); // Get last character card
      if (target) {
        observer.current.observe(target); // Observe last character card
      }

      return () => observer.current && observer.current.disconnect(); // Cleanup observer on unmount
    }
  }, [loading, currentPage, totalPages, lazyLoadingEnabled]); // Run effect when loading, currentPage, totalPages, or lazyLoadingEnabled changes

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
      setCurrentPage(prevPage);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const handleLazyLoadingToggle = (event) => {
    if (!event.target.checked) {
      setPage(1);
      setCurrentPage(1);
    }
    setLazyLoadingEnabled(event.target.checked);
    setInitialLoad(true);
  };

  const handleSearchClick = () => {
    setSearching(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    // Handler for search button click
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchInput}`,
      ); // Fetch characters data based on search input
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setSearching(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handleFilterClick = async () => {
    setFilterVisible(!filterVisible);
    if (!locations.length) {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/location",
        );
        const data = await response.json();
        setLocations(data.results.map((location) => location.name));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
  };

  const handleLocationChange = (location) => {
    const updatedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(updatedLocations);
  };

  return (
    <div>
      {loading ? (
        <div className="loader">
          <img
            src={placeholderImage} // Add your loader image source here
            alt="Loader"
            className="loader-thumbnail"
          />
          <div className="loader-info">
            <h2 className="loader-name">Loading...</h2>
            {/* Add other loader information if needed */}
          </div>
        </div>
      ) : (
        <>
          <div className="character-list">
            {error && <div className="error-message">{error}</div>}
            <div className="search-filter-icons">
              {!searching ? (
                // Render search icon if not searching
                <i onClick={handleSearchClick} data-text="Search">
                  <AiOutlineSearch />
                </i>
              ) : (
                // Render search input if searching
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search character..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <button onClick={handleSearch}>Search</button>
                </div>
              )}
              <i onClick={handleFilterClick} data-text="Filter">
                <AiOutlineFilter />
              </i>{" "}
              {/* Render filter icon */}
              <label className="lazy-loading-toggle">
                <input
                  type="checkbox"
                  checked={lazyLoadingEnabled}
                  onChange={handleLazyLoadingToggle}
                />
                Enable Lazy Loading
              </label>{" "}
              {/* Render lazy loading toggle */}
            </div>
            {filterVisible && (
              // Render filter popup if filter is visible
              <div className="filter-popup">
                <FaTimes className="close-icon" onClick={handleFilterClick} />
                {locations.map((location) => (
                  <div key={location}>
                    <input
                      type="checkbox"
                      id={location}
                      value={location}
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                    />
                    <label htmlFor={location}>{location}</label>
                  </div>
                ))}
              </div>
            )}
            <div className="character-grid">
              {characters.map((character, index) => (
                <Link
                  to={`/characters/${character.id}`}
                  key={character.id}
                  className="character-card"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="character-thumbnail"
                  />
                  <div className="character-info">
                    <h2 className="character-name">{character.name}</h2>
                    <p className="character-status">{character.status}</p>
                    <p className="character-species">{character.species}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pagination-bottom-right">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterList;
