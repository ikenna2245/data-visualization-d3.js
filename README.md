# data-visualization-d3.js
Exploring student attendance and there academic performance with a scatterplot and viewing the data hierarchy with a tidy tree

## Project Description
This project aimed to evaluate if student attendance has any effect on their academic performance. The dataset used for this visualization is the student attendance data and module outcome from the school of Computing, Engineering and Digital Technologies (SCEDT) at Teesside University.

This project utilized HTML5, CSS3, Bootstrap, and D3.js for the development of Tidy tree and a Scatterplot from the data.

## Tidy Tree
The original flat data was preprocessed using Pandas library in Python and converted into hierarchical data, which was then used in the production of the Tidy tree diagram.
The Tidy tree is showing the hierarchy of the dataset, with SCEDT as the parent and the listed departments considered for this study as the child. The modules in these departments are considered children to the departments and grandchildren to the SCEDT. The last child element is the students and their performance on each module.

## Scatterplot
The total attendance of each student in the dataset was plotted against the student marks in a scatterplot. The result of the chart showed no correlation between the student’s attendance and their performance.
The Macro view of the chart is the total attendance for all module and the marks, the chart can be drilled into using the user control to select the modules within the considered departments for this project, which is considered the micro view.
