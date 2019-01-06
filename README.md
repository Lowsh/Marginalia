# Marginalia
Page Layout calculator and planner for comics

Currently this web app just calculates options for live area dimensions for work media that is proportional to an end print size.
The dimensions are calculated in Inches and the options divisible by 1/16th or 1/8th of an inch.

## Planned Features

1. Each dimension calculation constructs an object containing the following properties:
  1. Live area dimensions
  2. Margin offset calculations from work media size
  3. Fraction (string) values for dimensions displayed on click of value
  4. centers for each dimension
  5. dimension conversion to pixels for SVG rendering
  6. additional properties for SVG rendering (undeveloped)
2. Number => Fraction string conversion
  1. Parse decimal from number and convert to fraction (string) 
  2. concatinate to whole number and store in object
3. SVG visualization of dimensions
  1. selecting a dimensions scheme will visualize live area in dimensions of work medium size
  2. display margin calculations need to put down layout
4. Interactive SVG for layout divisions
  1. can divide a dimension into even columns or rows and provide calculatons
  2. free hand and snap to inches grid forming of panel divisions
  c. add gutter spacing between panels and calculatons
5. Export SVG?
6. Data Validator for inputs
