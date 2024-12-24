# Find and Replace Tool
(Site is live at `https://sameemanasrin.github.io/find-n-replace-text/`)

## Overview
This project is a simple web-based Find and Replace Tool that allows users to:
- Enter or paste text in a text area.
- Find specific words or phrases within the text.
- Highlight all occurrences of the search term.
- Navigate between the found occurrences.
- Replace a specific occurrence or all occurrences of the search term with a new phrase.

## Features
- **Text Input**: A text area where users can input or paste text.
- **Find Functionality**: Highlights all occurrences of the entered search term.
- **Replace Functionality**: Replace one or all occurrences of the found term with the desired text.
- **Navigation**: Navigate to the previous or next occurrence of the found term.

## Assumptions and Improvements
- **Text Highlighting**: The search term is highlighted using the `<mark>` tag.
- **Case Insensitivity**: The search functionality is case-insensitive.
- **No Overlapping Matches**: The tool assumes non-overlapping matches for the search term.
- **Simultaneous Scrolling**: The text area and its preview (`<pre>` element) scroll in sync for better usability.
- **Styling**: Basic styling applied for better user experience.

## Prerequisites
- Node.js and npm installed (for serving the project locally).

## Steps to Run the Project Locally

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/SameemaNasrin/find-n-replace-text.git
    cd find-n-replace-tool
    ```

2. **Install Dependencies**:
    If using Angular or a similar framework, run:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    ng serve
    ```
    OR
   ```bash
    npm start
    ```

4. **Access the Application**:
    Open a browser and go to `http://localhost:4200` (or the port shown in your terminal).

   

6. **Use the Tool**:
    - Type or paste text in the text area.
    - Enter the search term in the "Find" input field.
    - Enter the replacement text in the "Replace" input field.
    - Use the navigation buttons to move between occurrences.
    - Click "Replace" or "Replace All" as needed.

## Project Structure
```
find-n-replace-tool/
│
├── src/
│   ├── app/
│   │   ├── components/
|   |   |   └── home-page
|   |   |       └──home-page.component.html
|   |   |       └──home-page.component.css
|   |   |       └──home-page.component.ts
│   │   └── app.component.css
│   │   └── app.component.html
│   │   └── app.component.ts
│   ├── assets/
│   └── index.html
│   └── style.css
├── README.md
├── angular.json
├── package.json
└── tsconfig.json
```
