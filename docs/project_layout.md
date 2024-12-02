# Project Layout

Our project follows a microservice architecture and is managed as a monorepo. The project is designed to scale easily and maintain flexibility by allowing each component or node to operate independently within the same repository. Below is an overview of the project structure:

## Folder Structure

    mkdocs.yml                  # The configuration file for MkDocs, used to manage the documentation site.

    README.md                   # The README file for the GitHub repository, providing an overview of the project and  setup instructions.

    docs/                        # Directory containing all the documentation files and assets.
        index.md                 # The homepage for the documentation, providing an introduction to the project.
        ...                       # Additional Markdown pages, images, and other files related to documentation.

    apps/                        # Directory for the implementation of each node in our platform (microservices).
        ...                       # Each folder here contains the codebase and logic for a specific component or microservice in the platform.

    .github/                     # GitHub-related files for automation.
        workflows/               # Contains GitHub Actions workflows.
            publish_docs.yaml    # A GitHub Actions workflow for automatically publishing the documentation to GitHub   Pages.

## Explanation of Project Structure

- **mkdocs.yml**: This is the main configuration file for MkDocs, the tool used to generate and serve the project's documentation. This file contains settings related to the appearance and structure of the documentation, including navigation, themes, and plugins.

- **README.md**: The README file provides an overview of the project, its purpose, and how to get started. This is the first place new users or contributors should look for guidance on setting up the environment and understanding the project.

- **docs/**: This directory contains all the documentation files for the project. The `index.md` file is the homepage for the MkDocs site, and other Markdown files can be used to document specific components, usage guides, or technical details. Additionally, images and other assets related to the documentation are placed in this directory.

- **apps/**: In this directory, each folder corresponds to a specific microservice or node within the platform. Each microservice is independent, but they are all part of the larger system. This is where the core functionality and business logic of the platform reside.

- **.github/**: This directory contains GitHub-related configurations, including workflows for continuous integration and deployment. The `workflows/publish_docs.yaml` file is a GitHub Actions workflow that automatically publishes the documentation to GitHub Pages whenever updates are pushed to the repository.

## Future Enhancements

This is just the beginning of our project structure. As the project evolves, we may expand and refine the layout to accommodate new microservices, additional documentation, and more complex workflows. The structure is designed to be flexible and scalable, making it easier to manage as the platform grows.
