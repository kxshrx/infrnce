# Copilot Instructions for Infrnce Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is the "Infrnce" project - an intelligent log classification engine website built with Next.js, JavaScript, Tailwind CSS, and shadcn/ui components.

## Design Philosophy

- **Clarity as a Feature**: Every element must serve a purpose
- **Professional minimalism**: Clean, uncluttered, elegant design
- **Data-driven interface**: Focus on showcasing the intelligent classification technology

## Technical Guidelines

- Use Next.js App Router with JavaScript (not TypeScript)
- Style with Tailwind CSS using the teal accent color theme
- Use ONLY shadcn/ui components for UI elements
- Integrate with FastAPI endpoints at http://127.0.0.1:8000
- Maintain responsive design and accessibility standards

## Color Palette

- Primary Accent: Sophisticated teal for interactive elements
- Background: Very light gray (#F9FAFB) for gallery-like feel
- Text & Borders: Neutral palette of dark grays and black with varying opacities

## API Endpoints

- POST /api/classify - Main classification endpoint
- POST /api/generate-synthetic - Generate synthetic logs
- POST /api/random-log - Get random existing logs

## Page Structure

- `/` - The Engine page (main classification interface)
- `/dashboard` - Performance and metrics dashboard
