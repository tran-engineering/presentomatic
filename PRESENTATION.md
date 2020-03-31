# D3 mini workshop

Khôi Tran

---

## Hands up

Who ever worked with D3 yet?

![fsdf](https://ahseeit.com//king-include/uploads/2019/10/69785157_480602692791661_4152319240238432258_n-7552999206.jpg)

---

## What's D3?

A pot-pourri of functions to help you all kind of stuffs.

I mean all kind of random stuffs, like lodash, jQuery, XMLHttpRequest, some math, physics simulation, animation... aaand last but not least some helpers for rendering on SVG and Canvas!

... so let's pick at the top of the ice berg by hacking a **D3 visualization app by ourselves**!
By only using javascript and d3 and **no other libraries**.

---

## Khôi's data visualization cookbook

1. Basic visualization idea
2. Find a suitable data source
3. Prepare your data (this is important!)
4. Visualize it!

Nice sources of data:

* https://opendata.swiss
* https://data.opendatasoft.com

---

## Step 1: Basic visualization idea

1. Current total cases in HTML list and table by canton<br>
   D3 as DOM manipulator
2. Basic chart<br>
   D3 as SVG Helper
3. Bubble chart<br>
   D3 as physics simulator
4. On a colored map!<br>
   D3 as GeoJSON drawer

---

## Step 2: Find a suitable data source

Finding good, machine-readable, useable data is probably the most difficult task.

For our hacking course:

https://github.com/daenuprobst/covid19-cases-switzerland/blob/master/covid_19_cases_switzerland_standard_format.csv

Also clone the d3-sandbox I prepared:

```bash
git clone https://github.com/KeeTraxx/d3-sandbox
```

---

## Step 3: Prepare your data

I've never found any data sources without issues:
 * Missing data points
 * Inconsistent data
 * Encoding issues (UTF-8, ISO, etc.)

Common pitfalls for D3:
 * Loading data from CSV has no types - all data are strings.
 * Use Javascript Date Objects

`fetchCovidData()` fetches and transforms data. Let's have a look at it.

---

# Exercise 1: Display a HTML Table

![](./src/
img/exercise1.png)

---

## Our data?!

The first question: Is our data already in the right form for this visualization?

What would we have to change?

---

## D3 data grouping

`d3.nest()` can group and aggregate data.

```javascript
  const groupByCanton = d3.nest()
    .key(d => d.abbreviation_canton);

  const groupedData = groupByCanton.entries(data);
  // [{key: "BE", values: [...], key: "ZH", values: [...]}]

  const groupedObject = groupByCanton.object(data);
  // {BE: [...], ZH: [...]}

  console.log(groupedData);
```

Similar to `_.pluck(...)`

---

## D3 data aggregation

`d3.nest().rollup()` can perform functions on nested data.

```javascript
  const aggregator = d3.nest()
    .key(d => d.abbreviation_canton)
    .rollup(values => d3.max(values, d => d.total_currently_positive_cases));

  const totalCasesByCanton = aggregator.entries(data)
    .sort((a,b) => d3.descending(a.value, b.value));

  console.log(totalCasesByCanton);
```

---

## Display data in a simple list

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

## Display data in a table

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

## Colorize your data

This is a visualization workshop, so it has to be colorful!

... so let's learn about d3 scales!

---

## D3 scales: Glossary

* Domain: Input values
* Range: Output values

---

## D3 scales: Mostly used scale types

* `d3.scaleLinear()`: Continuous domain -> continuous range. (value -> screen x coordinate)
* `d3.scaleLog()`: Continuous domain -> logarithmic range (logarithmic charts)
* `d3.scaleTime()`: Continuous domain (Javascript Dates) -> continous range
* `d3.scaleThreshold()`: Continous domain -> discrete range (< 200 : 'green', > 200: 'yellow', > 1000: 'red')
* `d3.scaleQuantize()`: like threshold, but let d3 compute range (split domain to equal parts)
* `d3.scaleQuantile()`: like threshold, but let d3 compute range (split domain according to data frequency)

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

# Exercise 2: A simple chart using D3

I usually don't recommend drawing charts with D3, but when I do, I'll probably land in hell.

---

## Disclaimer

If you just need a simple chart, just use a library for that!

* chart.js
* anychart

Don't do it with d3! But let's get on with that cold shower...

---

## Add a SVG element to our document

```javascript
  const chartElement = d3.select('main')
    .append('svg')
    .attr('width', 960)
    .attr('height', 500)
    .attr('viewBox', '0 0 960 500')
    .append('g')
    .attr('transform', 'translate(50,50)');

  // chartElement references the <g> element
```

---

## Add the horizontal scale and axe

```javascript
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0,800]);

  const xAxis = d3.axisBottom(x);

  chartElement
    .append('g')
    .attr('transform', 'translate(0,400)')
    .call(xAxis);
```

---

## Add the vertical scale and axe

```javascript
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.total_currently_positive_cases))
    .range([400,0]);

  const yAxis = d3.axisLeft(y);

  chartElement
    .append('g')
    .call(yAxis);
```

---

## Create our line generator

```javascript
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.total_currently_positive_cases));
```

A line generator creates a string for the "d" attribute in SVG <path> elements.

---

## Draw a line for each canton

```javascript
  chartElement
    .append('g')
    .selectAll('path')
    .data(groupedData)
    .join('path')
    .style('stroke', (d, i) => d3.schemeCategory10[i % 10])
    .attr('d', d => line(d.values));
```

---

## Add a label for each canton

```javascript
  chartElement
    .append('g')
    .selectAll('text')
    .data(groupedData)
    .join('text')
    .text(d => d.key)
    .attr('x', d => x(d.values.slice(-1)[0].date))
    .attr('y', d => y(d.values.slice(-1)[0].total_currently_positive_cases))
    .style('fill', (d, i) => d3.schemeCategory10[i % 10]);
```

---

## Exercise 3: Bubble chart

---

