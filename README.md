# Song Lyric Assist

Welcome to **Song Lyric Assist**! This repository serves a dual purpose:
1. It acts as an ever-expanding **database of song lyrics** from a diverse range of artists across many musical styles. Lyrics are sourced from reputable providers.
2. It houses the source code for a **React-based web application**, hosted on GitHub Pages, which functions as an intelligent **Song Lyric Generator**.

The primary goal of this project is to provide a comprehensive tool for users to generate unique and customized song lyrics by leveraging a rich dataset and a flexible, user-friendly interface.

## Table of Contents
- [Key Features](#key-features)
  - [Lyric Database](#lyric-database)
  - [Web Application: Lyric Generator](#web-application-lyric-generator)
- [Web Application Interface Details](#web-application-interface-details)
- [How Artist-Specific Styling Works](#how-artist-specific-styling-works)
- [Repository Structure](#repository-structure)
  - [Root Directory](#root-directory)
  - [Complete Directory Tree](#complete-directory-tree)
  - [Artist-Specific Directories](#artist-specific-directories)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Key Features

### Lyric Database
* **Extensive Collection:** A continuously growing collection of lyrics from numerous artists, covering a wide spectrum of musical genres including Hip-Hop/Rap, Pop, Country, Rock, R&B, Electronic/EDM, Alternative/Indie, and Folk/Acoustic.
* **Organized Structure:** Lyrics are meticulously organized by genre and artist to ensure easy access and association.
* **Multiple Formats:** Lyrics are stored in various formats including `.txt` (plain text), `.json` (structured data), and `.csv` (tabular data) for maximum flexibility.
* **Comprehensive Coverage:** Features both individual artist collections and multi-artist datasets for comparative analysis.

### Web Application: Lyric Generator
* **Accessible Interface:** A user-friendly web application, built with React and hosted via GitHub Pages, provides the primary means of interacting with the lyric generation capabilities.
* **Customizable Generation:** Offers multiple controls to tailor the generated lyrics to specific needs and creative visions.
* **AI-Powered Analysis:** Leverages sophisticated pattern recognition to emulate artist styles authentically.

## Web Application Interface Details

The web application provides the following tools for generating lyrics:

1. **Genre Selection:**
   * A **dropdown menu** allows users to select a desired musical genre as a foundational style for the lyrics.
   * Supports 8 primary genres with subgenres for Country music.

2. **Artist Selection:**
   * **Checkboxes** enable users to select one or multiple artists.
   * If one artist is selected, the generated lyrics will aim to emulate that artist's specific style.
   * If multiple artists are selected, the generator will attempt to blend qualities, styles, and vibes from each chosen artist.

3. **Main Lyric Style Prompt:**
   * A **large text box field** for detailed creative input.
   * *Instruction:* "Describe the style, mood, theme, and any specific elements you want in your lyrics. The more detail you provide, the better the generator can tailor the output to your vision."
   * This field allows users to deeply customize the generated lyrics based on their free-form textual descriptions.

4. **Edit Request Field:**
   * A **smaller, secondary text field** for making specific, minor requests to edit or refine particular areas of previously generated lyrics or to guide the next generation attempt with small tweaks.

5. **Style Exclusion Field:**
   * A **text field** (activated by an **on/off switch**) located near the Genre selection.
   * When turned **ON**, users can input styles, themes, words, or concepts they wish to *exclude* from the generated lyrics, providing finer control over the output.

6. **Generate Button:**
   * A button labeled "**Generate**".
   * Once all desired selections and prompts are populated, pressing this button will initiate the lyric generation process according to the user's exact specifications.

## How Artist-Specific Styling Works

When a user selects one or more artists via the checkboxes:
* The application accesses the `song-lyric-assist` GitHub repository's database.
* It extracts and deeply analyzes the lyrics of the selected artist(s) from their dedicated files within the `Genres/` directory.
* This analysis informs the generation process, allowing the output to reflect the lyrical patterns, vocabulary, themes, and overall style of the chosen artist(s).
* The system uses advanced pattern recognition algorithms to identify rhyme schemes, structural patterns, thematic elements, and vocabulary signatures.

## Repository Structure

### Root Directory
The root directory of this repository contains:
* `README.md` - This file, providing an overview of the entire project
* `LICENSE` - Open-source license information
* `.gitignore` - Specifies files to be ignored by Git
* `.gitattributes` - Git attributes configuration
* `package.json` - Node.js project configuration and dependencies
* `package-lock.json` - Locked versions of dependencies
* `public/` - Public assets for the React application
* `src/` - Source code for the React application
* `docs/` - Additional documentation
* `Genres/` - The main lyrical database organized by musical genre

### Complete Directory Tree

```
Song-Lyric-Assist/
├── .gitattributes
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── docs/
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── ArtistSelector.js
│   │   ├── EditRequest.js
│   │   ├── ExclusionFilter.js
│   │   ├── GenerateButton.js
│   │   ├── GenreSelector.js
│   │   ├── LyricDisplay.js
│   │   ├── Navigation.js
│   │   └── StylePrompt.js
│   ├── contexts/
│   │   ├── AppContext.js
│   │   └── GenerationContext.js
│   ├── hooks/
│   │   ├── useArtistData.js
│   │   ├── useGeneration.js
│   │   └── useStyleAnalysis.js
│   ├── services/
│   │   ├── contentGeneration.js
│   │   ├── dataLoader.js
│   │   ├── lyricAnalysis.js
│   │   └── styleBlender.js
│   └── utils/
│       ├── constants.js
│       ├── patternRecognition.js
│       ├── textProcessing.js
│       └── validators.js
└── Genres/
    ├── Alternative-Indie/
    │   ├── Billie-Eilish/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Lorde/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   └── Twenty-One-Pilots/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       └── README.md
    ├── Country/
    │   ├── 90s-Country/
    │   │   ├── Alan-Jackson/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   ├── Garth-Brooks/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   └── Shania-Twain/
    │   │       ├── lyric-dataset.json
    │   │       ├── lyric-dataset.txt
    │   │       └── README.md
    │   ├── Bluegrass/
    │   │   ├── Alison-Krauss/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   ├── Chris-Stapleton/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   └── Ricky-Skaggs/
    │   │       ├── lyric-dataset.json
    │   │       ├── lyric-dataset.txt
    │   │       └── README.md
    │   ├── Modern-Country/
    │   │   ├── Blake-Shelton/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   ├── Carrie-Underwood/
    │   │   │   ├── lyric-dataset.json
    │   │   │   ├── lyric-dataset.txt
    │   │   │   └── README.md
    │   │   └── Luke-Bryan/
    │   │       ├── lyric-dataset.json
    │   │       ├── lyric-dataset.txt
    │   │       └── README.md
    │   └── Pop-Country/
    ├── Electronic-EDM/
    │   ├── Calvin-Harris/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Chainsmokers/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   └── Marshmello/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       └── README.md
    ├── Folk-Acoustic/
    │   ├── Fleet-Foxes/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Mumford-And-Sons/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   └── Of-Monsters-And-Men/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       └── README.md
    ├── HipHop-Rap/
    │   ├── 21-savage/
    │   │   └── 21_savage.json
    │   ├── Drake/
    │   │   ├── drake_data.csv
    │   │   ├── drake_data.json
    │   │   ├── drake_lyrics.txt
    │   │   └── README.md
    │   ├── Jay-Z/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Kendrick-Lamar/
    │   │   ├── discog_data.csv
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Kid-Leroi/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Lil-Uzi-Vert/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── multiple_artists_lyrics/
    │   │   ├── bfg-1.14.0.jar
    │   │   ├── header.csv
    │   │   ├── rappers_part_aa
    │   │   ├── rappers_part_aa.csv
    │   │   ├── rappers_part_ab
    │   │   ├── rappers_part_ab.csv
    │   │   ├── rappers_part_ac
    │   │   ├── rappers_part_ac.csv
    │   │   ├── rappers_part_ad
    │   │   ├── rappers_part_ad.csv
    │   │   ├── rappers_part_ae
    │   │   ├── rappers_part_ae.csv
    │   │   ├── rappers_part_af
    │   │   ├── rappers_part_af.csv
    │   │   ├── rappers_part_ag
    │   │   ├── rappers_part_ag.csv
    │   │   ├── rappers_part_ah
    │   │   ├── rappers_part_ah.csv
    │   │   ├── rappers_part_ai
    │   │   ├── rappers_part_ai.csv
    │   │   ├── rappers_part_aj
    │   │   ├── rappers_part_aj.csv
    │   │   ├── rappers_part_ak
    │   │   ├── rappers_part_ak.csv
    │   │   ├── rappers_part_al
    │   │   ├── rappers_part_al.csv
    │   │   ├── rappers_part_am
    │   │   ├── rappers_part_am.csv
    │   │   ├── rappers_part_an
    │   │   ├── rappers_part_an.csv
    │   │   ├── rappers_part_ao
    │   │   ├── rappers_part_ao.csv
    │   │   └── README.md
    │   ├── Post-Malone/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   └── Travis-Scott/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       └── README.md
    ├── Pop/
    │   ├── Ariana-Grande/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── Ed-Sheeran/
    │   │   ├── Ed Sheeran Dataset.csv
    │   │   ├── ed_sheeran.csv
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── mixed_artists_modern_pop_lyrics/
    │   │   └── modern_pop_lyrics.csv
    │   └── Taylor-Swift/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       ├── README.md
    │       └── taylor_swift_lyrics.csv
    ├── RnB/
    │   ├── Bruno-Mars/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   ├── John-Legend/
    │   │   ├── lyric-dataset.json
    │   │   ├── lyric-dataset.txt
    │   │   └── README.md
    │   └── The-Weeknd/
    │       ├── lyric-dataset.json
    │       ├── lyric-dataset.txt
    │       └── README.md
    └── Rock/
        ├── coldplay/
        │   └── coldplay.json
        ├── Imagine-Dragons/
        │   ├── lyric-dataset.json
        │   ├── lyric-dataset.txt
        │   └── README.md
        ├── Maroon-5/
        │   ├── lyric-dataset.json
        │   ├── lyric-dataset.txt
        │   └── README.md
        └── OneRepublic/
            ├── lyric-dataset.json
            ├── lyric-dataset.txt
            └── README.md
```

### Artist-Specific Directories

Each artist folder typically contains:
* **lyric-dataset.txt**: Plain text file containing all known lyrics for that specific artist
* **lyric-dataset.json**: JSON formatted file containing the same lyrical data with structured metadata
* **README.md**: Artist-specific documentation explaining the purpose and usage of that directory
* **Additional formats**: Some artists include CSV files or alternative naming conventions based on data sources

Special directories:
* **multiple_artists_lyrics**: Contains comprehensive hip-hop/rap datasets split across multiple CSV files
* **mixed_artists_modern_pop_lyrics**: Contains aggregated modern pop lyrics from various artists

## Technologies Used

* **Frontend Framework:** React.js
* **Styling:** CSS3 with responsive design
* **State Management:** React Context API
* **Data Processing:** JavaScript ES6+
* **Hosting:** GitHub Pages
* **Version Control:** Git
* **Package Management:** npm
* **Data Formats:** JSON, CSV, TXT

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Song-Lyric-Assist.git
   cd Song-Lyric-Assist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

We welcome contributions to expand our lyrical database and improve the application! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for detailed information on:
* Adding new artists
* Improving the generation algorithms
* Enhancing the user interface
* Reporting bugs and suggesting features

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file. All lyrical content is used for educational and transformative purposes under fair use provisions.

---

**Note:** This project respects copyright laws and focuses on style analysis and original content generation rather than reproduction of copyrighted materials. The generated lyrics are original works inspired by analyzed patterns and should not be considered reproductions of existing songs.