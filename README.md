# Dhruv's Blog ([deardhruv.com](https://deardhruv.com))

Welcome to my personal website and blog repository. This site is built with Hugo, a fast and flexible static site generator, and is currently hosted on Netlify.

## ✨ Features

- **Theme**: [hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng) - A clean and minimal dark/light theme for bloggers.
- **Fast Performance**: Static site generation ensures quick loading times.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
- **Social Integration**: Easy access to my social media profiles.

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- [Hugo (Extended version)](https://gohugo.io/getting-started/installing/)
- [Git](https://git-scm.com/downloads)

## 🚀 Getting Started

To run the site locally for development:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/DearDhruv/deardhruv.com.git
    cd deardhruv.com
    ```

2.  **Initialize and update submodules:**

    The theme is included as a git submodule.

    ```bash
    git submodule init
    git submodule update
    ```

3.  **Run the Hugo server:**

    ```bash
    hugo server -D
    ```

    The site will be available at `http://localhost:1313/`. The `-D` flag includes draft posts.

## 📁 Project Structure

- `/content`: Where all the blog posts (`/posts`) and pages (`about.md`) are stored.
- `/themes`: Contains the `hello-friend-ng` theme as a submodule.
- `config.toml`: Main configuration file for site-wide settings, menus, and social links.
- `netlify.toml`: Configuration for Netlify deployment and build settings.

## 🌐 Deployment

This site is automatically deployed to Netlify on every push to the `master` branch. The build command used is:

```bash
hugo --gc --minify
```

## 👨‍💻 Connect with Me

- **Twitter**: [@DearDhruv](https://twitter.com/DearDhruv)
- **GitHub**: [DearDhruv](https://github.com/DearDhruv)
- **LinkedIn**: [Dhruv Patel](https://www.linkedin.com/in/DearDhruv)
- **Instagram**: [@deardhruv](https://www.instagram.com/deardhruv)
- **StackOverflow**: [deardhruv](https://www.stackoverflow.com/users/596566/deardhruv)

## 📄 License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
