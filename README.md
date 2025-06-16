# Rubik's Cube Solver Mobile App

A mobile application that helps users solve Rubik's cubes by scanning each face using the device camera and providing step-by-step solution instructions.

## Features

- Interactive 3D cube visualization
- Camera-based face scanning
- Real-time color detection
- Step-by-step solution instructions
- Modern, native mobile UI
- ML-powered solution generation

## Project Structure

```
kubemind/
├── src/                    # React Native source code
│   ├── components/        # React Native components
│   │   ├── Cube3D/       # 3D cube visualization
│   │   ├── Camera/       # Camera interface
│   │   └── UI/           # UI components
│   ├── screens/          # App screens
│   ├── services/         # API and ML services
│   └── utils/            # Utility functions
├── ios/                   # iOS native code
├── android/              # Android native code
└── docs/                 # Documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- React Native CLI
- CocoaPods (for iOS)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install iOS dependencies:
   ```bash
   cd ios && pod install
   ```

### Running the Application

1. For iOS:
   ```bash
   npm run ios
   ```
2. For Android:
   ```bash
   npm run android
   ```

## Development

- The app uses React Native for cross-platform mobile development
- Three.js for 3D cube visualization
- React Native Camera for face scanning
- TensorFlow Lite for on-device ML processing

## License

MIT