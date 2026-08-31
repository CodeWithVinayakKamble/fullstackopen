let data = ["United States", "United States Virgin Islands", "United States Minor Outlying Islands", "United KingDom", "unitedStatesOfAmerica", "British Indian Ocean Territory", "indian oCEan", "indonesia"];

let cName = "ind".toLowerCase()

let filterData = data.filter(country => {
    return country.toLowerCase().includes(cName);
});
console.log(filterData);

let exactName = "Indonesia".toLowerCase();
let findExact = filterData.find(country => {
    return country.toLowerCase() === exactName;
})

if (findExact) {
    filterData = [findExact]
    console.log("-----------------------------------------------");
    console.log(filterData);
} else {
    console.log("matched Not found!");
}

