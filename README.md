# P5 + P5Play + Typescript template

Typescript template for P5 and P5Play based on [TheoGibbons template](https://github.com/TheoGibbons/p5-and-p5play-in-typescript).

## Installation

    git clone https://github.com/juanparati/p5p5play-ts.git my-project-dir
    cd my-project-dir
    npm i
    npm run make:types

## P5 and P5Play types

The script tools/gen-interface.ts will combine the P5 and P5Play types into src/libs/@types/P5PlayContext.ts.

Run this script everytime that new version of P5Play is updated:

    npm run make:types

## P5PlayContext

It's the interface that combines the P5 and P5Play types.