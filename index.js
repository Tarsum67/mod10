const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./shapes');

function validColor(input) {
 
  return true; 
}
class SVG {
  constructor() {
    this.text = '';
    this.textColor = '';
    this.shape = null;
  }

  setText(text, textColor) {
    if (text.length > 3) {
      throw new Error('Text must not exceed 3 characters.');
    }

    this.text = text;
    this.textColor = textColor;
  }

  setShape(shape) {
    this.shape = shape;
  }

  render() {
    let shapeSvg = this.shape ? this.shape.render() : '';
    let textY = this.shape instanceof Triangle ? 150 : 125;
    let textSvg = this.text ? `<text x="150" y="${textY}" font-size="60" text-anchor="middle" fill="${this.textColor || 'black'}">${this.text}</text>` : '';

    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeSvg}${textSvg}</svg>`.trim();
  }
}

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter logo text (3 character max)',
      name: 'text',
      validate: function (input) {
        if (input.length > 3) {
          return 'Text is limited to 3 characters.';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'Enter desired text or hexadecimal number',
      name: 'textColor',
      validate: function (input) {
        if (validColor(input)) {
          return true;
        }
        return 'Must enter a valid color.';
      },
    },
    {
      type: 'list',
      message: 'Select desired shape:',
      choices: ['Circle', 'Triangle', 'Square'],
      name: 'shape',
    },
    {
      type: 'input',
      message: 'Enter shape color',
      name: 'shapeColor',
      validate: function (input) {
        if (validColor(input)) {
          return true;
        }
        return 'Must enter a valid color.';
      },
    },
  ])
  .then((answers) => {
    let shape;

 
    if (answers.shape === 'Circle') {
      shape = new Circle();
    } else if (answers.shape === 'Triangle') {
      shape = new Triangle();
    } else if (answers.shape === 'Square') {
      shape = new Square();
    }

    shape.setColor(answers.shapeColor);

    const svg = new SVG();


    svg.setText(answers.text, answers.textColor);

  
    svg.setShape(shape);

  
    const svgLogo = svg.render();

    fs.writeFileSync('logo.svg', svgLogo);

    console.log('Generated logo.svg');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
