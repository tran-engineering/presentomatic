# D3 mini workshop

Khôi Tran

---

## What's D3 anyway?

A pot-pourri of functions to help you all kind of stuffs.

I mean all kind of random stuffs, like lodash, jQuery, XMLHttpRequest, some math, physics simulation, animation... aaand last but not least some helpers for rendering on SVG and Canvas!

... so let's pick at the top of the ice berg by hacking a **D3 visualization app by ourselves**!
By only using javascript and d3 and **no other libraries**.

---

## Khôi's data visualization cookbook

1. Find a suitable data source
2. Basic visualization idea
3. Prepare your data (this is important!)
4. Visualize it!

---

## Step 1: Find a suitable data source

Finding good, machine-readable, useable data is probably the most difficult task.

For our hacking course:

https://github.com/daenuprobst/covid19-cases-switzerland/blob/master/covid_19_cases_switzerland_standard_format.csv

---

## Step 2: Basic visualization idea

1. Current total cases in HTML list and table by canton
 * d3 as DOM manipulator

2. Bubble chart
 * d3 as physics simulator

3. Basic chart
 * d3 as SVG helper

4. On a colored map!
 * use d3 as GeoJSON helper

Let's do them as exercises!

---

## Step 3: Prepare your data

I've never found any data sources without issues:
 * Missing data points
 * Inconsistent data
 * Encoding issues (UTF-8, ISO, etc.)

Common pitfalls:
 * Loading data from CSV has no types - all data are strings.
 * Use Javascript Date Objects

`fetchCovidData()` fetches and transforms data. Let's have a look at it.

---

# Exercise 1: Display a HTML Table

---

## E1: Our data?!

The first question: Is our data already in the right form for this visualization?

What would we have to change?

---

## E1: D3 data grouping

`d3.nest()` can group and aggregate data.

```javascript
const groupByCanton = d3.nest()
  .key(d => d.abbreviation_canton);

const groupedData = groupByCanton.entries(data);
// [{key: "BE", values: [...], key: "ZH", values: [...]}]

const groupedObject = groupByCanton.object(data);
// {BE: [...], ZH: [...]}
```

---

## E1: d3 data aggregation

`d3.nest().rollup()` can perform functions on groups.

```javascript
const aggregator = d3.nest()
  .key(d => d.abbreviation_canton)
  .rollup(values => d3.max(values, d => d.total_currently_positive_cases));

const totalCasesByCanton = aggregator.entries(data)
  .sort((a,b) => d3.descending(a.value, b.value));
// [{key: "BE", value: 259}, {key: "ZH", value: 542}]
```

---

## E1: display data in a simple list

D3 as DOM manipulator

```javascript
d3.select('main') // select the first html <main> tag
  .append('ul') // append an <ul> tag
  .selectAll('li') // for all all <li> tags...
  .data(totalCasesByCanton) // ... bind the data array
  .join('li') // append a new <li> DOM element
  .text(d => `${d.key} : ${d.value}`);
```

---

## E1: display data in a table

```javascript
d3.select('main') // select the first html <main> tag
  .append('table') // append an <ul> tag
  .selectAll('tr') // for all all <li> tags...
  .data(totalCasesByCanton) // ... bind the data array
  .join('tr') // append a <tr> element
  .call(tr => { // append <td> elements on <tr>
    tr.append('td').text(d => d.key);
    tr.append('td').text(d => d.value);
  });
```

---

## E1: colorize your data

We wan't to get a color for a value,

... so let's learn about d3 scales!

---

## D3 scales: Glossary

* Domain: Input values
* Range: Output values

---

## D3 scales: Mostly used scale types

* `d3.scaleLinear()`: Continuous domain -> continuous range. (value -> screen x coordinate)
* `d3.scaleLog()`: Continuous domain -> logarithmic range (logarithmic charts)
* `d3.scaleTime()`: Continuous domain (Date objects) -> continous range
* `d3.scaleThreshold()`: Continous domain -> discrete range (< 200 : 'red', > 200: 'yellow', > 1000: 'green')
* `d3.scaleQuantize()`: like threshold, but let d3 compute range (split domain to equal parts)
* `d3.scaleQuantile()`: like threshold, but let d3 compute range (split domain to frequency)

---

## D3 scales: create our scales

```javascript
const linearColor = d3.scaleLinear()
  .domain(d3.extent(totalCasesByCanton, d => d.value))
  .range(['green', 'red']);
// linearColor(2500) => '#f00'
// linearColor(0) => '#0f0'

const thresholdColor = d3.scaleThreshold()
  .domain([10, 300])
  .range(['green', 'yellow' ,'red']);
// thresholdColor(0) => green
// thresholdColor(10) => yellow
// thresholdColor(300) => red

const quantizeColor = d3.scaleQuantize()
  .domain(d3.extent(totalCasesByCanton, d => d.value))
  .range(['green', 'yellow' ,'red']);

const quantileColor = d3.scaleQuantile()
  .domain(totalCasesByCanton.map(d => d.value))
  .range(['green', 'yellow' ,'red']);
```

---

## D3 scales: colorize our table rows

```javascript
d3.select('main') // select the first html <main> tag
  .append('table') // append an <ul> tag
  .selectAll('tr') // for all all <li> tags...
  .data(totalCasesByCanton) // ... bind the data array to the DOM elements
  .join('tr')
  .call(tr => {
    tr.append('td').text(d => d.key);
    tr.append('td').text(d => d.value);
  })
  .style('background-color', d => quantileColor(d.value)); // try out other scales!
```

---

## D3 transitions: add some fancyness

```javascript
d3.select('main') // select the first html <main> tag
  .append('table') // append an <ul> tag
  .selectAll('tr') // for all all <li> tags...
  .data(totalCasesByCanton) // ... bind the data array to the DOM elements
  .join('tr')
  .call(tr => {
    tr.append('td').text(d => d.key);
    tr.append('td').text(d => d.value);
  })
  .style('opacity', 0)
  .style('transform', 'translate(80px,0)rotate(30deg)')
  .transition()
  .delay((d,i) => i * 100) // delay by 100 ms * index
  .style('opacity', 1)
  .style('transform', 'translate(0,0)')
  .transition()
  .duration(2500)
  .style('background-color', d => quantileColor(d.value)); // try out other scales!
```


---

# Exercise 1 done: questions?

---

## Exercise 2: Bubble chart

---

