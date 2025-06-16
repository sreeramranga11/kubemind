# Rubik's Cube Solver Mobile App

A mobile application that helps users solve Rubik's cubes by scanning each face using the device camera and providing step-by-step solution instructions.

## Features

- Interactive 3D cube visualization using React Three Fiber
- Camera-based face scanning
- Real-time color detection
- Step-by-step solution instructions
- Modern, native mobile UI
- ML-powered solution generation (coming soon)

## Project Structure

```
kubemind-new/
├── src/
│   ├── components/
│   │   ├── Cube3D.tsx            # 3D cube visualization
│   │   └── CameraScanner.tsx     # Camera interface
│   └── App.tsx                   # Main application component
├── index.ts                      # Entry point
└── package.json                  # Dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

## Dependencies

- React Native
- Expo
- @react-three/fiber
- @react-three/drei
- three.js
- react-native-camera (for face scanning)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kubemind-new
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npx expo start
   ```

2. Run the app:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'i' to open in iOS simulator
   - Press 'a' to open in Android emulator
   - Press 'w' to open in web browser

## Development

The app uses:
- React Native with Expo for cross-platform mobile development
- React Three Fiber for 3D cube visualization
- React Native Camera for face scanning
- TypeScript for type safety

## Known Issues

- The 3D cube visualization may have some performance issues on lower-end devices
- Camera scanning feature is under development
- ML solution generation is not yet implemented

## License

MIT