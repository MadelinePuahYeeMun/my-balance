# MY Balance by MADyX

**Team Members**: Ng Yi Xiang, Madeline Puah Yee Mun  
**Problem Statement**: Stress & Workload Manager  
**Video Presentation**: [Unlisted Youtube Link]  
**Presentation Slides**: [https://pdflink.to/82135f6b/](https://pdflink.to/82135f6b/)  

---

## 1. Project Overview

### The Problem
University students today are constantly operating at or above their mental and physical capacity. Unlike corporate workers with structured 9-to-5 schedules, students juggle fragmented responsibilities across multiple life domains: heavy university assignments, part-time jobs, student club leadership, gym workouts, social commitments, and daily household errands. 

Existing productivity apps such as **Notion**, **Google Tasks**, and **Todoist** fail students because they treat every commitment as a flat, unweighted text checkbox. They focus exclusively on *what* needs to be done without tracking *how much capacity* the student has left. This creates **invisible overload** — students keep adding tasks to an endless to-do list until exhaustion and burnout strike without warning.

### Our Solution
**MY Balance** ("*Know your load. Protect your energy.*") is a student wellbeing and workload manager that shifts the focus from simple task completion to holistic capacity management. Instead of just listing tasks, MY Balance calculates a real-time multi-dimensional workload percentage, identifies which area of life is causing strain, and suggests 1-click rebalancing actions before burnout happens.

#### Key Feature-Set:
- **Overall Workload Visualizer**: Radial circular gauge displaying total weighted capacity % (e.g. 82% Overall Load) with hours planned vs. capacity available.
- **Multi-Dimensional Category Breakdown**: Quantifies strain across 5 core life areas: 🧠 Mental, ⏰ Time, 🏃 Physical, 👥 Social, and 🛒 Errands.
- **Interactive Balance Plan ("Your Balance Plan")**: Rule-based engine that identifies low-priority tasks causing overload and provides 1-click deferral actions (e.g., **"Move to tomorrow →"**) that instantly reduce workload.
- **Daily Stress Check-in & History**: 5-emoji mood picker (😄 Great to 😫 Overwhelmed) with 7-day Recharts line graph and trend callouts.
- **Non-Medical Recovery Spotlight Card ("Your recovery matters too 💚")**: Context-aware rest advice encouraging timely breaks (e.g., 20-min outdoor walk) without medical jargon.
- **Instant Prototype Reset**: 1-click demo reset button to restore pre-seeded student dataset for presentations.

---

## 2. Ideation & Process

### 2.1 Ideas We Considered

The following table summarizes the key product concepts explored by our team during ideation, ordered with our chosen features first:

| Idea | Status | Why It Was Kept / Dropped |
| :--- | :--- | :--- |
| **Multi-Dimensional Category Workload Engine** | **Chosen** | Kept because student stress stems from accumulated cognitive, social, and physical strain, not just academic hours. |
| **1-Click Interactive Task Rebalancing** | **Chosen** | Kept because telling a student they are overloaded is useless unless the app provides an immediate, actionable way to reduce load. |
| **Daily Emoji Stress Check-in & Trend Graph** | **Chosen** | Kept to provide a low-friction 2-second mood log and correlate subjective feelings with calculated workload over time. |
| **Non-Medical Recovery Spotlight Card** | **Chosen** | Kept to promote proactive rest and pacing as an essential component of academic productivity. |
| **Medical / Clinical Burnout Diagnostic Tool** | **Dropped** | Dropped to avoid making unregulated medical claims or diagnoses. MY Balance focuses strictly on workload pacing and wellbeing guidance. |
| **Mandatory Task Lockout / Hard Blocker** | **Dropped** | Dropped because blocking students from opening study apps creates anxiety when hard academic deadlines are imminent. |
| **Wearable / Smartwatch Biometric Sync** | **Dropped (MVP)** | Dropped for initial prototype to eliminate hardware prerequisites and ensure frictionless onboarding for all students. |

### 2.2 Ideation Boards & System Flow

Our team utilized a **5 Whys Analysis** and a **User Decision Flow Diagram** to refine the core user experience:

```
[Problem: Student experiences sudden academic burnout]
       │
  (Why 1?) ──> Carrying too many unweighted commitments simultaneously
       │
  (Why 2?) ──> Standard to-do lists treat a 4-hour essay the same as a 10-min errand
       │
  (Why 3?) ──> No visual indicator showing total capacity vs planned hours
       │
  (Why 4?) ──> Students don't realize they are overloaded until stress spikes
       │
  (Why 5?) ──> Existing tools lack real-time rebalancing suggestions
       │
  [SOLUTION] ──> MY Balance: Visual Capacity Gauge + 1-Click Task Rebalancing
```

#### User Experience Flow Diagram:
```
┌─────────────────────────┐
│     Dashboard View      │ ──> Displays 82% Overall Load & Category Strain
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Stress Check-in Page  │ ──> Student logs mood (e.g. "Stressed") -> Views 7-Day Trend
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Recommendations Page  │ ──> Displays "Your Balance Plan" (Overage Warning)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ 1-Click Task Rebalance  │ ──> Clicks "Move to tomorrow →" on low-priority task
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Dynamic Load Reduction  │ ──> Workload gauge automatically drops from 82% to 71%!
└─────────────────────────┘
```
*Caption: User interaction flow showing how MY Balance transforms passive stress awareness into immediate workload reduction.*

---

## 3. Design & Prototype

**Live UI Prototype URL**: [https://my-balance-bh7l659an-madelinepuahyeemuns-projects.vercel.app](https://my-balance-bh7l659an-madelinepuahyeemuns-projects.vercel.app)

### Key Screens & Interaction Highlights

#### Screen 1: Dashboard & Overall Workload Gauge
The central hub featuring a visual circular progress gauge showing **82% Overall Load** (*"You're approaching your capacity"*). It displays planned commitment hours (41h) relative to available capacity (50h), alongside horizontal progress bars breaking down strain across Mental (91%), Time (86%), Physical (58%), Social (72%), and Errands (45%).

#### Screen 2: Recommendations ("Your Balance Plan")
Presents an alert banner when planned tasks exceed safe limits. Suggests targeted rebalancing actions, such as deferring the low-priority 2-hour *Club Meeting*. Clicking **"Move to tomorrow →"** updates the task in local state and immediately recalculates the overall workload gauge.

#### Screen 3: Stress Check-in & Trend Graph
An interactive 5-emoji mood picker (😄 Great to 😫 Overwhelmed) paired with an SVG/Recharts line graph tracking the student's 7-day stress history and displaying automated trend insights.

#### Screen 4: Task Management & Add Commitment Modal
Full CRUD task list equipped with category and priority tags, duration indicators, deadline filters, and an accessible modal form to create new commitments.

---

## 4. What Makes It Different

### Key Innovations & "The Twist"
Most productivity tools act as **storage bins for tasks** — encouraging students to stack infinite to-do items. 

The twist in **MY Balance** is that it acts as a **capacity protection guard**:
1. **Weighted Workload Math**: Tasks are weighted by priority multipliers (High 1.5x, Medium 1.0x, Low 0.6x) and urgency factors rather than simple task counts.
2. **Actionable Rebalancing Loop**: Instead of just showing graphs, MY Balance provides one-click actions that modify schedule state and immediately lower the student's capacity strain.
3. **Non-Medical Recovery**: Integrates proactive rest suggestions directly into the productivity workflow.

### Comparison Table

| Feature / Capability | Google Tasks | Notion | Todoist | MY Balance |
| :--- | :---: | :---: | :---: | :---: |
| Flat Task Checklists | ✅ | ✅ | ✅ | ✅ |
| Visual Capacity Gauge (%) | ❌ | ❌ | ❌ | **✅** |
| Multi-Dimensional Life Strain | ❌ | ❌ | ❌ | **✅** |
| 1-Click Schedule Rebalancing | ❌ | ❌ | ❌ | **✅** |
| Integrated Stress Trend Graph | ❌ | ❌ | ❌ | **✅** |
| Recovery & Break Guidance | ❌ | ❌ | ❌ | **✅** |

---

## 5. Technical Architecture & Feasibility

### Tech Stack
- **Frontend Framework**: Next.js 16 (App Router with Turbopack), React 19, TypeScript
- **Styling & UI**: Tailwind CSS v4, Lucide React icons
- **Data Visualizations**: Recharts & Custom SVG Radial Progress Components
- **State & Storage**: React Context (`AppContext`) with `localStorage` persistence
- **Hosting & Deployment**: Vercel Cloud Platform (Automatic CI/CD deployment)

#### Architectural Choices & Constraints:
- **Next.js App Router**: Chosen for fast client-side transitions and optimal static site generation.
- **Client-Side LocalStorage**: Chosen for zero-latency interactions during prototype demos without requiring external backend servers or database setup.
- **Component Modularization**: Clean separation between calculations (`workload.ts`), recommendation rules (`recommendations.ts`), and UI components.

---

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Client Browser (React 19)                     │
│                                                                        │
│   ┌─────────────────────┐   ┌───────────────────┐   ┌──────────────┐   │
│   │ Dashboard Component │   │ Recommendations   │   │ Stress View  │   │
│   └──────────┬──────────┘   └─────────┬─────────┘   └──────┬───────┘   │
│              │                        │                    │           │
│              └────────────────┐       │      ┌─────────────┘           │
│                               ▼       ▼      ▼                         │
│                    ┌──────────────────────────────────┐                │
│                    │       AppContext Provider        │                │
│                    └────────────────┬─────────────────┘                │
│                                     │                                  │
│            ┌────────────────────────┴────────────────────────┐         │
│            ▼                                                 ▼         │
│ ┌───────────────────────────┐                   ┌────────────────────┐ │
│ │  workload.ts Engine       │                   │ recommendations.ts │ │
│ └───────────────────────────┘                   └────────────────────┘ │
│                                     │                                  │
│                                     ▼                                  │
│                       ┌───────────────────────────┐                    │
│                       │ LocalStorage Persistence  │                    │
│                       └───────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3-Week Build Plan & Scope

During the upcoming 3-week hackathon building phase, our team will expand the working prototype into a production-grade student platform with the following realistic scope:

```
Week 1: Automated Data Ingestion
  ├── Google Calendar API integration for automatic schedule sync
  └── Canvas LMS / Blackboard API connector for assignment deadlines

Week 2: Smart Scheduling & User Preferences
  ├── Customizable weekly capacity hours & study preference rules
  └── Automated break schedule generator based on cognitive strain

Week 3: Polish, Analytics & Testing
  ├── Weekly energy summary report & exportable insights
  └── Mobile PWA offline optimization & user testing feedback iteration
```

---

*Built with 💚 by MADyX for Beating the Burnout.*
