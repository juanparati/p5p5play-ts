/**
 * This script will extract the P5Play definitions and creates the augmented interface definition for P5PlayContext.
 */
import * as fs from 'fs';
import * as ts from 'typescript';
const path = require('path');

const ignoreMethods = [
    'background',
    'fill',
    'stroke',
    'frameRate',
    'loadImage',
    'resizeCanvas',
    'createCanvas',
];

const ignoreProperties = [
    'camera'
];

// Function to read and parse the TypeScript definition file
function parseDefinitionFile(filePath: string): ts.SourceFile {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true
    );
}

// Function to extract relevant definitions
function extractDefinitions(sourceFile: ts.SourceFile): {
    classes: string[];
    functions: string[];
    properties: string[];
} {
    const classes: string[] = [];
    const functions: string[] = [];
    const properties: string[] = [];

    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) && node.name) {
            const className = node.name.text;

            // Ignore classes that start with underscore
            if (!className.startsWith('_')) {
                // Extract constructor parameters
                let constructorParams = '';
                node.members.forEach(member => {
                    if (ts.isConstructorDeclaration(member) && member.parameters) {
                        constructorParams = member.parameters.map(param => {
                            let paramText = '';

                            // Handle parameter name
                            paramText += param.name.getText(sourceFile);

                            // Add optional marker before the type annotation
                            if (param.questionToken) {
                                paramText += '?';
                            }

                            // Add parameter type if present
                            if (param.type) {
                                paramText += `: ${param.type.getText(sourceFile)}`;
                            }

                            // Handle rest parameters
                            if (param.dotDotDotToken) {
                                paramText = `...${paramText}`;
                            }

                            return paramText;
                        }).join(', ');
                    }
                });

                classes.push(`${className}: {\n  new(${constructorParams}): ${className}\n}`);
            }
        } else if (ts.isFunctionDeclaration(node) && node.name) {
            const functionName = node.name.text;

            // Extract function parameters and return type
            const parameters = node.parameters.map(param => {
                let paramText = param.name.getText(sourceFile);

                // Add optional marker before the type annotation
                if (param.questionToken) {
                    paramText += '?';
                }

                if (param.type) {
                    paramText += `: ${param.type.getText(sourceFile)}`;
                }

                // Handle rest parameters
                if (param.dotDotDotToken) {
                    paramText = `...${paramText}`;
                }

                return paramText;
            }).join(', ');

            let returnType = '';
            if (node.type) {
                returnType = node.type.getText(sourceFile);
            }

            if (ignoreMethods.indexOf(functionName) === -1)
                functions.push(`${functionName}(${parameters}): ${returnType}`);
        } else if (ts.isVariableDeclaration(node) && node.name) {
            const variableName = (node.name as ts.Identifier).text;

            const parent = node.parent;

            if (ignoreProperties.indexOf(variableName) === -1 && ts.isVariableDeclarationList(parent)) {
                // Check for var declaration
                // @ts-ignore
                const isVarDeclaration = parent.flags === 33554432;

                if (isVarDeclaration) {
                    properties.push(`${variableName}: ${node.type.getText()}`);
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    return { classes, functions, properties };
}

// Function to generate the new definition file
function generateNewDefinitionFile(
    classes: string[],
    functions: string[],
    properties: string [],
    outputPath: string
) {
    const interfaceContent = `import p5 from "p5";
export default interface P5PlayInstance extends p5 {
  ${classes.join(',\n  ')},
  ${functions.join(',\n  ')},
  ${properties.join(',\n  ')}
}`;

    fs.writeFileSync(outputPath, interfaceContent, 'utf8');
    console.log(`Successfully created ${outputPath}`);
}

// Main function
function main() {
    const inputFile = path.resolve(__dirname, '../node_modules/p5play/p5play.d.ts');
    const outputFile = path.resolve(__dirname, '../src/libs/@types/P5PlayContext.ts');

    try {
        const sourceFile = parseDefinitionFile(inputFile);
        const { classes, functions, properties } = extractDefinitions(sourceFile);
        generateNewDefinitionFile(classes, functions, properties, outputFile);
    } catch (error) {
        console.error('Error processing definition file:', error);
    }
}

main();