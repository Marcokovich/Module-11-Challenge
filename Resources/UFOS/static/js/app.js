// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {
  // 4a. Save the element that was changed as a variable.
  let chele = d3.select(this);
  // 4b. Save the value that was changed as a variable.
  let elval = chele.property("value");
  elval = elval.toLowerCase();
  // 4c. Save the id of the filter that was changed as a variable.
  let fid = chele.attr("id");
  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elval){
    filters[fid] = elval;
  }
  else{
    delete filters[fid];  
  }
  
  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;
  let filter_s = [filters];
  console.log(filter_s)
  // 9. Loop through all of the filters and keep any data that
  // matches the filter values using if statements.
  //note: I could use key, but somehow, using a variable in filter didn't work
  // so my work around was using multiple if statements
  for (const [key, value] of Object.entries(filter_s[0])){
    //I couldn't figure out how to extract the key and value from objects
    //google and stackoverflow came in to save the day
    if (key === "datetime"){
      filteredData = filteredData.filter(row => row.datetime === value);
    }
    if (key === "city"){
      filteredData = filteredData.filter(row => row.city === value);
    }
    if (key === "state"){
      filteredData = filteredData.filter(row => row.state === value);
    }
    if (key === "country"){
      filteredData = filteredData.filter(row => row.country === value);
    }
    if (key === "shape"){
      filteredData = filteredData.filter(row => row.shape === value);
    }
  }
  //console.log("we're out of the loop")
  
  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
// hehe evento listeingn for tha change in the inputu not final
d3.selectAll("input").on("change", updateFilters);
// Build the table when the page loads
buildTable(tableData);
