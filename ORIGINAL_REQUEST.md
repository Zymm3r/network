# Original User Request

## Initial Request — 2026-06-08T14:37:44Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Implement a Wiring Simulator MVP, functional training media modals, and fix unclickable tabs for the Equipment Catalog.

Working directory: c:\Users\UTHtest\Downloads\app.hotel
Integrity mode: development

## Requirements

### R1. EquipmentDetailTabs Updates
Update `EquipmentDetailTabs.tsx` to include functional button actions, a Training modal/video player, and a new modular Simulator tab.

### R2. Wiring Simulator MVP
Create a simple clickable MVP simulator (`WiringSimulator.tsx`) where users can connect devices. Include these initial simulation scenarios:
- Power Supply → CCTV Camera
- LAN Cable → Access Point
- NVR → IP Camera
The simulator must show connection status, validation feedback, and completion percentage. The simulator must dynamically map the correct scenario based on the `product.category` (e.g., 'CCTV' -> NVR/IP Camera scenario, 'Network' -> LAN/AP scenario).

### R3. Training Media Database Migration
Create an idempotent SQL migration to seed `training_lessons` with placeholder YouTube training videos, linked to existing `training_courses` records. Do not modify existing production data outside of migrations.

## Acceptance Criteria

### Verification
- [ ] Training tab displays at least one playable lesson.
- [ ] Simulator tab is fully functional without requiring external services.
- [ ] Equipment page contains no placeholder buttons with no actions.
- [ ] All seeded content loads from Supabase, not hardcoded frontend data.
