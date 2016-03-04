# Marginalia
Page Layout calculator and planner for comics

Currently this web app just calculates options for live area dimensions for work media that is proportional to an end print size.
The dimensions are calculated in Inches and the options divisible by 1/16th or 1/8th of an inch.

##Planned Features

1. Each dimension calculation constructs an object containing the following properties:
  a. Live area dimensions
  b. Margin offset calculations from work media size
  c. Fraction (string) values for dimensions displayed on click of value
  d. centers for each dimension
  e. dimension conversion to pixels for SVG rendering
  f. additional properties for SVG rendering (undeveloped)
2. Number => Fraction string conversion
  a. Parse decimal from number and convert to fraction (string) 
  b. concatinate to whole number and store in object
3. SVG visualization of dimensions
  a. selecting a dimensions scheme will visualize live area in dimensions of work medium size
  b. display margin calculations need to put down layout
4. Interactive SVG for layout divisions
  a. can divide a dimension into even columns or rows and provide calculatons
  b. free hand and snap to inches grid forming of panel divisions
  c. add gutter spacing between panels and calculatons
5. Export SVG?
6. Data Validator for inputs
