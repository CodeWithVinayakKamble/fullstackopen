# Documenting all steps for countries App

1. SuccessFully initilized react App. **npm create vite@latest countries -- --template react**

2. created `SearchBar Component` with input in component folder *src/component* and `Captured into react State` in App.

3. created services folder *sec/services* that handle all communication process by `axios`.

4. initiated another state for storing response which is came from [restcountries API](https://studies.cs.helsinki.fi/restcountries/api/all).

5. we fetched data successfully from api and stored into react state okay but now we need acontainer that will display all data on conditions.

    - conditions :-

        * if request does not found anything ,it will show `No match found`

        * if returned data.length has more than 10, it will show `too many matches,specify another filter`

        * if returned data has exact one matched it will redirected to another component called `CountryToShow`. that component has difrent job.

        * if returned data has between 2-10 range it will stay in same component and shows all list of matched countries name with *show* `<Button>`

6. 

