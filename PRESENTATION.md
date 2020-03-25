# D3 mini workshop

Khôi Tran

---

## What's D3 anyway?

A pot-pourri of functions to help you all kind of stuffs.

I mean all kind of random stuffs, like lodash, jQuery, XMLHttpRequest, some math, physics simulation, animation... aaand last but not least some helpers for rendering on SVG and Canvas!

... so let's pick at the top of the ice berg by hacking a **D3 visualization app by ourselves**!

---

## Khôi's data visualization cookbook

1. Find a suitable data source
2. Basic visualization idea
3. Prepare your data (this is important!)
4. ???
5. Visualize it!

---

# Step 1: Find a suitable data source

Example:

https://data.opendatasoft.com/explore/dataset/open-beer-database%40public-us/export/

---

# Step 2: Basic visualization idea

1. List
2. HTML table
3. HTML table by country
4. Bubble chart

---

# Step 3: Prepare your data


---

## The four faces of D3

![Four horses](resources/fourhorses.jpg)

---

## D3 the DOM manipulator

Manipulating a single DOM element:

```javascript
d3.select('body')
  .attr('class', 'some-css-class')
  .style('background-color', 'red');
```

Adding DOM elements:

```javascript
d3.select('body')
  .append('a')
  .attr('href', 'https://blog.puzzle.ch')
  .text('Let us read some blog entries!');
```

---

## D3 the DOM manipulator (2)

Works for DOM events too:

```javascript
d3.select('body')
  .append('button')
  .text('click me')
  .on('click', () => 
    d3.select('body')
      .append('p')
      .text('someone clicked the button!')
  );
```

---

## D3 the data binder

Data is bound to DOM elements in D3.

```javascript

```