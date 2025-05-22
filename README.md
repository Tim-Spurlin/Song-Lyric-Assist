# Song Lyric Assist

Welcome to **Song Lyric Assist**! This repository serves a dual purpose:
1.  It acts as an ever-expanding **database of song lyrics** from a diverse range of artists across many musical styles. Lyrics are sourced from reputable providers.
2.  It houses the source code for a **React-based web application**, hosted on GitHub Pages, which functions as an intelligent **Song Lyric Generator**.

The primary goal of this project is to provide a comprehensive tool for users to generate unique and customized song lyrics by leveraging a rich dataset and a flexible, user-friendly interface.

## Table of Contents
- [Key Features](#key-features)
  - [Lyric Database](#lyric-database)
  - [Web Application: Lyric Generator](#web-application-lyric-generator)
- [Web Application Interface Details](#web-application-interface-details)
- [How Artist-Specific Styling Works](#how-artist-specific-styling-works)
- [Repository Structure](#repository-structure)
  - [Root Directory](#root-directory)
  - [Artist-Specific Directories](#artist-specific-directories)

## Key Features

### Lyric Database
*   **Extensive Collection:** A continuously growing collection of lyrics from numerous artists, covering a wide spectrum of musical genres.
*   **Organized Structure:** Lyrics are meticulously organized to ensure easy access and association with their respective artists.
*   **Multiple Formats:** For each artist, their complete lyrical catalog is stored in both `.txt` (plain text) and `.json` (structured data) formats.

### Web Application: Lyric Generator
*   **Accessible Interface:** A user-friendly web application, built with React and hosted via GitHub Pages, provides the primary means of interacting with the lyric generation capabilities.
*   **Customizable Generation:** Offers multiple controls to tailor the generated lyrics to specific needs and creative visions.

## Web Application Interface Details

The web application provides the following tools for generating lyrics:

1.  **Genre Selection:**
    *   A **dropdown menu** allows users to select a desired musical genre as a foundational style for the lyrics.

2.  **Artist Selection:**
    *   **Checkboxes** enable users to select one or multiple artists.
    *   If one artist is selected, the generated lyrics will aim to emulate that artist's specific style.
    *   If multiple artists are selected, the generator will attempt to blend qualities, styles, and vibes from each chosen artist.

3.  **Main Lyric Style Prompt:**
    *   A **large text box field** for detailed creative input.
    *   *Instruction:* "Describe the style, mood, theme, and any specific elements you want in your lyrics. The more detail you provide, the better the generator can tailor the output to your vision."
    *   This field allows users to deeply customize the generated lyrics based on their free-form textual descriptions.

4.  **Edit Request Field:**
    *   A **smaller, secondary text field** for making specific, minor requests to edit or refine particular areas of previously generated lyrics or to guide the next generation attempt with small tweaks.

5.  **Style Exclusion Field:**
    *   A **text field** (activated by an **on/off switch**) located near the Genre selection.
    *   When turned **ON**, users can input styles, themes, words, or concepts they wish to *exclude* from the generated lyrics, providing finer control over the output.

6.  **Generate Button:**
    *   A button labeled "**Generate**".
    *   Once all desired selections and prompts are populated, pressing this button will initiate the lyric generation process according to the user's exact specifications.

## How Artist-Specific Styling Works

When a user selects one or more artists via the checkboxes:
*   The application accesses the `song-lyric-assist` GitHub repository's database.
*   It extracts and deeply analyzes the lyrics of the selected artist(s) from their dedicated files within the `artists/` directory.
*   This analysis informs the generation process, allowing the output to reflect the lyrical patterns, vocabulary, themes, and overall style of the chosen artist(s).

## Repository Structure

### Root Directory
The root directory of this repository contains:
*   This `README.md` file, providing an overview of the entire `song-lyric-assist` project, its purpose, the web application, and the lyric database structure.
*   The source code for the React-based web application.
*   The main `artists/` folder.

### Artist-Specific Directories

*   **Path:** `artists/[ArtistName]/`
*   Within the main `artists/` folder, each artist has their own dedicated sub-folder (e.g., `artists/ArtistExample/`).
*   **Contents of each Artist Folder:**
    *   `lyrics.txt`: A plain text file containing all known lyrics for that specific artist.
    *   `lyrics.json`: A JSON formatted file containing the same lyrical data, allowing for structured programmatic access.
    *   `README.md`: A specific `README.md` file for that artist's folder. This README details the purpose of that particular directory, primarily explaining that it holds the lyric data for the specified artist, which is utilized by the web application for style analysis and lyric generation based on user requests.

---

This `README.md` aims to give a comprehensive overview of the `song-lyric-assist` repository and its functionalities.
