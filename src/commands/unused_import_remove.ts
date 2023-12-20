import { Project } from 'ts-morph';

export function removeUnusedImports(filepath: string) {
    // Initialize a Project with ts-morph
    const project = new Project();
    // Add source file
    const sourceFile = project.addSourceFileAtPath(filepath);
    
    // Organize the imports to remove unused ones
    sourceFile.organizeImports();
    
    // Save the changes to the source file
    sourceFile.saveSync();
}