# Project Setup Guide

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Follow these steps to get the project running locally:

## 1. Prerequisites: Install Required Tools

- **Node.js**: Use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node versions.
- **pnpm**: Install [pnpm](https://pnpm.io/installation) for package management (recommended over npm/yarn).

**Install nvm:**

- **For macOS/Linux:**

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Restart your terminal or run:
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

- **For Windows:**

  Use [nvm-windows](https://github.com/coreybutler/nvm-windows):
  1.  Download the latest installer from the [releases page](https://github.com/coreybutler/nvm-windows/releases).
  2.  Run the installer and follow the setup instructions.
  3.  After installation, use `nvm` from a new command prompt.

**Install pnpm:**

```bash
npm install -g pnpm
```

## 2. Switch to the Correct Node Version

Check the required Node version in `.nvmrc` (if present) or `package.json` (usually in the `engines` field). Then run:

```bash
nvm install # Installs the version from .nvmrc if available
nvm use     # Switches to the correct Node version
```

## 3. Install Project Dependencies

Run the following command in the project root:

```bash
pnpm install
```

## 4. Configure Environment Variables

Copy the example environment file (if provided) and update it with your own values:

```bash
cp .env.example .env.local
# Edit .env.local and fill in the required variables
```

> **Note:** If there is no `.env.example`, check the documentation or codebase for required environment variables and create `.env.local` manually.

## 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Getting Started

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
