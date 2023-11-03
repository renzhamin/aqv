import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import suggestionsArray from "./suggestionsArray";

const Test = () => {
    // Define your input value and suggestions
    const [value, setValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);


    // Function to get suggestions based on user input
    const getSuggestions = (inputValue) => {
      const inputValueLower = inputValue.toLowerCase();
      return suggestionsArray.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValueLower)
      );
    };
  
    // Function to render suggestions
    const renderSuggestion = (suggestion) => (
      <div>
        {suggestion}
      </div>
    );
  
    // Function to handle input change
    const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value));
    };
  
    // Function to clear suggestions when input is cleared
    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    // Input change handler
    const onInputChange = (event, { newValue }) => {
      setValue(newValue);
    };
  
    // Render the Autosuggest component
    const inputProps = {
      placeholder: 'city',
      value,
      onChange: onInputChange,
    };
  
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  };
  

  

export default Test;
